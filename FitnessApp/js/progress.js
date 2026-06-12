  /* ═══════════════════════════════════════════════════════════════════
     PROGRESS / BENCHMARKS
  ═══════════════════════════════════════════════════════════════════ */
  const KEY_HR           = KEYS.hr;
  const KEY_BENCH_DATA   = KEYS.benchData;
  const KEY_BENCH_HIST   = KEYS.benchHist;
  let   _benchCharts     = {};

  const BENCHMARKS_DEF = [
    { id:'b-pullup',   name:'Strict pull-up max',          unit:'reps', baseline:5,    target:10,  lowerBetter:false },
    { id:'b-deanhang', name:'Dead hang bilateral',          unit:'s',    baseline:49,   target:90,  lowerBetter:false },
    { id:'b-cabler',   name:'Cable ER working weight',      unit:'kg',   baseline:6.25, target:10,  lowerBetter:false },
    { id:'b-wristr',   name:'Reverse wrist working weight', unit:'kg',   baseline:5,    target:8,   lowerBetter:false },
    { id:'b-dip',      name:'Dip max strict',               unit:'reps', baseline:4,    target:12,  lowerBetter:false },
    { id:'b-ftp',      name:'FTP Wattbike',                 unit:'W',    baseline:172,  target:200, lowerBetter:false },
    { id:'b-resthr',   name:'Resting HR',                   unit:'bpm',  baseline:75,   target:65,  lowerBetter:true  },
  ];

  function loadBenchData() { return readJSON(KEY_BENCH_DATA, {}); }
  function saveBenchData(d) { writeJSON(KEY_BENCH_DATA, d); }

  function loadBenchHistory() { return readJSON(KEY_BENCH_HIST, {}); }
  function addBenchEntry(id, value) {
    const all = loadBenchHistory();
    if (!all[id]) all[id] = [];
    all[id].push({ date: toDateStr(new Date()), value: parseFloat(value) });
    writeJSON(KEY_BENCH_HIST, all);
  }

  function benchPct(def, current) {
    if (def.lowerBetter) {
      const span = def.baseline - def.target;
      return span > 0 ? Math.min(100, Math.max(0, ((def.baseline - current) / span) * 100)) : 0;
    }
    const span = def.target - def.baseline;
    return span > 0 ? Math.min(100, Math.max(0, ((current - def.baseline) / span) * 100)) : 0;
  }

  function loadHrData() { return readJSON(KEY_HR, []); }

  function renderProgress() {
    renderWeeklyLoad();
    renderHrDisplay();
    renderBenchCards();
    renderZone2History();
  }

  /* Unified weekly load — strength, engine, mobility and rehab in one view. */
  function renderWeeklyLoad() {
    const el = document.getElementById('weekly-load-card');
    if (!el) return;
    const wl = weeklyLoad();
    const range = `${formatDisplayDate(wl.weekStart)} – ${formatDisplayDate(wl.weekEnd)}`;
    const ratioStr = (wl.pullSets || wl.pushSets)
      ? (wl.pullPushRatio === null ? '∞' : `${wl.pullPushRatio}:1`) : '—';
    el.innerHTML = `<div class="card">
      <div class="card-title">This Week <span style="font-size:12px;color:var(--text-sec);font-weight:400"> · ${range}</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
        <div class="stat-box"><div class="val">${wl.gymSessions}</div><div class="lbl">Gym sessions</div></div>
        <div class="stat-box"><div class="val">${wl.tonnage.toLocaleString()}</div><div class="lbl">Volume (kg)</div></div>
        <div class="stat-box"><div class="val">${wl.workingSets}</div><div class="lbl">Working sets</div></div>
        <div class="stat-box"><div class="val">${wl.engineMinutes}</div><div class="lbl">Engine (min)</div></div>
        <div class="stat-box"><div class="val">${wl.mobilityDays}</div><div class="lbl">Mobility days</div></div>
        <div class="stat-box"><div class="val">${wl.rehabDays}</div><div class="lbl">Rehab days</div></div>
      </div>
      <div style="margin-top:10px;font-size:12px;color:var(--text-sec);line-height:1.5">
        Pull : Push <strong>${ratioStr}</strong> &nbsp;·&nbsp; Volume by area —
        pull ${wl.byCategory.pull.toLocaleString()} · push ${wl.byCategory.push.toLocaleString()} ·
        lower ${wl.byCategory.lower.toLocaleString()} · core ${wl.byCategory.core.toLocaleString()} kg
      </div>
    </div>`;
  }

  function renderHrDisplay() {
    const todayStr = toDateStr(new Date());
    const entry    = loadHrData().find(e => e.date === todayStr);
    const el = document.getElementById('hr-today-display');
    if (!el) return;
    if (entry) {
      el.innerHTML = `<div class="hr-today-val">${entry.value} <span style="font-size:16px;font-weight:600">bpm</span></div><div class="hr-today-lbl">Logged today</div>`;
      const inp = document.getElementById('hr-input');
      if (inp) inp.value = entry.value;
    } else {
      el.innerHTML = `<div class="hr-today-lbl" style="padding:8px 0">Not logged today</div>`;
    }
  }

  function saveHrEntry(value) {
    const data = loadHrData();
    const todayStr = toDateStr(new Date());
    const idx = data.findIndex(e => e.date === todayStr);
    if (idx >= 0) data[idx].value = value; else data.push({ date: todayStr, value });
    writeJSON(KEY_HR, data);
    addBenchEntry('b-resthr', value);
    const d = loadBenchData(); d['b-resthr'] = value; saveBenchData(d);
    renderHrDisplay();
    renderBenchCards();
  }

  function renderBenchCards() {
    const list = document.getElementById('bench-cards-list');
    if (!list) return;
    Object.values(_benchCharts).forEach(c => { try { c.destroy(); } catch {} });
    _benchCharts = {};

    const data = loadBenchData();
    const hist = loadBenchHistory();

    list.innerHTML = BENCHMARKS_DEF.map(def => {
      const current = data[def.id] != null ? data[def.id] : def.baseline;
      const pct = Math.round(benchPct(def, current));
      const history = (hist[def.id] || []).slice(-10);
      const hasSparkline = history.length >= 2;

      // Auto-derived "logged best" from gym sessions — non-destructive: the
      // athlete taps to apply it rather than us silently overwriting their value.
      const derived = (typeof derivedBenchmark === 'function') ? derivedBenchmark(def.id) : null;
      const suggestHtml = (derived && derived.value !== current)
        ? `<div class="bench-suggest" onclick="updateBenchValue('${def.id}',${derived.value})"
             style="margin-top:8px;font-size:12px;color:#4a7c59;cursor:pointer;font-weight:600">
             <i class="fa-solid fa-wand-magic-sparkles"></i> Logged best: ${derived.value} ${def.unit} · ${formatDisplayDate(derived.date)} — tap to use</div>`
        : '';
      return `<div class="card">
        <div class="card-title">${def.name}</div>
        <div class="bench-vals">
          <div class="bench-val-group">
            <div class="bench-val-label">Baseline</div>
            <div class="bench-val-static" style="color:var(--text-sec)">${def.baseline}<span style="font-size:12px"> ${def.unit}</span></div>
          </div>
          <div class="bench-val-group grow">
            <div class="bench-val-label">Current</div>
            <div class="bench-current-wrap">
              <input type="number" step="0.25" value="${current}"
                onchange="updateBenchValue('${def.id}',this.value)"
                id="bench-${def.id}" />
              <span class="bench-unit">${def.unit}</span>
            </div>
          </div>
          <div class="bench-val-group">
            <div class="bench-val-label">Target</div>
            <div class="bench-val-static" style="color:var(--success)">${def.target}<span style="font-size:12px"> ${def.unit}</span></div>
          </div>
        </div>
        <div class="bench-progress-bar">
          <div class="bench-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="bench-progress-pct">${pct}% to target${def.lowerBetter ? ' (lower = better)' : ''}</div>
        ${suggestHtml}
        ${hasSparkline ? `<div class="bench-sparkline-wrap"><canvas id="spark-${def.id}"></canvas></div>` : ''}
      </div>`;
    }).join('');

    BENCHMARKS_DEF.forEach(def => {
      const history = (hist[def.id] || []).slice(-10);
      if (history.length < 2) return;
      const canvas = document.getElementById('spark-' + def.id);
      if (!canvas) return;
      _benchCharts[def.id] = new Chart(canvas, {
        type: 'line',
        data: {
          labels: history.map(e => e.date.slice(5)),
          datasets: [{ data: history.map(e => e.value), borderColor:'#4a7c59', backgroundColor:'rgba(74,124,89,0.12)', borderWidth:2, pointRadius:3, pointBackgroundColor:'#4a7c59', tension:0.3, fill:true }],
        },
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ display:false } },
          scales:{ x:{ display:false }, y:{ display:false } },
        },
      });
    });
  }

  function updateBenchValue(id, raw) {
    const val = parseFloat(raw);
    if (isNaN(val)) return;
    const d = loadBenchData(); d[id] = val; saveBenchData(d);
    addBenchEntry(id, val);
    renderBenchCards();
  }

  function renderZone2History() {
    const rows = [];
    loadSessions(KEY_GYM).forEach(s => {
      if (s.zone2?.duration) rows.push({ date:s.date, modality:s.zone2.modality||'Bike', duration:s.zone2.duration, avgHR:s.zone2.avgHR });
    });
    rows.sort((a,b) => b.date.localeCompare(a.date));
    const tbody = document.getElementById('z2-history-body');
    const empty = document.getElementById('z2-empty');
    if (!tbody) return;
    if (!rows.length) { tbody.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
    if (empty) empty.style.display = 'none';
    tbody.innerHTML = rows.map(r => `<tr>
      <td style="white-space:nowrap">${formatDisplayDate(r.date)}</td>
      <td>${r.modality}</td>
      <td>${r.duration} min</td>
      <td>${r.avgHR ? r.avgHR + ' bpm' : '—'}</td>
    </tr>`).join('');
  }

  /* ═══════════════════════════════════════════════════════════════════
     OVERLOAD TRACKING
  ═══════════════════════════════════════════════════════════════════ */
  const PULL_IDS = new Set(['ua-pullup','ua-ext-rot','ua-latpd','ua-srow','ua-facepull',
    'ub-dbrow','ub-ext-rot','ub-scappu','uc-chinup','uc-ext-rot','uc-latpd','uc-srow',
    'uc-hlr','ep-ext-rot','ep-slyder']);
  const PUSH_IDS = new Set(['ub-adip','ub-csrow','uc-dbpress']);

  let _olWeightChart = null;
  let _olSelectSeeded = false;

  function getAllExercises() {
    const seen = new Set(), list = [];
    Object.values(GYM_EXERCISES).forEach(arr => arr.forEach(ex => {
      if (ex.type === 'zone2' || seen.has(ex.id)) return;
      seen.add(ex.id);
      list.push({ id:ex.id, name:ex.name, repRange:ex.repRange, inc:ex.inc, type:ex.type });
    }));
    return list;
  }

  function getExSessions(exId) {
    return loadSessions(KEY_GYM)
      .filter(s => s.exercises?.some(e => e.id === exId && e.sets?.length))
      .map(s => {
        const ex = s.exercises.find(e => e.id === exId);
        return { date:s.date, sets:ex.sets, notes:ex.notes||'', progressionFlag:ex.progressionFlag||false };
      })
      .sort((a,b) => b.date.localeCompare(a.date));
  }

  function renderOverload() {
    const sel = document.getElementById('ol-exercise-select');
    if (!sel) return;
    if (!_olSelectSeeded) {
      getAllExercises().forEach(ex => {
        const o = document.createElement('option');
        o.value = ex.id; o.textContent = ex.name;
        sel.appendChild(o);
      });
      sel.addEventListener('change', renderOverloadForExercise);
      _olSelectSeeded = true;
      // Default to first exercise that actually has session data
      const firstWithData = getAllExercises().find(ex => getExSessions(ex.id).length > 0);
      if (firstWithData) sel.value = firstWithData.id;
    }
    renderOverloadForExercise();
    renderStallAlerts();
    renderPullPushRatio();
  }

  function renderOverloadForExercise() {
    const sel = document.getElementById('ol-exercise-select');
    if (!sel) return;
    const exId    = sel.value;
    const sessions = exId ? getExSessions(exId) : [];
    const tbody   = document.getElementById('ol-history-body');
    const empty   = document.getElementById('ol-history-empty');

    if (!sessions.length) {
      if (tbody) tbody.innerHTML = '';
      if (empty) empty.style.display = 'block';
    } else {
      if (empty) empty.style.display = 'none';
      if (tbody) tbody.innerHTML = sessions.map(s => {
        const setCells = [0,1,2,3].map(i => {
          const st = s.sets[i];
          if (!st) return '<td style="color:var(--text-sec)">—</td>';
          const v = st.secs != null ? `${st.secs}s` : `${st.weight}×${st.reps}`;
          return `<td>${v}</td>`;
        }).join('');
        const rirs = s.sets.filter(st => st.rir !== undefined).map(st => parseFloat(st.rir)||0);
        const avgRir = rirs.length ? (rirs.reduce((a,b)=>a+b,0)/rirs.length).toFixed(1) : '—';
        return `<tr>
          <td style="white-space:nowrap">${formatDisplayDate(s.date)}</td>
          ${setCells}
          <td>${avgRir}</td>
          <td style="max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${s.notes||''}">${s.notes||'—'}</td>
          <td class="${s.progressionFlag ? 'ol-progressed' : ''}">${s.progressionFlag ? '↑' : ''}</td>
        </tr>`;
      }).join('');
    }

    // Weight chart
    if (_olWeightChart) { try { _olWeightChart.destroy(); } catch {} _olWeightChart = null; }
    const canvas = document.getElementById('ol-weight-chart');
    if (canvas && sessions.length >= 2) {
      const sorted  = sessions.slice().reverse();
      const labels  = sorted.map(s => s.date.slice(5));
      const weights = sorted.map(s => { const w = parseFloat(s.sets[0]?.weight); return isNaN(w) ? null : w; });
      const e1rms   = sorted.map(s => bestSetE1RM(s.sets));   // estimated 1RM trend
      const hasE1   = e1rms.some(v => v !== null);
      if (weights.some(w => w !== null)) {
        const datasets = [
          { label:'Working weight', data:weights, borderColor:'#4a7c59', backgroundColor:'rgba(74,124,89,0.1)', borderWidth:2.5, pointRadius:4, pointBackgroundColor:'#4a7c59', tension:0.2, fill:true },
        ];
        if (hasE1) datasets.push(
          { label:'Est. 1RM', data:e1rms, borderColor:'#b5762a', backgroundColor:'transparent', borderWidth:2, borderDash:[5,4], pointRadius:3, pointBackgroundColor:'#b5762a', tension:0.2, fill:false }
        );
        _olWeightChart = new Chart(canvas, {
          type:'line',
          data:{ labels, datasets },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ display:hasE1, position:'bottom', labels:{ boxWidth:12, font:{ size:11 } } } },
            scales:{ x:{ ticks:{ font:{ size:10 }, maxRotation:0 }, grid:{ display:false } }, y:{ ticks:{ font:{ size:11 } } } },
          },
        });
      }
    }

    renderProgressionStatus(exId, sessions);
  }

  function renderProgressionStatus(exId, sessions) {
    const sec = document.getElementById('ol-status-section');
    if (!sec) return;
    if (!sessions.length) { sec.innerHTML = ''; return; }

    const exDef = getAllExercises().find(e => e.id === exId);
    if (!exDef) { sec.innerHTML = ''; return; }

    const latest        = sessions[0];
    const currentWeight = latest.sets[0]?.weight ?? '—';
    const repRangeStr   = exDef.repRange ? `${exDef.repRange[0]}–${exDef.repRange[1]}` : 'N/A';

    let sessionsAtWeight = 0;
    for (const s of sessions) {
      if (String(s.sets[0]?.weight) === String(currentWeight)) sessionsAtWeight++;
      else break;
    }

    let statusClass = 'ol-status-building', statusText = 'Building reps', statusIcon = 'fa-dumbbell';
    if (latest.progressionFlag) {
      statusClass = 'ol-status-ready'; statusText = 'Ready to progress'; statusIcon = 'fa-arrow-trend-up';
    } else if (sessions.length >= 2 && sessions[1].progressionFlag) {
      statusClass = 'ol-status-settling'; statusText = 'Just progressed — settling'; statusIcon = 'fa-clock';
    }

    const inc  = exDef.inc || 2.5;
    const wNum = parseFloat(currentWeight);
    const nextW = !isNaN(wNum) ? +(wNum + inc).toFixed(2) : null;

    // Estimated 1RM — latest session and all-time best for this lift.
    const latestE1 = bestSetE1RM(latest.sets);
    const e1all    = sessions.map(s => bestSetE1RM(s.sets)).filter(v => v != null);
    const bestE1   = e1all.length ? Math.max(...e1all) : null;

    sec.innerHTML = `<div class="card">
      <div class="card-title">Progression Status</div>
      <div class="ol-status-badge ${statusClass}"><i class="fa-solid ${statusIcon}"></i> ${statusText}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="stat-box"><div class="val">${currentWeight}${!isNaN(wNum)?' kg':''}</div><div class="lbl">Current weight</div></div>
        <div class="stat-box"><div class="val">${repRangeStr} reps</div><div class="lbl">Rep range</div></div>
        <div class="stat-box"><div class="val">${sessionsAtWeight}</div><div class="lbl">Sessions at weight</div></div>
        <div class="stat-box"><div class="val">${nextW !== null ? nextW+' kg' : '—'}</div><div class="lbl">Suggested next</div></div>
        <div class="stat-box"><div class="val">${latestE1 != null ? latestE1+' kg' : '—'}</div><div class="lbl">Est. 1RM (latest)</div></div>
        <div class="stat-box"><div class="val">${bestE1 != null ? bestE1+' kg' : '—'}</div><div class="lbl">Est. 1RM (best)</div></div>
      </div>
    </div>`;
  }

  function renderStallAlerts() {
    const list = document.getElementById('ol-stalls-list');
    if (!list) return;
    const stalls = [];
    getAllExercises().forEach(ex => {
      const sessions = getExSessions(ex.id);
      if (sessions.length < 3) return;
      const last3 = sessions.slice(0, 3);
      const w0 = last3[0].sets[0]?.weight;
      if (w0 == null) return;
      if (last3.every(s => String(s.sets[0]?.weight) === String(w0)) && last3.every(s => !s.progressionFlag)) {
        stalls.push({ name:ex.name, weight:w0 });
      }
    });
    if (!stalls.length) {
      list.innerHTML = `<div style="font-size:13px;color:var(--text-sec);padding:8px 0">No stalls detected — keep going!</div>`;
      return;
    }
    list.innerHTML = stalls.map(s => `<div class="ol-stall-card">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <div>
        <div class="ol-stall-name">${s.name}</div>
        <div class="ol-stall-sub">3+ sessions at ${s.weight}${!isNaN(parseFloat(s.weight))?' kg':''} — consider progression or deload</div>
      </div>
    </div>`).join('');
  }

  function renderPullPushRatio() {
    let pull = 0, push = 0;
    loadSessions(KEY_GYM).forEach(s => {
      (s.exercises||[]).forEach(ex => {
        const n = ex.sets?.length || 0;
        if (PULL_IDS.has(ex.id)) pull += n;
        else if (PUSH_IDS.has(ex.id)) push += n;
      });
    });
    const ratio   = push > 0 ? (pull / push).toFixed(1) : pull > 0 ? '∞' : '0';
    const isGreen = push > 0 && (pull / push) >= 2.0;
    const display = document.getElementById('pp-ratio-display');
    const detail  = document.getElementById('pp-ratio-detail');
    if (display) { display.textContent = (ratio !== '0' && ratio !== '∞') ? `${ratio}:1` : ratio; display.className = `pp-ratio ${isGreen ? 'green' : 'red'}`; }
    if (detail)  detail.textContent = `${pull} pulling sets : ${push} pushing sets${push > 0 ? ` — ratio ${ratio}:1` : ''}`;
  }

