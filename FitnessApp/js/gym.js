  /* ─── GYM LOGGER DATA ──────────────────────────────────────────── */
  const WEIGHT_OPTS_BASE = ['BW',1,1.5,2,2.5,3,3.5,4,4.5,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
    22.5,25,27.5,30,32.5,35,37.5,40,42.5,45,47.5,50,52.5,55,57.5,60,65,70,75,80,85,90,95,100,110,120,130,140,150];

  const GYM_EXERCISES = {
    'Upper A': [
      { id:'ua-pullup',   name:'Pull-up neutral grip',           sets:4, repRange:[3,4],   weight:'BW', type:'bw',       cue:'Full dead hang, no kip, 2-sec descent', caution:'Left middle finger A2 pulley — stop on any finger pain' },
      { id:'ua-ext-rot',  name:'Cable external rotation',        sets:3, repRange:[12,15], weight:6.25, inc:1.25, type:'weighted', staple:true, cue:'Elbow pinned to ribs, slow, no momentum' },
      { id:'ua-latpd',    name:'Lat pulldown',                   sets:3, repRange:[8,10],  weight:60,   inc:2.5,  type:'weighted', cue:'Tuck elbows to ribs, no torso swing' },
      { id:'ua-wrist',    name:'Reverse wrist curl',             sets:3, repRange:[12,15], weight:5,    inc:1.25, type:'weighted', staple:true, cue:'Full range, burn in muscle belly not elbow' },
      { id:'ua-srow',     name:'Seated cable row',               sets:3, repRange:[10,12], weight:60,   inc:2.5,  type:'weighted', cue:'Proud chest, retract scapulae, no shrug' },
      { id:'ua-facepull', name:'Face pull',                      sets:3, repRange:[15,15], weight:17.5, inc:2.5,  type:'weighted', cue:'Pull to forehead, thumbs back' },
      { id:'ua-deadbug',  name:'Dead bug',                       sets:3, repRange:[8,8],   weight:'BW', type:'bw',       cue:'Low back glued to floor' },
      { id:'ua-pallof',   name:'Pallof press',                   sets:2, repRange:[10,10], weight:10,   inc:2.5,  type:'weighted', cue:'Resist rotation, ribs down' },
    ],
    'Engine + Lower': [
      { id:'el-zone2',   name:'Zone 2 cardio', type:'zone2' },
      { id:'el-hipab',   name:'Seated hip abductor',             sets:3, repRange:[15,15], weight:30,   inc:5,    type:'weighted', cue:'Glute medius, no foot loading' },
      { id:'el-bandab',  name:'Side-lying band hip abduction',   sets:2, repRange:[15,15], weight:'BW', type:'bw',       cue:'Slow, no hip rock' },
      { id:'el-hamcurl', name:'Lying hamstring curl',            sets:3, repRange:[10,12], weight:20,   inc:2.5,  type:'weighted', cue:'Moderate load only', caution:'Proximal hamstring tendinopathy right — keep moderate and pain-free' },
      { id:'el-calf',    name:'Left single-leg calf raise',      sets:3, repRange:[12,12], weight:'BW', type:'bw',       cue:'Left leg only, full range, pause at top' },
      { id:'el-plank',   name:'Forearm plank',                   sets:3, type:'timed',     weight:'BW', targetSec:30, inc:5, cue:'Hips level, no sag' },
    ],
    'Upper B': [
      { id:'ub-dbrow',   name:'Single-arm DB row',               sets:4, repRange:[8,10],  weight:26,   inc:2,    type:'weighted', cue:'Brace hard, no rotation' },
      { id:'ub-ext-rot', name:'Cable external rotation',         sets:3, repRange:[12,15], weight:6.25, inc:1.25, type:'weighted', staple:true, cue:'Quality over load' },
      { id:'ub-csrow',   name:'Chest-supported row',             sets:3, repRange:[10,12], weight:50,   inc:2.5,  type:'weighted', cue:'Squeeze scapulae, control the negative' },
      { id:'ub-wrist',   name:'Reverse wrist curl',              sets:3, repRange:[12,15], weight:5,    inc:1.25, type:'weighted', staple:true, cue:'Own the range' },
      { id:'ub-adip',    name:'Assisted dip',                    sets:3, repRange:[6,8],   weight:'BW', type:'assisted', cue:'Slight forward lean, control down', caution:'Stop above pain-free depth' },
      { id:'ub-scappu',  name:'Scapular pull-up',                sets:3, repRange:[8,10],  weight:'BW', type:'bw',       cue:'Feel lats switch on, no shrug' },
      { id:'ub-bdog',    name:'Bird dog',                        sets:3, repRange:[8,8],   weight:'BW', type:'bw',       cue:'Slow, no hip tilt' },
    ],
    'Engine + Prehab': [
      { id:'ep-zone2',   name:'Zone 2 cardio', type:'zone2' },
      { id:'ep-ext-rot', name:'Cable external rotation',         sets:3, repRange:[15,15], weight:6.25, inc:1.25, type:'weighted', staple:true, cue:'Extra ER volume — most urgent finding' },
      { id:'ep-slyder',  name:'Side-lying DB external rotation', sets:2, repRange:[12,12], weight:2.5,  inc:1.25, type:'weighted', cue:'Tiny weight, perfect form, elbow tucked' },
      { id:'ep-wrist',   name:'Reverse wrist curl',              sets:3, repRange:[15,15], weight:5,    inc:1.25, type:'weighted', staple:true, cue:'Extra wrist extensor volume' },
      { id:'ep-pallof',  name:'Pallof press',                    sets:3, repRange:[10,10], weight:10,   inc:2.5,  type:'weighted', cue:'Anti-rotation, ribs down' },
      { id:'ep-ghd',     name:'GHD back extension',              sets:2, repRange:[12,12], weight:'BW', type:'bw',       cue:'Finish at straight line only — do NOT hyperextend', caution:'Controlled range, foot anchored' },
    ],
    'Upper C': [
      { id:'uc-chinup',  name:'Pull-up supinated chin-up',       sets:4, repRange:[3,4],   weight:'BW',  type:'bw',       cue:'Control the negative' },
      { id:'uc-ext-rot', name:'Cable external rotation',         sets:3, repRange:[12,15], weight:6.25,  inc:1.25, type:'weighted', staple:true, cue:'Never skip' },
      { id:'uc-latpd',   name:'Lat pulldown',                   sets:3, repRange:[8,10],  weight:60,    inc:2.5,  type:'weighted', cue:'Elbow tuck, no swing' },
      { id:'uc-wrist',   name:'Reverse wrist curl',              sets:3, repRange:[12,15], weight:5,     inc:1.25, type:'weighted', staple:true, cue:'' },
      { id:'uc-dbpress', name:'Neutral DB shoulder press',       sets:3, repRange:[8,10],  weight:13,    inc:2,    type:'weighted', cue:'Ribs down, no low-back arch', caution:'No heavy OHP pre-physio, shoulder flags present' },
      { id:'uc-srow',    name:'Seated cable row',                sets:3, repRange:[10,12], weight:60,    inc:2.5,  type:'weighted', cue:'Extra pull volume' },
      { id:'uc-hlr',     name:'Hanging leg raise',               sets:3, repRange:[8,10],  weight:'BW',  type:'bw',       cue:'Switch to lying if grip fails first' },
    ],
  };

  /* ─── EXERCISE JUSTIFICATIONS ──────────────────────────────────────── */
  const EX_WHY_TEXTS = (function() {
    const ER    = "Your external rotation strength tested at 6.25kg against a lat pulldown of 90kg — a 14:1 ratio that is a direct pathway to rotator cuff injury. This exercise is the single most urgent clinical finding from your assessment. Every session of this work closes that ratio and builds the protective shoulder strength that lets you pull heavy safely for years.";
    const WRIST = "Your wrist flexor-to-extensor ratio tested at 5:1 — the ideal for injury prevention is 2:1. This imbalance is the primary driver of your golfer's elbow recurrence risk. Every set of reverse wrist curls chips away at that ratio and builds the antagonist forearm strength that protects your tendons during high-volume climbing.";
    const SROW  = "Horizontal pulling is the foundation of scapular health and shoulder stability for climbing. Your cable row tested at 80kg with bilateral scapular symmetry — the best combined result of your entire assessment. This exercise maintains and builds that base, directly supporting the retraction control you need for dynamic moves and steep wall positions.";
    const LATPD = "Your lat pulldown tested at 90kg full stack — a genuine strength. The goal here is to reinforce the elbow-tuck pattern that maximises lat engagement over biceps, and to build the vertical pulling endurance that underpins lock-offs and roof climbing. Consistent lat strength is what keeps you on the wall when pump starts to set in.";
    const PALLOF = "Rotational stability is the missing piece between having strong abs and having a strong climbing core. The Pallof press trains your trunk to resist rotation under load, which directly translates to keeping your hips square on steep terrain, controlling flag positions, and absorbing dynamic moves without losing body tension.";
    return {
      'ua-pullup':   "The strict pull-up is the single most important gym metric for climbing performance. Your honest baseline is 5 reps at 94kg — every additional rep directly translates to harder moves on the wall. Neutral grip is prioritised early because it is the most elbow-friendly variation, protecting your golfer's elbow history while you build volume.",
      'ua-ext-rot':  ER,   'ub-ext-rot':  ER,   'ep-ext-rot':  ER,   'uc-ext-rot':  ER,
      'ua-latpd':    LATPD, 'uc-latpd':   LATPD,
      'ua-wrist':    WRIST, 'ub-wrist':   WRIST, 'ep-wrist':   WRIST, 'uc-wrist':   WRIST,
      'ua-srow':     SROW,  'uc-srow':    SROW,
      'ua-pallof':   PALLOF, 'ep-pallof':  PALLOF,
      'ua-facepull': "Face pulls train the rear deltoid and external rotators together under light load — essential shoulder health work for anyone pulling as much as you do. They directly counteract the internal rotation pattern that builds up from climbing and desk work, and they support the rotator cuff protective work you are already doing with cable external rotation.",
      'ua-deadbug':  "Your core tests showed lumbar stabiliser endurance as the consistent weak link — your lower back lifts before your legs or arms fail on every core test. The dead bug trains anti-extension under load in exactly the position that matters for climbing: keeping your body rigid on overhangs and roof sections where your core is the only thing stopping your hips from sagging off the wall.",
      'el-hipab':    "Your glute medius is weak bilaterally — confirmed by knee cave on hinge movements and hip compensation on heel raises. Weak hip abductors increase stress on your injured ankle and foot by removing the stabilising force from above. Strengthening this now, while the foot is still restricted, is one of the most protective things you can do before returning to full loading.",
      'el-bandab':   "This is the isolated activation version of the same glute medius work as the machine — lighter, slower, and more targeted. Together these two exercises build the hip stability that underpins every single-leg position on the climbing wall, from smearing on slab to flagging on overhang.",
      'el-hamcurl':  "Your posterior chain is undertrained relative to your anterior chain — a pattern consistent with desk work and climbing without adequate antagonist training. Hamstring strength directly supports knee and hip stability on the wall and contributes to the heel hook loading you currently cannot generate effectively. Load is kept conservative due to the suspected proximal hamstring tendinopathy on the right.",
      'el-calf':     "Your dorsiflexion deficit of 3cm bilaterally is your highest-impact single mobility limitation. Single-leg calf raises build the eccentric calf strength and tendon resilience that underpin dorsiflexion range — you cannot stretch your way to ankle mobility without also strengthening the structures around it. Left leg only until the right foot is cleared by the physio.",
      'el-plank':    "Lumbar stabiliser endurance was the consistent failure mode across all three of your core tests — your lower back sags before anything else gives out. The plank is the most direct training stimulus for this quality. Improving your plank time from 62 seconds toward 90 seconds and beyond directly improves your ability to maintain body tension on sustained climbing sequences.",
      'ub-dbrow':    "Horizontal pulling volume is the backbone of balanced shoulder health for climbers. Your single-arm row tested at 30kg with no bilateral asymmetry — an important positive. This exercise builds the mid-back thickness and scapular control that stabilises your shoulder under load, and the unilateral format ensures neither side compensates for the other.",
      'ub-csrow':    "The chest-supported variation removes any opportunity for lower back compensation, forcing all the work into the mid-back and rear delts. This is horizontal pulling volume at its most honest — you cannot cheat it with a torso swing. It directly supports the scapular retraction pattern that protects your shoulder on heavy pulling days.",
      'ub-adip':     "Your dip max tested at 4 reps — significantly below the 10–15 rep recreational benchmark and well behind your pulling numbers. Dip strength is the primary pushing antagonist to your pulling work, and weak triceps and anterior shoulders limit your ability to mantel, push through awkward top-out positions, and maintain elbow health under climbing load. The assist lets you train real volume while your strength catches up.",
      'ub-scappu':   "You scored 9 clean scapular pull-up reps with correct lat and lower trap activation — one of the best results in your entire assessment. This movement trains the bottom of the pull-up specifically: the scapular depression that initiates every efficient pull and protects the shoulder from impingement. Maintaining and building this is foundational climbing strength.",
      'ub-bdog':     "The bird dog trains contralateral limb coordination and anti-rotation stability — exactly the core quality you use when flagging and back-flagging on the wall. Your flagging is already instinctive, but building the underlying motor control under deliberate slow load makes it more reliable under fatigue and on harder terrain where the positions are less familiar.",
      'ep-slyder':   "A lighter, more isolated version of the cable external rotation, done lying to eliminate any compensation. Thursday's extra ER volume exists because 6.25kg against 90kg of lat strength is the most urgent injury finding in your entire assessment — the shoulder cannot be protected by one set of exercises alone. This second stimulus accelerates the ratio correction that keeps your rotator cuff healthy under climbing load.",
      'ep-ghd':      "Your posterior chain endurance tested at 41 seconds on the arch hold — adequate but not strong. The GHD back extension builds the lumbar erector and glute endurance that underpins body tension on steep terrain, controls your hip position on dynamic moves, and supports the deadlift and hinge patterns you will be loading more heavily once the foot is cleared. Controlled range only — no hyperextension.",
      'uc-chinup':   "The supinated chin-up recruits the biceps more heavily alongside the lats, giving slightly different stimulus to the same pulling pattern. Your assessment showed no elbow discomfort on this variation — an important positive given your golfer's elbow history. Rotating between neutral and supinated grip across the week reduces cumulative tendon stress while maintaining pulling volume.",
      'uc-dbpress':  "Your strict overhead press tested at 40kg with a lower back arch at every weight — the real strength ceiling without compensation is likely 30–35kg. The arch is a symptom of thoracic stiffness and left shoulder restriction, not pressing weakness. Neutral grip reduces shoulder impingement risk compared to a barbell and keeps the movement pain-free while you build the overhead stability that translates to lock-offs and reaching moves on the wall.",
      'uc-hlr':      "Hanging leg raises build hip flexor strength and core compression simultaneously — exactly the combination you need to load heel hooks and toe hooks effectively. Your assessment identified that you cannot generate sufficient hip flexor tension to load hooks properly. This exercise directly addresses that limiter while also training the dead hang grip endurance that feeds into your 90-second hang target.",
    };
  })();

  /* ─── GYM LOGGER HELPERS ────────────────────────────────────────── */
  function getTimedTarget(exId, defaultSec) {
    try { const t = JSON.parse(localStorage.getItem('tt_ex_targets')||'{}'); return t[exId] || defaultSec; }
    catch { return defaultSec; }
  }
  function setTimedTarget(exId, sec) {
    try { const t = JSON.parse(localStorage.getItem('tt_ex_targets')||'{}'); t[exId]=sec; localStorage.setItem('tt_ex_targets',JSON.stringify(t)); }
    catch {}
  }

  function getLastGymEx(exId) {
    const sessions = loadSessions(KEY_GYM);
    for (let i = sessions.length - 1; i >= 0; i--) {
      const ex = sessions[i].exercises?.find(e => e.id === exId);
      if (ex && ex.sets?.length) return { date: sessions[i].date, sets: ex.sets };
    }
    return null;
  }

  function formatLastGymEx(last) {
    if (!last) return 'No previous data';
    const dateStr = formatDisplayDate(last.date);
    const parts = last.sets.map((s, i) => {
      const val = s.secs != null ? `${s.secs}s` : `${s.weight}×${s.reps}`;
      return `Set${i+1} ${val}`;
    });
    return `Last session ${dateStr}: ${parts.join(', ')}`;
  }

  function wOpts(def) {
    const base = [...WEIGHT_OPTS_BASE];
    const defN = (def !== 'BW') ? Number(def) : 'BW';
    if (defN !== 'BW' && !base.includes(defN)) {
      const idx = base.findIndex(v => typeof v === 'number' && v > defN);
      idx > -1 ? base.splice(idx, 0, defN) : base.push(defN);
    }
    return base.map(v => {
      const sel = String(v) === String(def) ? ' selected' : '';
      const lbl = v === 'BW' ? 'BW' : `${v} kg`;
      return `<option value="${v}"${sel}>${lbl}</option>`;
    }).join('');
  }

  function rOpts(def) {
    let h = '';
    for (let i = 1; i <= 30; i++) h += `<option value="${i}"${i === def ? ' selected' : ''}>${i}</option>`;
    return h;
  }

  function rirOpts(def) {
    def = def == null ? '2' : String(def);
    return ['0','1','2','3','4+'].map(v => `<option value="${v}"${v === def ? ' selected' : ''}>${v}</option>`).join('');
  }

  function buildSetRows(ex, lastData) {
    let html = '';
    for (let i = 0; i < ex.sets; i++) {
      const last  = lastData?.sets?.[i];
      const defW  = last?.weight  ?? ex.weight;
      const defR  = last?.reps    ?? (ex.repRange ? ex.repRange[0] : 1);
      const defRIR = last?.rir    ?? '2';
      const defSec = last?.secs   ?? getTimedTarget(ex.id, ex.targetSec || 30);

      if (ex.type === 'timed') {
        html += `<div class="set-row">
          <span class="set-lbl">Set ${i+1}</span>
          <input type="number" class="sel-secs" min="5" max="600" step="5" value="${defSec}" />
          <span style="font-size:12px;color:var(--text-sec);white-space:nowrap;flex-shrink:0">sec</span>
        </div>`;
      } else {
        html += `<div class="set-row">
          <span class="set-lbl">Set ${i+1}</span>
          <select class="sel-weight">${wOpts(defW)}</select>
          <select class="sel-reps">${rOpts(defR)}</select>
          <select class="sel-rir">${rirOpts(defRIR)}</select>
        </div>`;
      }
    }
    return html;
  }

  function renderExCard(ex) {
    if (ex.type === 'zone2') return '';
    const lastData = getLastGymEx(ex.id);
    const lastStr  = formatLastGymEx(lastData);
    const staple   = ex.staple ? `<span class="badge badge-staple">STAPLE</span>` : '';
    const cautionIcon = ex.caution
      ? `<span class="caution-icon" onclick="this.closest('.ex-card').querySelector('.caution-text').classList.toggle('open')">⚠️</span>`
      : '';
    const cautionText = ex.caution ? `<div class="caution-text">${ex.caution}</div>` : '';
    const cueHtml     = ex.cue    ? `<div class="ex-cue">${ex.cue}</div>` : '';
    const why = EX_WHY_TEXTS[ex.id];
    const whyHtml = why
      ? `<button class="why-btn" onclick="(function(b){var p=b.nextElementSibling;p.classList.toggle('open')})(this)">Why?</button><div class="why-body">${why}</div>`
      : '';

    return `<div class="card ex-card" data-ex-id="${ex.id}">
      <div class="ex-header">
        <span class="ex-name">${ex.name}</span>
        ${staple}${cautionIcon}
      </div>
      ${cautionText}
      ${cueHtml}
      ${whyHtml}
      <div class="ex-last">${lastStr}</div>
      <div class="set-rows">${buildSetRows(ex, lastData)}</div>
      <textarea class="ex-notes" placeholder="Notes…"></textarea>
    </div>`;
  }

  /* ─── GYM LOGGER RENDER ─────────────────────────────────────────── */
  function renderGymLogger() {
    const today     = new Date();
    const todayStr  = toDateStr(today);
    const settings  = loadSettings();
    const blockName = settings.block || getAutoBlock(todayStr);
    const dayType   = getDayType(blockName, today);

    document.getElementById('gym-screen-title').textContent = dayType || 'Rest Day';
    document.getElementById('gym-screen-sub').textContent   = `${formatDisplayDate(todayStr)} · ${blockName}`;

    const isEngine = ['Engine + Lower','Engine + Prehab'].includes(dayType);
    document.getElementById('gym-zone2-card').style.display = isEngine ? 'block' : 'none';

    const exercises = GYM_EXERCISES[dayType] || [];
    document.getElementById('gym-exercise-list').innerHTML = exercises.map(renderExCard).join('');
  }

  /* ─── PROGRESSIVE OVERLOAD ──────────────────────────────────────── */
  function checkOverload(ex, sets) {
    const out = { ready:false, nextWeight:null, stall:false };
    if (!sets.length) return out;

    if (ex.type === 'timed') {
      const target = getTimedTarget(ex.id, ex.targetSec || 30);
      if (sets.every(s => (s.secs || 0) >= target)) {
        out.ready = true;
        setTimedTarget(ex.id, target + 5);
      }
      return out;
    }

    if (ex.type === 'bw') {
      if (sets.every(s => s.reps >= ex.repRange[1])) out.ready = true;
      return out;
    }

    if (ex.type === 'weighted' || ex.type === 'assisted') {
      const top    = ex.repRange[1];
      const allHit = sets.every(s => s.reps >= top && ['0','1','2'].includes(String(s.rir)));
      if (allHit) {
        out.ready = true;
        const w = parseFloat(sets[0].weight);
        if (!isNaN(w)) out.nextWeight = +(w + (ex.inc || 2.5)).toFixed(2);
      }
      const sessions = loadSessions(KEY_GYM);
      const lastThree = [];
      for (let i = sessions.length - 1; i >= 0 && lastThree.length < 3; i--) {
        const ed = sessions[i].exercises?.find(e => e.id === ex.id);
        if (ed?.sets?.length) lastThree.push(ed);
      }
      if (lastThree.length >= 3) {
        const w0     = lastThree[0].sets[0]?.weight;
        const sameW  = lastThree.every(e => e.sets[0]?.weight === w0);
        const noProg = lastThree.every(e => !e.progressionFlag);
        if (sameW && noProg) out.stall = true;
      }
    }
    return out;
  }

  /* ─── SAVE GYM SESSION ──────────────────────────────────────────── */
  function saveGymSession() {
    const today     = new Date();
    const todayStr  = toDateStr(today);
    const settings  = loadSettings();
    const blockName = settings.block || getAutoBlock(todayStr);
    const dayType   = getDayType(blockName, today);
    const exercises = GYM_EXERCISES[dayType] || [];

    // STAPLE check — only warn on days that include staple exercises
    const staplesToday = exercises.filter(e => e.staple);
    if (staplesToday.length > 0) {
      const hasER = staplesToday.some(e => e.name.toLowerCase().includes('external rotation'));
      const hasWC = staplesToday.some(e => e.name.toLowerCase().includes('wrist curl'));
      if (!hasER || !hasWC) {
        if (!confirm('STAPLE exercises missing from today\'s plan — are you sure?')) return;
      }
    }

    const painScore   = parseInt(document.getElementById('pain-slider').value);
    const energyScore = parseInt(document.getElementById('energy-slider').value);

    let zone2 = null;
    if (['Engine + Lower','Engine + Prehab'].includes(dayType)) {
      zone2 = {
        duration: parseInt(document.getElementById('z2-duration').value) || 35,
        avgHR:    parseInt(document.getElementById('z2-hr').value) || null,
        modality: document.querySelector('#z2-modality .mod-pill.active')?.dataset.mod || 'Bike',
      };
    }

    const exerciseData     = [];
    const progressionAlerts = [];

    exercises.forEach(ex => {
      if (ex.type === 'zone2') return;
      const card = document.querySelector(`[data-ex-id="${ex.id}"]`);
      if (!card) return;

      let sets = [];
      if (ex.type === 'timed') {
        card.querySelectorAll('.sel-secs').forEach((inp, i) => {
          sets.push({ setNum: i+1, secs: parseInt(inp.value) || 0 });
        });
      } else {
        card.querySelectorAll('.set-row').forEach((row, i) => {
          const wEl  = row.querySelector('.sel-weight');
          const rEl  = row.querySelector('.sel-reps');
          const rirEl= row.querySelector('.sel-rir');
          if (!wEl) return;
          sets.push({ setNum:i+1, weight:wEl.value, reps:parseInt(rEl.value)||0, rir:rirEl.value });
        });
      }

      const notes = card.querySelector('.ex-notes')?.value || '';
      const flags = checkOverload(ex, sets);
      if (flags.ready && flags.nextWeight !== null) {
        progressionAlerts.push({ exercise: ex.name, suggestedWeight: flags.nextWeight });
      }
      exerciseData.push({ id:ex.id, name:ex.name, sets, notes, progressionFlag:flags.ready, stallFlag:flags.stall });
    });

    const session = { date:todayStr, block:blockName, dayType, painScore, energyScore, zone2, exercises:exerciseData, progressionAlerts };
    const sessions = loadSessions(KEY_GYM);
    sessions.push(session);
    localStorage.setItem(KEY_GYM, JSON.stringify(sessions));

    const stalls = exerciseData.filter(e => e.stallFlag);
    let msg = 'Session saved!';
    if (progressionAlerts.length) msg += `\n\n↑ Ready to progress:\n${progressionAlerts.map(a=>`${a.exercise} → ${a.suggestedWeight} kg`).join('\n')}`;
    if (stalls.length) msg += `\n\n⚠ Stall alert:\n${stalls.map(e=>e.name).join('\n')}`;
    alert(msg);

    renderDashboard();
    navigateTo('screen-home');
  }

  /* ─── GYM LOGGER INIT ───────────────────────────────────────────── */
  function initGymLogger() {
    const painSlider   = document.getElementById('pain-slider');
    const painVal      = document.getElementById('pain-val');
    const energySlider = document.getElementById('energy-slider');
    const energyVal    = document.getElementById('energy-val');
    painSlider.addEventListener('input',   () => { painVal.textContent   = painSlider.value; });
    energySlider.addEventListener('input', () => { energyVal.textContent = energySlider.value; });

    const z2Dur = document.getElementById('z2-duration');
    for (let m = 20; m <= 60; m += 5) {
      const opt = document.createElement('option');
      opt.value = m; opt.textContent = `${m} min`;
      if (m === 35) opt.selected = true;
      z2Dur.appendChild(opt);
    }

    document.getElementById('z2-modality').addEventListener('click', e => {
      const pill = e.target.closest('.mod-pill');
      if (!pill) return;
      document.querySelectorAll('#z2-modality .mod-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });

    document.getElementById('btn-complete-session').addEventListener('click', saveGymSession);
  }

