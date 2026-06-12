  /* ═══════════════════════════════════════════════════════════════════
     METRICS — derived training analytics

     Pure functions over the logged sessions. Nothing here writes data or
     touches the DOM; every function takes the raw session arrays (defaulting
     to what's in storage) so they can be unit-tested in isolation.

     The point: a hybrid athlete improving across strength, engine, mobility
     and rehab at once needs to see those modalities together. These helpers
     turn the raw logs into e1RM trends, tonnage, and a unified weekly load.
  ═══════════════════════════════════════════════════════════════════ */

  /* ─── Exercise classification (lazy, memoised) ──────────────────── */
  const _LOWER_IDS = ['el-hipab','el-hamcurl','el-calf','el-bandab'];
  let _exIndexCache = null;
  function _exIndex() {
    if (_exIndexCache) return _exIndexCache;
    const idx = {};
    Object.values(GYM_EXERCISES).forEach(arr => arr.forEach(ex => { idx[ex.id] = ex; }));
    _exIndexCache = idx;
    return idx;
  }

  // pull | push | lower | core  — used for volume balance.
  function exCategory(id) {
    if (typeof PULL_IDS !== 'undefined' && PULL_IDS.has(id)) return 'pull';
    if (typeof PUSH_IDS !== 'undefined' && PUSH_IDS.has(id)) return 'push';
    if (_LOWER_IDS.includes(id)) return 'lower';
    return 'core';
  }

  /* ─── e1RM (Epley) ──────────────────────────────────────────────── */
  // Estimated 1-rep max. Only meaningful for numeric loads; returns null otherwise.
  function epley1RM(weight, reps) {
    const w = parseFloat(weight), r = parseInt(reps);
    if (isNaN(w) || w <= 0 || isNaN(r) || r <= 0) return null;
    return +(w * (1 + r / 30)).toFixed(1);
  }

  // Best e1RM across a set array (a single logged exercise).
  function bestSetE1RM(sets) {
    let best = null;
    (sets || []).forEach(s => {
      const e = epley1RM(s.weight, s.reps);
      if (e != null && (best == null || e > best)) best = e;
    });
    return best;
  }

  // Per-session best-e1RM time series for one exercise, oldest → newest.
  function exerciseE1RMSeries(exId, gym) {
    gym = gym || loadSessions(KEY_GYM);
    const out = [];
    gym.forEach(s => {
      const ex = (s.exercises || []).find(e => e.id === exId && e.sets && e.sets.length);
      if (!ex) return;
      const e = bestSetE1RM(ex.sets);
      if (e != null) out.push({ date: s.date, e1rm: e });
    });
    return out.sort((a, b) => a.date.localeCompare(b.date));
  }

  /* ─── Volume / tonnage ──────────────────────────────────────────── */
  // Σ(weight × reps) over numeric-load sets in one session.
  function sessionTonnage(session) {
    let t = 0;
    (session.exercises || []).forEach(ex => (ex.sets || []).forEach(s => {
      const w = parseFloat(s.weight), r = parseInt(s.reps);
      if (!isNaN(w) && w > 0 && !isNaN(r) && r > 0) t += w * r;
    }));
    return Math.round(t);
  }

  // Tonnage split by movement category for one session.
  function sessionTonnageByCategory(session) {
    const by = { pull: 0, push: 0, lower: 0, core: 0 };
    (session.exercises || []).forEach(ex => {
      const cat = exCategory(ex.id);
      (ex.sets || []).forEach(s => {
        const w = parseFloat(s.weight), r = parseInt(s.reps);
        if (!isNaN(w) && w > 0 && !isNaN(r) && r > 0) by[cat] += w * r;
      });
    });
    Object.keys(by).forEach(k => by[k] = Math.round(by[k]));
    return by;
  }

  /* ─── Week helpers (Mon–Sun containing the reference date) ──────── */
  function weekRange(refDateStr) {
    const d = new Date(refDateStr + 'T00:00:00');
    const dow = (d.getDay() + 6) % 7; // Mon=0 … Sun=6
    const start = new Date(d); start.setDate(d.getDate() - dow);
    const end = new Date(start); end.setDate(start.getDate() + 6);
    return { start: toDateStr(start), end: toDateStr(end) };
  }
  function _inRange(dateStr, range) {
    return dateStr && dateStr >= range.start && dateStr <= range.end;
  }

  /* ─── Unified weekly load (the headline cross-modality view) ────── */
  function weeklyLoad(refDateStr, opts) {
    opts = opts || {};
    refDateStr = refDateStr || toDateStr(new Date());
    const range = weekRange(refDateStr);
    const gym   = opts.gym   || loadSessions(KEY_GYM);
    const mob   = opts.mob   || loadSessions(KEY_MOB);
    const rehab = opts.rehab || loadSessions(KEY_REHAB);

    const wkGym = gym.filter(s => _inRange(s.date, range));
    const byCat = { pull: 0, push: 0, lower: 0, core: 0 };
    let tonnage = 0, workingSets = 0, pullSets = 0, pushSets = 0, engineMinutes = 0, engineSessions = 0;

    wkGym.forEach(s => {
      tonnage += sessionTonnage(s);
      const c = sessionTonnageByCategory(s);
      Object.keys(byCat).forEach(k => byCat[k] += c[k]);
      (s.exercises || []).forEach(ex => {
        const n = (ex.sets || []).filter(st => parseInt(st.reps) > 0).length;
        workingSets += n;
        if (exCategory(ex.id) === 'pull') pullSets += n;
        else if (exCategory(ex.id) === 'push') pushSets += n;
      });
      if (s.zone2 && s.zone2.duration) { engineMinutes += parseInt(s.zone2.duration) || 0; engineSessions++; }
    });

    const mobDays   = new Set(mob.filter(s => _inRange(s.date, range)).map(s => s.date)).size;
    const rehabDays = new Set(rehab.filter(s => _inRange(s.date, range)).map(s => s.date)).size;

    return {
      weekStart: range.start,
      weekEnd: range.end,
      gymSessions: wkGym.length,
      tonnage,
      byCategory: byCat,
      workingSets,
      pullSets,
      pushSets,
      pullPushRatio: pushSets > 0 ? +(pullSets / pushSets).toFixed(1) : (pullSets > 0 ? null : 0),
      engineMinutes,
      engineSessions,
      mobilityDays: mobDays,
      rehabDays,
    };
  }

  /* ─── Benchmark auto-derivation from logged sessions ────────────── */
  // Which benchmarks can be read straight off the gym log (so the athlete
  // doesn't double-enter them). FTP and resting HR stay manual.
  const BENCH_DERIVE = {
    'b-pullup': { exIds: ['ua-pullup', 'uc-chinup'], metric: 'reps' },
    'b-dip':    { exIds: ['ub-adip'], metric: 'reps' },
    'b-cabler': { exIds: ['ua-ext-rot', 'ub-ext-rot', 'ep-ext-rot', 'uc-ext-rot'], metric: 'weight' },
    'b-wristr': { exIds: ['ua-wrist', 'ub-wrist', 'ep-wrist', 'uc-wrist'], metric: 'weight' },
  };

  // Best logged value for a benchmark, or null if nothing applies.
  function derivedBenchmark(benchId, gym) {
    const cfg = BENCH_DERIVE[benchId];
    if (!cfg) return null;
    gym = gym || loadSessions(KEY_GYM);
    let best = null, bestDate = null;
    gym.forEach(s => (s.exercises || []).forEach(ex => {
      if (!cfg.exIds.includes(ex.id)) return;
      (ex.sets || []).forEach(st => {
        const v = cfg.metric === 'reps' ? parseInt(st.reps) : parseFloat(st.weight);
        if (isNaN(v) || v <= 0) return;
        if (best == null || v > best) { best = v; bestDate = s.date; }
      });
    }));
    return best == null ? null : { value: best, date: bestDate };
  }
