  /* ─── GYM LOGGER DATA ──────────────────────────────────────────── */
  const WEIGHT_OPTS_BASE = ['BW',1,1.5,2,2.5,3,3.5,4,4.5,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
    22.5,25,27.5,30,32.5,35,37.5,40,42.5,45,47.5,50,52.5,55,57.5,60,65,70,75,80,85,90,95,100,110,120,130,140,150];

  const GYM_EXERCISES = {
    // Pull-up bar → cable station (5 exercises) → DB/floor
    'Upper A': [
      { id:'ua-pullup',   name:'Pull-up neutral grip',           sets:4, repRange:[3,4],   weight:'BW', type:'bw',       cue:'Full dead hang, no kip, 2-sec descent', caution:'Left middle finger A2 pulley — stop on any finger pain' },
      { id:'ua-latpd',    name:'Lat pulldown',                   sets:3, repRange:[8,10],  weight:60,   inc:2.5,  type:'weighted', cue:'Tuck elbows to ribs, no torso swing' },
      { id:'ua-srow',     name:'Seated cable row',               sets:3, repRange:[10,12], weight:60,   inc:2.5,  type:'weighted', cue:'Proud chest, retract scapulae, no shrug' },
      { id:'ua-facepull', name:'Face pull',                      sets:3, repRange:[15,15], weight:17.5, inc:2.5,  type:'weighted', cue:'Pull to forehead, thumbs back' },
      { id:'ua-ext-rot',  name:'Cable external rotation',        sets:3, repRange:[12,15], weight:6.25, inc:1.25, type:'weighted', staple:true, cue:'Elbow pinned to ribs, slow, no momentum' },
      { id:'ua-pallof',   name:'Pallof press',                   sets:2, repRange:[10,10], weight:10,   inc:2.5,  type:'weighted', cue:'Resist rotation, ribs down' },
      { id:'ua-wrist',    name:'Reverse wrist curl',             sets:3, repRange:[12,15], weight:5,    inc:1.25, type:'weighted', staple:true, cue:'Full range, burn in muscle belly not elbow' },
      { id:'ua-deadbug',  name:'Dead bug',                       sets:3, repRange:[8,8],   weight:'BW', type:'bw',       cue:'Low back glued to floor' },
    ],
    // Cardio machine → leg machines → floor
    'Engine + Lower': [
      { id:'el-zone2',   name:'Zone 2 cardio', type:'zone2' },
      { id:'el-hipab',   name:'Seated hip abductor',             sets:3, repRange:[15,15], weight:30,   inc:5,    type:'weighted', cue:'Glute medius, no foot loading' },
      { id:'el-hamcurl', name:'Lying hamstring curl',            sets:3, repRange:[10,12], weight:20,   inc:2.5,  type:'weighted', cue:'Moderate load only', caution:'Proximal hamstring tendinopathy right — keep moderate and pain-free' },
      { id:'el-calf',    name:'Left single-leg calf raise',      sets:3, repRange:[12,12], weight:'BW', type:'bw',       cue:'Left leg only, full range, pause at top' },
      { id:'el-bandab',  name:'Side-lying band hip abduction',   sets:2, repRange:[15,15], weight:'BW', type:'bw',       cue:'Slow, no hip rock' },
      { id:'el-plank',   name:'Forearm plank',                   sets:3, type:'timed',     weight:'BW', targetSec:30, inc:5, cue:'Hips level, no sag' },
    ],
    // Bar → dip station → DB → cable station → floor
    'Upper B': [
      { id:'ub-scappu',  name:'Scapular pull-up',                sets:3, repRange:[8,10],  weight:'BW', type:'bw',       cue:'Feel lats switch on, no shrug' },
      { id:'ub-adip',    name:'Assisted dip',                    sets:3, repRange:[6,8],   weight:'BW', type:'assisted', cue:'Slight forward lean, control down', caution:'Stop above pain-free depth' },
      { id:'ub-dbrow',   name:'Single-arm DB row',               sets:4, repRange:[8,10],  weight:26,   inc:2,    type:'weighted', cue:'Brace hard, no rotation' },
      { id:'ub-wrist',   name:'Reverse wrist curl',              sets:3, repRange:[12,15], weight:5,    inc:1.25, type:'weighted', staple:true, cue:'Own the range' },
      { id:'ub-ext-rot', name:'Cable external rotation',         sets:3, repRange:[12,15], weight:6.25, inc:1.25, type:'weighted', staple:true, cue:'Quality over load' },
      { id:'ub-csrow',   name:'Chest-supported row',             sets:3, repRange:[10,12], weight:50,   inc:2.5,  type:'weighted', cue:'Squeeze scapulae, control the negative' },
      { id:'ub-bdog',    name:'Bird dog',                        sets:3, repRange:[8,8],   weight:'BW', type:'bw',       cue:'Slow, no hip tilt' },
    ],
    // Cardio → cable station → DB/floor → GHD
    'Engine + Prehab': [
      { id:'ep-zone2',   name:'Zone 2 cardio', type:'zone2' },
      { id:'ep-ext-rot', name:'Cable external rotation',         sets:3, repRange:[15,15], weight:6.25, inc:1.25, type:'weighted', staple:true, cue:'Extra ER volume — most urgent finding' },
      { id:'ep-pallof',  name:'Pallof press',                    sets:3, repRange:[10,10], weight:10,   inc:2.5,  type:'weighted', cue:'Anti-rotation, ribs down' },
      { id:'ep-slyder',  name:'Side-lying DB external rotation', sets:2, repRange:[12,12], weight:2.5,  inc:1.25, type:'weighted', cue:'Tiny weight, perfect form, elbow tucked' },
      { id:'ep-wrist',   name:'Reverse wrist curl',              sets:3, repRange:[15,15], weight:5,    inc:1.25, type:'weighted', staple:true, cue:'Extra wrist extensor volume' },
      { id:'ep-ghd',     name:'GHD back extension',              sets:2, repRange:[12,12], weight:'BW', type:'bw',       cue:'Finish at straight line only — do NOT hyperextend', caution:'Controlled range, foot anchored' },
    ],
    // Bar (chin-up + HLR same bar) → cable station → DB
    'Upper C': [
      { id:'uc-chinup',  name:'Pull-up supinated chin-up',       sets:4, repRange:[3,4],   weight:'BW',  type:'bw',       cue:'Control the negative' },
      { id:'uc-hlr',     name:'Hanging leg raise',               sets:3, repRange:[8,10],  weight:'BW',  type:'bw',       cue:'Switch to lying if grip fails first' },
      { id:'uc-latpd',   name:'Lat pulldown',                   sets:3, repRange:[8,10],  weight:60,    inc:2.5,  type:'weighted', cue:'Elbow tuck, no swing' },
      { id:'uc-srow',    name:'Seated cable row',                sets:3, repRange:[10,12], weight:60,    inc:2.5,  type:'weighted', cue:'Extra pull volume' },
      { id:'uc-ext-rot', name:'Cable external rotation',         sets:3, repRange:[12,15], weight:6.25,  inc:1.25, type:'weighted', staple:true, cue:'Never skip' },
      { id:'uc-dbpress', name:'Neutral DB shoulder press',       sets:3, repRange:[8,10],  weight:13,    inc:2,    type:'weighted', cue:'Ribs down, no low-back arch', caution:'No heavy OHP pre-physio, shoulder flags present' },
      { id:'uc-wrist',   name:'Reverse wrist curl',              sets:3, repRange:[12,15], weight:5,     inc:1.25, type:'weighted', staple:true, cue:'' },
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

  /* ─── HOW-TO DATA ───────────────────────────────────────────────── */
  const EX_HOW_TO_TEXTS = (function() {
    function _h(svg, steps, feel, prog) {
      const li = steps.map(s => '<li>' + s + '</li>').join('');
      return '<span class="how-lbl">Before &amp; After</span>' + svg +
        '<span class="how-lbl">Step-by-Step</span><ul class="how-steps">' + li + '</ul>' +
        '<span class="how-lbl">What You Should Feel · Common Mistakes</span><p class="how-text">' + feel + '</p>' +
        '<span class="how-lbl">Progression · Climbing Carryover</span><p class="how-text">' + prog + '</p>';
    }

    /* ── SVGs ── */
    const SVG_PULLUP = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="60" y="46" width="60" height="5" rx="2.5" fill="#4a7c59"/><rect x="240" y="46" width="60" height="5" rx="2.5" fill="#4a7c59"/><circle cx="90" cy="107" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="82" y1="118" x2="76" y2="74" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="76" y1="74" x2="75" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="98" y1="118" x2="104" y2="74" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="104" y1="74" x2="105" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="75" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="105" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="81" y="118" width="18" height="46" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M81,124 Q68,148 80,163" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M99,124 Q112,148 100,163" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="85" y1="164" x2="82" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="95" y1="164" x2="98" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="270" cy="34" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="260" y1="76" x2="251" y2="64" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="251" y1="64" x2="255" y2="49" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="280" y1="76" x2="289" y2="64" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="289" y1="64" x2="285" y2="49" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="255" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="285" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="261" y="86" width="18" height="44" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M261,92 Q249,112 260,128" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M279,92 Q291,112 280,128" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="265" y1="130" x2="261" y2="162" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="275" y1="130" x2="279" y2="162" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="162" x2="258" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="279" y1="162" x2="282" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="180" y1="180" x2="180" y2="108" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="4,3"/><polygon points="180,98 175,111 185,111" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_EXT_ROT = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><circle cx="90" cy="32" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="54" width="20" height="56" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="74" y1="62" x2="80" y2="62" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="100" y1="62" x2="106" y2="62" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="74" y1="62" x2="72" y2="110" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="102" cy="90" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><line x1="102" y1="90" x2="67" y2="90" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="107" cy="62" r="9" fill="#e74c3c" opacity="0.3"/><line x1="84" y1="110" x2="81" y2="148" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="81" y1="148" x2="79" y2="183" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="110" x2="99" y2="148" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="99" y1="148" x2="101" y2="183" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="53" y="82" width="8" height="14" rx="2" fill="#4a7c59" opacity="0.4"/><line x1="61" y1="90" x2="67" y2="90" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><circle cx="270" cy="32" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="54" width="20" height="56" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="254" y1="62" x2="260" y2="62" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="280" y1="62" x2="286" y2="62" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="254" y1="62" x2="252" y2="110" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="282" cy="90" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><line x1="282" y1="90" x2="317" y2="90" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="287" cy="62" r="9" fill="#e74c3c" opacity="0.3"/><line x1="264" y1="110" x2="261" y2="148" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="148" x2="259" y2="183" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="110" x2="279" y2="148" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="279" y1="148" x2="281" y2="183" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><path d="M290,74 A14,14 0 0,1 310,90" fill="none" stroke="#4a7c59" stroke-width="1.5"/><polygon points="312,93 306,88 314,85" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_LATPD = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><line x1="50" y1="15" x2="145" y2="15" stroke="#4a7c59" stroke-width="5" stroke-linecap="round"/><line x1="230" y1="15" x2="325" y2="15" stroke="#4a7c59" stroke-width="5" stroke-linecap="round"/><circle cx="90" cy="62" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="82" y1="73" x2="56" y2="18" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="98" y1="73" x2="124" y2="18" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="80" y="83" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M80,90 Q66,114 79,133" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M100,90 Q114,114 101,133" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="84" y1="135" x2="81" y2="168" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="135" x2="99" y2="168" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="81" y1="168" x2="79" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="99" y1="168" x2="101" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="270" cy="80" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="262" y1="91" x2="250" y2="62" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="250" y1="62" x2="246" y2="18" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="278" y1="91" x2="290" y2="62" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="290" y1="62" x2="294" y2="18" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="260" y="91" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M260,97 Q246,120 259,139" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M280,97 Q294,120 281,139" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="264" y1="143" x2="261" y2="168" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="143" x2="279" y2="168" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="168" x2="259" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="279" y1="168" x2="281" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="270" y1="18" x2="270" y2="78" stroke="#4a7c59" stroke-width="2" stroke-dasharray="3,2"/><polygon points="270,82 265,73 275,73" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_WRIST = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="40" y="110" width="100" height="12" rx="4" fill="#c5d8cb"/><line x1="85" y1="110" x2="70" y2="78" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="90" y1="110" x2="90" y2="80" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="95" y1="110" x2="110" y2="78" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="90" y1="110" x2="90" y2="122" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="90" y1="122" x2="73" y2="148" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="73" y1="148" x2="70" y2="165" stroke="#e74c3c" stroke-width="4.5" stroke-linecap="round"/><circle cx="62" cy="168" r="7" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><text x="70" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">wrist dropped</text><rect x="220" y="110" width="100" height="12" rx="4" fill="#c5d8cb"/><line x1="265" y1="110" x2="250" y2="78" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="270" y1="110" x2="270" y2="80" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="275" y1="110" x2="290" y2="78" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="270" y1="110" x2="270" y2="122" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="270" y1="122" x2="253" y2="148" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="253" y1="148" x2="258" y2="130" stroke="#e74c3c" stroke-width="4.5" stroke-linecap="round"/><circle cx="262" cy="127" r="7" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><line x1="259" y1="135" x2="254" y2="155" stroke="#e74c3c" stroke-width="2" stroke-linecap="round"/><text x="260" y="175" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">wrist lifted</text><line x1="265" y1="148" x2="265" y2="118" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="265,112 260,122 270,122" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_SROW = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="18" y="100" width="8" height="60" rx="3" fill="#4a7c59" opacity="0.5"/><rect x="15" y="95" width="14" height="10" rx="2" fill="#4a7c59" opacity="0.6"/><line x1="26" y1="126" x2="58" y2="126" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><circle cx="90" cy="50" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="70" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="74" y1="78" x2="58" y2="126" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="106" y1="78" x2="116" y2="110" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="84" y1="122" x2="76" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="122" x2="104" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="76" y1="160" x2="62" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="104" y1="160" x2="118" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><rect x="198" y="100" width="8" height="60" rx="3" fill="#4a7c59" opacity="0.5"/><rect x="195" y="95" width="14" height="10" rx="2" fill="#4a7c59" opacity="0.6"/><circle cx="270" cy="50" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="70" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="254" y1="78" x2="248" y2="104" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="286" y1="78" x2="296" y2="112" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="248" y1="104" x2="216" y2="104" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="264" y1="122" x2="256" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="122" x2="284" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="256" y1="160" x2="242" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="284" y1="160" x2="298" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><rect x="250" y="66" width="40" height="8" rx="2" fill="#e74c3c" opacity="0.25"/><line x1="210" y1="126" x2="248" y2="108" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="250,104 245,115 254,112" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_FACEPULL = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="18" y="50" width="8" height="50" rx="3" fill="#4a7c59" opacity="0.5"/><circle cx="90" cy="55" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="75" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="74" y1="82" x2="34" y2="74" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="106" y1="82" x2="116" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="34" y1="74" x2="26" y2="72" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="84" y1="127" x2="80" y2="163" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="127" x2="100" y2="163" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="80" y1="163" x2="76" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="100" y1="163" x2="104" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><circle cx="270" cy="55" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="75" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="254" y1="82" x2="232" y2="55" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="286" y1="82" x2="308" y2="55" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><circle cx="254" cy="82" r="6" fill="#e74c3c" opacity="0.3"/><circle cx="286" cy="82" r="6" fill="#e74c3c" opacity="0.3"/><line x1="264" y1="127" x2="260" y2="163" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="127" x2="280" y2="163" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="260" y1="163" x2="256" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="280" y1="163" x2="284" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="198" y1="72" x2="250" y2="82" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><rect x="195" y="50" width="8" height="50" rx="3" fill="#4a7c59" opacity="0.5"/><line x1="203" y1="72" x2="248" y2="82" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="252,78 244,78 247,86" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_DEADBUG = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><line x1="30" y1="140" x2="155" y2="140" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="72" cy="118" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="63" y="128" width="18" height="14" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="72" y1="128" x2="72" y2="140" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="72" y1="133" x2="55" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="72" y1="133" x2="89" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="63" y1="128" x2="55" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="108" x2="48" y2="97" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="81" y1="128" x2="89" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="89" y1="108" x2="96" y2="97" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><rect x="55" y="130" width="16" height="7" rx="3" fill="#e74c3c" opacity="0.3"/><rect x="73" y="130" width="16" height="7" rx="3" fill="#e74c3c" opacity="0.3"/><line x1="210" y1="140" x2="335" y2="140" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="252" cy="118" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="243" y="128" width="18" height="14" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="252" y1="133" x2="235" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="252" y1="133" x2="269" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="243" y1="132" x2="218" y2="115" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="218" y1="115" x2="208" y2="100" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="132" x2="269" y2="140" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="235" y1="140" x2="220" y2="168" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="269" y1="140" x2="284" y2="110" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="238" y="130" width="30" height="7" rx="3" fill="#e74c3c" opacity="0.3"/><text x="72" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#6b7280">tabletop</text><text x="252" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#6b7280">arm + leg extend</text><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_PALLOF = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="20" y="70" width="8" height="60" rx="3" fill="#4a7c59" opacity="0.5"/><circle cx="90" cy="45" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="65" width="20" height="56" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="74" y1="72" x2="80" y2="93" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="106" y1="72" x2="80" y2="93" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="80" cy="94" r="5" fill="#4a7c59" opacity="0.4"/><line x1="80" y1="94" x2="33" y2="100" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><line x1="84" y1="121" x2="81" y2="158" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="121" x2="99" y2="158" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="81" y1="158" x2="79" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="99" y1="158" x2="101" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><circle cx="270" cy="45" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="65" width="20" height="56" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="254" y1="72" x2="260" y2="93" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="286" y1="72" x2="300" y2="93" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="260" y1="93" x2="300" y2="93" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="300" cy="93" r="5" fill="#4a7c59" opacity="0.4"/><rect x="256" y="96" width="30" height="8" rx="3" fill="#e74c3c" opacity="0.2"/><line x1="264" y1="121" x2="261" y2="158" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="121" x2="279" y2="158" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="158" x2="259" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="279" y1="158" x2="281" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="200" y1="100" x2="257" y2="93" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><rect x="197" y="70" width="8" height="60" rx="3" fill="#4a7c59" opacity="0.5"/><polygon points="258,89 252,96 260,98" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_HIPAB = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="35" y="80" width="110" height="70" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" opacity="0.6"/><circle cx="90" cy="52" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="72" width="20" height="40" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="80" y1="112" x2="65" y2="150" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="112" x2="115" y2="150" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="65" y1="150" x2="65" y2="165" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="115" y1="150" x2="115" y2="165" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="215" y1="80" width="110" height="70" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" opacity="0.6"/><rect x="215" y="80" width="110" height="70" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" opacity="0.6"/><circle cx="270" cy="52" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="72" width="20" height="40" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="260" y1="112" x2="236" y2="158" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="280" y1="112" x2="304" y2="158" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="236" y1="158" x2="236" y2="173" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="304" y1="158" x2="304" y2="173" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="236" cy="156" r="7" fill="#e74c3c" opacity="0.35"/><circle cx="304" cy="156" r="7" fill="#e74c3c" opacity="0.35"/><line x1="232" y1="150" x2="220" y2="138" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><line x1="308" y1="150" x2="320" y2="138" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="218,135 224,143 228,136" fill="#4a7c59"/><polygon points="322,135 316,143 312,136" fill="#4a7c59"/><text x="90" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_BANDAB = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><line x1="30" y1="135" x2="155" y2="135" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="70" cy="95" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="61" y="105" width="18" height="30" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="79" y1="120" x2="108" y2="120" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="108" y1="120" x2="135" y2="120" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="61" y1="135" x2="44" y2="135" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="79" y1="135" x2="44" y2="135" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><ellipse cx="115" cy="128" rx="15" ry="5" fill="none" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.6"/><line x1="210" y1="135" x2="335" y2="135" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="250" cy="95" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="241" y="105" width="18" height="30" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="259" y1="120" x2="288" y2="120" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="241" y1="135" x2="224" y2="135" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="259" y1="135" x2="224" y2="135" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="259" y1="120" x2="288" y2="100" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><circle cx="292" cy="97" r="6" fill="#e74c3c" opacity="0.3"/><line x1="288" y1="100" x2="288" y2="134" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="3,2"/><line x1="285" y1="104" x2="280" y2="90" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="279,86 277,95 285,92" fill="#4a7c59"/><text x="72" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="252" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_HAMCURL = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="30" y="90" width="120" height="18" rx="5" fill="#c5d8cb" stroke="#4a7c59" stroke-width="1.5" opacity="0.7"/><circle cx="68" cy="72" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="59" y="82" width="18" height="28" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="68" y1="90" x2="68" y2="108" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="59" y1="108" x2="44" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="44" y1="108" x2="36" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="77" y1="108" x2="92" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="92" y1="108" x2="140" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="210" y="90" width="120" height="18" rx="5" fill="#c5d8cb" stroke="#4a7c59" stroke-width="1.5" opacity="0.7"/><circle cx="248" cy="72" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="239" y="82" width="18" height="28" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="248" y1="90" x2="248" y2="108" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="239" y1="108" x2="224" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="257" y1="108" x2="272" y2="108" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="272" y1="108" x2="286" y2="80" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="286" y1="80" x2="300" y2="65" stroke="#e74c3c" stroke-width="3" stroke-linecap="round"/><line x1="278" y1="80" x2="274" y2="68" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="272,63 270,74 279,71" fill="#4a7c59"/><text x="72" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="252" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_CALF = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><circle cx="90" cy="28" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="48" width="20" height="56" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="74" y1="56" x2="72" y2="104" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="106" y1="56" x2="108" y2="104" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="84" y1="104" x2="82" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="104" x2="110" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="82" y1="140" x2="80" y2="175" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="80" y1="175" x2="68" y2="175" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="110" y1="140" x2="108" y2="178" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><line x1="108" y1="178" x2="120" y2="178" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><text x="90" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">heel low</text><circle cx="270" cy="28" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="48" width="20" height="56" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="254" y1="56" x2="252" y2="104" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="286" y1="56" x2="288" y2="104" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="264" y1="104" x2="262" y2="136" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="104" x2="290" y2="136" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="262" y1="136" x2="258" y2="158" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="258" y1="158" x2="272" y2="168" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="290" y1="136" x2="288" y2="175" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><line x1="288" y1="175" x2="300" y2="175" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/><line x1="264" y1="148" x2="261" y2="130" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="260,125 257,135 266,132" fill="#4a7c59"/><text x="270" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">heel high · left only</text><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_PLANK = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><line x1="30" y1="155" x2="155" y2="155" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="52" cy="128" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="52" y1="138" x2="52" y2="155" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="43" y1="143" x2="60" y2="143" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="52" y="138" width="70" height="10" rx="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="122" y1="148" x2="140" y2="155" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="57" y="140" width="58" height="6" rx="3" fill="#e74c3c" opacity="0.3"/><line x1="210" y1="155" x2="335" y2="155" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="232" cy="128" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="232" y1="138" x2="232" y2="155" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="223" y1="143" x2="240" y2="143" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="232" y="138" width="70" height="10" rx="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="302" y1="148" x2="320" y2="155" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="237" y="140" width="58" height="6" rx="3" fill="#e74c3c" opacity="0.3"/><circle cx="273" cy="126" r="11" fill="#fff3e0" stroke="#4a7c59" stroke-width="1.5" opacity="0.9"/><text x="273" y="130" text-anchor="middle" font-family="system-ui,sans-serif" font-size="10" fill="#4a7c59">⏱</text><text x="90" y="175" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">same position held</text><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Hold</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Hold</text></svg>';

    /* ── Steps / Feel / Progression ── */
    const PULLUP_NEUTRAL_DATA = _h(SVG_PULLUP,
      ['Find the neutral-grip (parallel) handles. Grip firmly with palms facing each other.',
       'Hang completely — arms fully extended, shoulders relaxed toward ears. This is the dead hang.',
       'Before pulling, depress your shoulder blades: pull them down and back, away from your ears.',
       'Drive your elbows toward your back pockets — do not think "pull hands to you", think "elbows to hips".',
       'Pull until your chin clears the bar. Chest should approach the bar, not chin jutting forward.',
       'Lower with full control over 2 seconds back to dead hang. Do not drop.',
       'Breathe: exhale on the way up, inhale on the way down.',
       'Stop the set the moment you cannot control the descent or chin stops clearing the bar cleanly.'],
      'You should feel your lats — the wide muscles under your armpits — doing the primary work, with your biceps assisting. A correct rep feels like pulling your elbows toward the floor. <strong>Common mistakes:</strong> (1) Kipping or swinging — slow the eccentric and the momentum goes away. (2) Chin-jut: the chin reaching forward rather than the body rising — focus on chest to bar. (3) Skipping the scapular set at the bottom — this causes shoulder impingement over time.',
      '<span class="how-sub">Progression</span>When you can complete all 4 sets at the top of your rep range (4 reps) with controlled 2-second descents, add 1 rep per set. Long-term target by September 2026: 4×8 strict neutral-grip pull-ups at bodyweight. <span class="how-sub">Climbing Carryover</span>Every additional pull-up rep directly adds lock-off capacity on steep terrain. Your assessment baseline is 5 reps — reaching 4×8 is a meaningful strength jump that translates to holding harder body positions and generating more pull on moves that currently require full effort.'
    );

    const ER_DATA = _h(SVG_EXT_ROT,
      ['Set cable pulley to elbow height. Attach a single handle. Stand side-on to the machine.',
       'Grip the handle in the hand furthest from the machine. Bend elbow to exactly 90 degrees.',
       'Pin your elbow firmly against your ribs. It does not move at any point during the exercise.',
       'Starting position: forearm points across your body toward the cable — this is internal rotation.',
       'Keeping the elbow glued to ribs, slowly rotate your forearm outward — like opening a gate.',
       'Rotate until forearm points straight forward or slightly past neutral.',
       'Hold end position for 1 second. Feel the back of the shoulder working.',
       'Slowly return to start under full control. The return is as important as the pull.',
       'Breathe: exhale as you rotate outward, inhale as you return.'],
      'You should feel the posterior shoulder — the rear part of the rotator cuff — working. It is a small, precise muscle contraction, not a powerful pull. <strong>Common mistakes:</strong> (1) Elbow lifting off the ribs — if it lifts even slightly, the weight is too heavy. (2) Using momentum to swing the forearm — this is a precision exercise; if you are swinging, slow down. (3) Rotating past comfortable range — stop at neutral.',
      '<span class="how-sub">Progression</span>When all sets can be completed at 15 reps with the elbow never leaving the ribs, add 1.25 kg. Current working weight 6.25 kg. Long-term target: reach a working weight that closes the 14:1 lat-to-ER ratio toward 5:1 or better. <span class="how-sub">Climbing Carryover</span>This is the single most urgent exercise in your programme. Your 14:1 ratio is a direct injury pathway. Every session of this work builds the protective shoulder strength that prevents rotator cuff damage under climbing load — specifically on the hard pulling moves at grades above your current limit.'
    );

    const LATPD_DATA = _h(SVG_LATPD,
      ['Adjust knee pad so thighs lock in firmly when seated. Select weight.',
       'Stand to reach the bar, take a wide overhand grip just outside shoulder width, then sit and lock thighs.',
       'Sit tall with a proud chest. Lean back slightly — about 10–15 degrees, not a big swing.',
       'Before pulling, set your shoulder blades by depressing them downward.',
       'Pull the bar down toward your upper chest by driving elbows down and toward your back pockets.',
       'Critical: tuck elbows in close to the body as they come down — avoid elbow flare, which transfers work to biceps away from lats.',
       'Bar should touch or nearly touch your upper chest. Do not stop at chin height.',
       'Pause briefly at the bottom and squeeze the lats — feel the muscles under your armpits contracting.',
       'Return the bar slowly over 2–3 seconds. Maintain proud chest throughout.',
       'Breathe: exhale as you pull down, inhale as you return.'],
      'You should feel the lats — the broad muscles under your armpits and along your side — doing most of the work. Your biceps will assist but should not dominate. <strong>Common mistakes:</strong> (1) Elbow flare — keep elbows tracking in and down, not out and back. (2) Torso swinging back too far — the slight lean is fixed; do not rock. (3) Only pulling to chin height — the bar must reach the upper chest.',
      '<span class="how-sub">Progression</span>When all sets hit 10 reps with elbows fully tucked and bar reaching upper chest, add 2.5 kg. Current: 60 kg. Long-term target: 4×10 at 75–80 kg with strict elbow-tuck form. <span class="how-sub">Climbing Carryover</span>Your lat pulldown already tested at 90 kg — genuine strength. This exercise reinforces the elbow-tuck pattern that maximises lat recruitment, building the vertical pulling endurance needed for lock-offs and sustained roof sequences.'
    );

    const WRIST_DATA = _h(SVG_WRIST,
      ['Sit on a bench or chair. Rest your forearm on your thigh or bench edge, palm facing downward.',
       'Only your wrist and hand should hang off the edge — forearm is fully supported.',
       'Let the wrist drop into full flexion — back of the hand drops toward the floor. This is the start.',
       'Slowly lift the back of the hand upward — extending the wrist — as far as comfortable.',
       'The range will be limited at first due to your 5:1 flexor-to-extensor ratio. That is expected.',
       'Hold the top position for 1 second.',
       'Lower slowly back to the start under full control. Do not use momentum.',
       'Breathe: exhale as you lift, inhale as you lower.'],
      'You should feel a burn along the back of the forearm — the extensor muscles. This is correct and expected. <strong>Common mistakes:</strong> (1) Moving the forearm off the bench — only the wrist moves. (2) Using momentum — the weight is very light by design; slow and controlled is the entire point. (3) Any pain at the elbow — this is a muscle burn in the forearm belly, not joint pain. Stop if pain is at the elbow.',
      '<span class="how-sub">Progression</span>When all sets reach 15 reps with full range and no compensation, add 1.25 kg. Current: 5 kg. Long-term target: 10 kg for 15 reps — enough to close the 5:1 ratio toward 2:1. <span class="how-sub">Climbing Carryover</span>Your 5:1 flexor-to-extensor ratio is the primary driver of your golfer\'s elbow recurrence risk. Every set of reverse wrist curls chips away at that ratio, directly protecting your tendons during high-volume climbing and reducing the risk of the medial elbow pain that has interrupted your training before.'
    );

    const SROW_DATA = _h(SVG_SROW,
      ['Sit at the cable row station, feet flat on the footplate. Select a close parallel grip handle (palms facing each other).',
       'Arms extended forward, sit tall and brace your core. Lower back in neutral curve — not rounded.',
       'Initiate the pull by retracting your shoulder blades first — squeeze them toward each other before your arms bend.',
       'Pull the handle to your lower sternum. Elbows travel close to the body, pointing straight back.',
       'At the end position: proud chest, scapulae fully retracted, pause and squeeze.',
       'Slowly extend the arms back to start, allowing shoulder blades to protract fully.',
       'Do not round the lower back to get extra range at the front.',
       'Breathe: exhale as you pull, inhale as you extend.'],
      'You should feel the mid-back — the rhomboids, mid-trapezius, and rear deltoids — doing the primary work. The scapular retraction should feel like squeezing something between your shoulder blades. <strong>Common mistakes:</strong> (1) Pulling with the arms before engaging the back — initiate with scapular retraction first. (2) Leaning back to create momentum — torso stays upright throughout. (3) Rounding the lower back at full extension.',
      '<span class="how-sub">Progression</span>When all sets reach 12 reps with full scapular retraction at the end, add 2.5 kg. Current: 60 kg. Long-term target: 4×12 at 80 kg. <span class="how-sub">Climbing Carryover</span>Your cable row tested at 80 kg with bilateral scapular symmetry — one of your best assessment results. Maintaining and building this base directly supports scapular retraction control needed for dynamic moves and steep wall positions, and ensures your pulling remains balanced as volume increases.'
    );

    const FACEPULL_DATA = _h(SVG_FACEPULL,
      ['Set cable to just above head height. Attach a rope handle. Take an overhand grip on each end, thumbs pointing forward.',
       'Step back until there is cable tension. Stand with feet shoulder-width. Core braced.',
       'Pull the rope toward your face — aiming for your forehead. As you pull, separate the two rope ends apart.',
       'At the end position: elbows are flared wide and high, roughly at ear level, thumbs pointing back behind your head.',
       'Upper arms should be roughly parallel to the floor.',
       'Hold for 1 second. Feel the rear delts and upper back contracting.',
       'Slowly return the rope forward under full control.',
       'Breathe: exhale as you pull, inhale as you return.',
       'Do not let elbows drop below shoulder height — this is the most common error and shifts work away from rear delts.'],
      'You should feel the rear deltoids and external rotators — the muscles at the back of your shoulders — firing hard at the end position. <strong>Common mistakes:</strong> (1) Elbows dropping below shoulder height — the pull becomes a row, not a face pull. (2) Not separating the rope ends — pulling to the face without the pull-apart misses the external rotation component. (3) Using too much weight and losing the elbow position.',
      '<span class="how-sub">Progression</span>When all sets reach 15 reps with elbows at ear height and thumbs pointing back, add 2.5 kg. Current: 17.5 kg. Long-term target: 4×15 at 25–30 kg. <span class="how-sub">Climbing Carryover</span>Face pulls directly counteract the internal rotation pattern that builds from both climbing and desk work. They support the rotator cuff work from cable external rotation, targeting rear deltoids that are often undertrained in climbers who pull heavily but rarely train the posterior shoulder directly.'
    );

    const DEADBUG_DATA = _h(SVG_DEADBUG,
      ['Lie flat on your back. Press your lower back firmly into the floor — no gap between lumbar spine and floor.',
       'Raise both arms straight to the ceiling, directly over your shoulders.',
       'Raise both knees to 90 degrees — shins parallel to floor, knees over hips. This is your starting position.',
       'Before moving, brace your core hard. If your lower back lifts off at any point, the set is over.',
       'Slowly lower your right arm overhead toward the floor and simultaneously extend your left leg straight toward the floor.',
       'Move both limbs at the same speed. Lower until hovering just above the floor — do not touch.',
       'Pause for 1 second. Check: is the lower back still flat?',
       'Slowly return both limbs to the starting position.',
       'Switch sides — left arm and right leg. That is one full rep.',
       'Breathe: exhale as you extend out, inhale as you return. Take 5–6 seconds for the full extension and return.'],
      'You should feel deep core muscles — specifically the lumbar stabilisers — working hard to prevent the lower back from arching. The movement should be slow and deliberate. <strong>Common mistakes:</strong> (1) Lower back lifting off the floor — reduce your range, not speed. (2) Moving too fast — this removes the core challenge entirely. (3) Arms and legs moving at different speeds — they should move as one unit.',
      '<span class="how-sub">Progression</span>When you can complete all sets with the lower back flat throughout and a 5-second pace, add reps. Target: 3×12 reps each side. <span class="how-sub">Climbing Carryover</span>Your core tests showed lumbar stabiliser endurance as the consistent weak link — your lower back lifts before your arms or legs fail. The dead bug trains exactly this: keeping your body rigid on overhangs where your core is the only thing stopping your hips from sagging off the wall.'
    );

    const PALLOF_DATA = _h(SVG_PALLOF,
      ['Set cable to chest height. Attach a single handle. Stand side-on to the machine, feet shoulder-width.',
       'Hold the handle with both hands at your sternum. The cable is pulling your body sideways.',
       'Brace your core hard. Your body should look like the cable does not exist.',
       'Slowly press both hands straight out in front of your chest — arms extending fully forward.',
       'The cable will try to rotate your torso toward the machine. Do not let it.',
       'Hold the extended position for 1–2 seconds. Torso must be completely square — no rotation whatsoever.',
       'Slowly return your hands back to your sternum.',
       'Breathe: exhale as you press out, inhale as you return.',
       'Complete all reps on one side before switching to face the other direction.'],
      'You should feel your obliques and deep core working to resist the sideways pull — like an isometric contraction that never fully relaxes. <strong>Common mistakes:</strong> (1) Letting the near hip shift toward the machine — keep both feet planted equally. (2) Rotating the torso toward the cable on the press — if you rotate at all, reduce the weight. (3) Rushing the press — the anti-rotation challenge is only present when you move slowly.',
      '<span class="how-sub">Progression</span>When all sets reach 10 reps with zero torso rotation, add 2.5 kg. Current: 10 kg. Long-term target: 3×10 at 20 kg. <span class="how-sub">Climbing Carryover</span>The Pallof press trains your trunk to resist rotation under load — directly translating to keeping hips square on steep terrain, controlling flag positions precisely, and absorbing dynamic moves without losing body tension. This is the missing link between having strong abs and having a strong climbing core.'
    );

    const HIPAB_DATA = _h(SVG_HIPAB,
      ['Sit in the hip abductor machine. Adjust seat so knees are at 90 degrees.',
       'The pads should sit on the outside of your knees — not on thighs and not on shins.',
       'Adjust starting position so legs are together but not forced inward.',
       'Sit tall with your back against the pad. Core gently braced.',
       'Push both knees outward against the pads, driving legs apart. Movement comes from the hips.',
       'Imagine trying to spread the floor apart with your feet.',
       'Push to end of comfortable range — not forced to machine maximum if that causes any groin pulling.',
       'Hold the end position briefly. Feel the outer glutes — glute medius — contracting.',
       'Slowly return legs together under control. Do not let the weight snap them back.',
       'Breathe: exhale as you push out, inhale as you return.'],
      'You should feel the outer upper glute — glute medius — contracting. Not the hip flexors, not the groin. <strong>Common mistakes:</strong> (1) Leaning forward to generate more range — sit upright, the range is limited by the muscle not by posture. (2) Allowing the weight to slam legs back together — control the return is where the glute gets the most work. (3) Pain in the groin or hip joint — stop and adjust the seat position.',
      '<span class="how-sub">Progression</span>When all sets reach 15 reps with full control on the return, add 5 kg. Current: 30 kg. Long-term target: 3×15 at 50 kg. <span class="how-sub">Climbing Carryover</span>Your glute medius is weak bilaterally, confirmed by knee cave on hinge movements. Strengthening it now while the foot is restricted removes the stability deficit above the ankle, building the hip stability that underpins every single-leg position on the wall — from smearing on slab to flagging on overhang.'
    );

    const BANDAB_DATA = _h(SVG_BANDAB,
      ['Loop a resistance band around both ankles. Lie on your side, body in a straight line from head to heel.',
       'Bottom arm extended under your head for support. Top hand on the floor in front of your chest for light balance.',
       'Stack your hips directly on top of each other — do not let the top hip roll backward. This is the most important cue.',
       'Keep the top leg straight and flex the top foot — pull toes toward shin.',
       'Lift the top leg upward against the band resistance, keeping it straight and hips stacked.',
       'Lift only as high as you can without the hip rolling back — typically 30–45 degrees from the floor.',
       'Hold for 1 second at the top.',
       'Lower slowly back to the start without letting the band snap the leg down.',
       'Breathe: exhale as you lift, inhale as you lower.'],
      'You should feel the outer glute — glute medius — of the top leg. Not hip flexors, not lower back. <strong>Common mistakes:</strong> (1) Hip rolling backward as the leg rises — this is the most common error and means you are using hip flexors instead of glute medius. If the hip rolls, reduce range. (2) Moving too fast and letting the band snap down — the slow lowering is as important as the lift. (3) Bending the knee during the lift — keep the leg straight.',
      '<span class="how-sub">Progression</span>When 2×15 with hip perfectly stacked becomes easy, use a heavier band. Long-term target: 3×15 with strong lateral tension. <span class="how-sub">Climbing Carryover</span>This is the isolated activation version of the hip abductor work, lighter and more targeted than the machine. Together these two exercises build the hip stability that underpins every single-leg position on the wall, from smearing on slab to back-flagging on steep terrain.'
    );

    const HAMCURL_DATA = _h(SVG_HAMCURL,
      ['Lie face down on the hamstring curl machine. Adjust pad to just above your heels — lower calf, not Achilles.',
       'Your kneecaps should be just off the edge of the bench pad.',
       'Lie flat with hips pressed into the pad. Do not let hips lift as you curl — reduces hamstring activation.',
       'Slowly curl both heels toward your glutes by bending the knees. Move through a smooth arc.',
       'Curl until knees are fully bent or as far as the machine allows.',
       'Keep load moderate — given the suspected proximal hamstring tendinopathy on the right, avoid any pulling sensation at the sit bone.',
       'Hold briefly at the top.',
       'Lower slowly over 2–3 seconds back to the start.',
       'Breathe: exhale as you curl up, inhale as you lower.'],
      'You should feel the hamstrings — the back of the thigh — doing the work. Not the calves, not the lower back. <strong>Warning signs:</strong> Stop the set immediately if you feel any pulling or aching at the sit bone (ischial tuberosity) — this indicates proximal hamstring tendinopathy loading and the weight or range needs to be reduced. <strong>Common mistakes:</strong> (1) Hips lifting off the bench — this transfers load to the lower back and glutes. (2) Going too heavy — moderate load, controlled movement.',
      '<span class="how-sub">Progression</span>When all sets reach 12 reps with hips flat and no discomfort at the sit bone, add 2.5 kg. Current: 20 kg. Long-term target: 3×12 at 35 kg — after physio clearance to increase load. <span class="how-sub">Climbing Carryover</span>Your posterior chain is undertrained relative to your anterior chain. Hamstring strength directly supports knee and hip stability on the wall and contributes to heel hook loading you currently cannot generate effectively. Conservative loading now protects the right tendon while building the base.'
    );

    const SVG_DBROW = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="50" y="95" width="90" height="10" rx="3" fill="#c5d8cb" opacity="0.8"/><circle cx="62" cy="78" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="62" y1="88" x2="62" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="54" y1="91" x2="42" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="70" y1="91" x2="82" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="42" y1="95" x2="42" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="82" y1="95" x2="82" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="116" y1="95" x2="130" y2="118" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="130" y1="118" x2="118" y2="130" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="118" y1="130" x2="140" y2="140" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><rect x="122" y="120" width="8" height="16" rx="3" fill="#c5d8cb" opacity="0.8"/><circle cx="126" cy="130" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="230" y="95" width="90" height="10" rx="3" fill="#c5d8cb" opacity="0.8"/><circle cx="242" cy="78" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="242" y1="88" x2="242" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="234" y1="91" x2="222" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="250" y1="91" x2="262" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="222" y1="95" x2="222" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="262" y1="95" x2="262" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="296" y1="95" x2="296" y2="118" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="296" y1="118" x2="308" y2="95" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><rect x="292" y="114" width="8" height="14" rx="3" fill="#c5d8cb" opacity="0.8"/><circle cx="296" cy="120" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><path d="M296,112 Q305,108 310,95" fill="none" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="312,91 308,101 316,98" fill="#4a7c59"/><text x="90" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_CSROW = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="40" y="90" width="105" height="55" rx="8" fill="#c5d8cb" opacity="0.5"/><circle cx="68" cy="64" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="59" y="74" width="18" height="35" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="59" y1="80" x2="48" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="77" y1="80" x2="88" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="48" y1="145" x2="40" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="88" y1="145" x2="96" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="59" y1="90" x2="44" y2="130" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="77" y1="90" x2="92" y2="130" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><circle cx="44" cy="133" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="92" cy="133" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="220" y="90" width="105" height="55" rx="8" fill="#c5d8cb" opacity="0.5"/><circle cx="248" cy="64" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="239" y="74" width="18" height="35" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="239" y1="80" x2="228" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="257" y1="80" x2="268" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="228" y1="145" x2="220" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="268" y1="145" x2="276" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="239" y1="84" x2="225" y2="105" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="257" y1="84" x2="271" y2="105" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><circle cx="224" cy="107" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="272" cy="107" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="232" y="74" width="34" height="8" rx="3" fill="#e74c3c" opacity="0.2"/><line x1="226" y1="128" x2="226" y2="107" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="226,103 221,113 231,113" fill="#4a7c59"/><text x="90" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_ADIP = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><line x1="55" y1="70" x2="55" y2="155" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="125" y1="70" x2="125" y2="155" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="55" y1="70" x2="125" y2="70" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" opacity="0.4"/><circle cx="90" cy="42" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="84" y1="53" x2="76" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="53" x2="104" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="80" y="53" width="20" height="36" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="76" y1="70" x2="74" y2="90" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="74" y1="90" x2="76" y2="110" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="104" y1="70" x2="106" y2="90" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="106" y1="90" x2="104" y2="110" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="84" y1="89" x2="75" y2="120" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="89" x2="105" y2="120" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="66" y="120" width="48" height="8" rx="3" fill="#4a7c59" opacity="0.3"/><line x1="235" y1="70" x2="235" y2="155" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="305" y1="70" x2="305" y2="155" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><circle cx="270" cy="68" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="264" y1="79" x2="256" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="79" x2="284" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="260" y="79" width="20" height="36" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="256" y1="70" x2="250" y2="105" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="250" y1="105" x2="254" y2="125" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="284" y1="70" x2="290" y2="105" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="290" y1="105" x2="286" y2="125" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="264" y1="115" x2="254" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="115" x2="286" y2="145" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="250" y="138" width="40" height="8" rx="3" fill="#4a7c59" opacity="0.3"/><line x1="270" y1="60" x2="270" y2="75" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="270,79 265,70 275,70" fill="#4a7c59"/><text x="90" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_SCAPPU = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="60" y="46" width="60" height="5" rx="2.5" fill="#4a7c59"/><rect x="240" y="46" width="60" height="5" rx="2.5" fill="#4a7c59"/><circle cx="90" cy="112" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="82" y1="98" x2="76" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="76" y1="70" x2="75" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="98" y1="98" x2="104" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="104" y1="70" x2="105" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="75" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="105" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="81" y="123" width="18" height="48" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><text x="90" y="95" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">shrugged up</text><line x1="85" y1="171" x2="82" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="95" y1="171" x2="98" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="270" cy="100" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="262" y1="86" x2="256" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="256" y1="70" x2="255" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="278" y1="86" x2="284" y2="70" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="284" y1="70" x2="285" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="255" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="285" cy="49" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="261" y="111" width="18" height="48" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M261,118 Q250,124 262,130" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M279,118 Q290,124 278,130" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><text x="270" y="90" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#4a7c59">blades depressed</text><line x1="265" y1="159" x2="262" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="275" y1="159" x2="278" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="270" y1="92" x2="270" y2="100" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="270,104 265,95 275,95" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_BDOG = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><circle cx="68" cy="92" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="68" y1="102" x2="68" y2="118" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="55" y1="118" x2="81" y2="118" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="118" x2="45" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="118" x2="45" y2="98" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="81" y1="118" x2="91" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="81" y1="118" x2="91" y2="98" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="248" cy="92" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="248" y1="102" x2="248" y2="118" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="235" y1="118" x2="261" y2="118" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="235" y1="118" x2="225" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="118" x2="271" y2="140" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="235" y1="118" x2="200" y2="118" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="261" y1="118" x2="310" y2="118" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><circle cx="198" cy="118" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="312" cy="118" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="310" cy="120" r="7" fill="#e74c3c" opacity="0.3"/><line x1="200" y1="112" x2="200" y2="106" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="200,102 195,112 205,112" fill="#4a7c59"/><line x1="312" y1="126" x2="312" y2="132" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="312,136 307,126 317,126" fill="#4a7c59"/><text x="68" y="170" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">neutral spine</text><text x="248" y="170" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">hips level</text><text x="90" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="185" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_CHINUP = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="60" y="46" width="60" height="5" rx="2.5" fill="#4a7c59"/><rect x="240" y="46" width="60" height="5" rx="2.5" fill="#4a7c59"/><circle cx="90" cy="107" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="82" y1="118" x2="76" y2="74" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="76" y1="74" x2="77" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="98" y1="118" x2="104" y2="74" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="104" y1="74" x2="103" y2="50" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="77" cy="49" r="5" fill="#e8f2ec" stroke="#e74c3c" stroke-width="1.5"/><circle cx="103" cy="49" r="5" fill="#e8f2ec" stroke="#e74c3c" stroke-width="1.5"/><text x="90" y="46" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">palms toward you</text><rect x="81" y="118" width="18" height="46" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M81,124 Q68,148 80,163" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M99,124 Q112,148 100,163" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="85" y1="164" x2="82" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="95" y1="164" x2="98" y2="190" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="270" cy="34" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="260" y1="76" x2="251" y2="64" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="251" y1="64" x2="255" y2="49" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="280" y1="76" x2="289" y2="64" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="289" y1="64" x2="285" y2="49" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="255" cy="49" r="5" fill="#e8f2ec" stroke="#e74c3c" stroke-width="1.5"/><circle cx="285" cy="49" r="5" fill="#e8f2ec" stroke="#e74c3c" stroke-width="1.5"/><rect x="261" y="86" width="18" height="44" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><path d="M261,92 Q249,112 260,128" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><path d="M279,92 Q291,112 280,128" fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="265" y1="130" x2="261" y2="162" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="275" y1="130" x2="279" y2="162" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="261" y1="162" x2="258" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="279" y1="162" x2="282" y2="188" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="180" y1="180" x2="180" y2="108" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="4,3"/><polygon points="180,98 175,111 185,111" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_DBPRESS = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><circle cx="90" cy="52" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="80" y="72" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="74" y1="80" x2="60" y2="76" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="106" y1="80" x2="120" y2="76" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="58" cy="75" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="122" cy="75" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><text x="90" y="70" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">dumbbell height</text><line x1="84" y1="124" x2="80" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="96" y1="124" x2="100" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="80" y1="160" x2="76" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="100" y1="160" x2="104" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><circle cx="270" cy="52" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="260" y="72" width="20" height="52" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="254" y1="80" x2="246" y2="28" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="286" y1="80" x2="294" y2="28" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><circle cx="244" cy="26" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="296" cy="26" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="254" cy="80" r="7" fill="#e74c3c" opacity="0.25"/><circle cx="286" cy="80" r="7" fill="#e74c3c" opacity="0.25"/><line x1="264" y1="124" x2="260" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="276" y1="124" x2="280" y2="160" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="260" y1="160" x2="256" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="280" y1="160" x2="284" y2="183" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="246" y1="36" x2="246" y2="68" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="246,72 241,63 251,63" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_HLR = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="60" y="10" width="60" height="5" rx="2.5" fill="#4a7c59"/><rect x="240" y="10" width="60" height="5" rx="2.5" fill="#4a7c59"/><circle cx="90" cy="48" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="82" y1="36" x2="76" y2="16" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="98" y1="36" x2="104" y2="16" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="76" cy="14" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="104" cy="14" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="81" y="59" width="18" height="42" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="85" y1="101" x2="82" y2="125" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="95" y1="101" x2="98" y2="125" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="82" y1="125" x2="80" y2="155" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="98" y1="125" x2="100" y2="155" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="80" y1="155" x2="78" y2="185" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="100" y1="155" x2="102" y2="185" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="270" cy="48" r="11" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="262" y1="36" x2="256" y2="16" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="278" y1="36" x2="284" y2="16" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="256" cy="14" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="284" cy="14" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><rect x="261" y="59" width="18" height="42" rx="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="265" y1="101" x2="252" y2="120" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="275" y1="101" x2="288" y2="120" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="252" y1="120" x2="248" y2="140" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="288" y1="120" x2="292" y2="140" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round"/><line x1="268" y1="100" x2="268" y2="80" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/><polygon points="268,76 263,87 273,87" fill="#4a7c59"/><text x="90" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="198" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_SLYDER = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><line x1="30" y1="100" x2="155" y2="100" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="68" cy="75" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="59" y="85" width="18" height="30" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="77" y1="100" x2="110" y2="100" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="59" y1="100" x2="44" y2="100" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="110" y1="100" x2="112" y2="112" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><circle cx="113" cy="115" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="110" cy="100" r="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="110" cy="100" r="9" fill="#e74c3c" opacity="0.2"/><line x1="210" y1="100" x2="335" y2="100" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="248" cy="75" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><rect x="239" y="85" width="18" height="30" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="257" y1="100" x2="282" y2="100" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="239" y1="100" x2="224" y2="100" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="282" y1="100" x2="278" y2="80" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><circle cx="278" cy="78" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/><circle cx="282" cy="100" r="9" fill="#e74c3c" opacity="0.25"/><path d="M287,92 A10,10 0 0,1 293,100" fill="none" stroke="#4a7c59" stroke-width="1.5"/><polygon points="296,102 289,100 292,108" fill="#4a7c59"/><text x="72" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">elbow at waist</text><text x="252" y="155" text-anchor="middle" font-family="system-ui,sans-serif" font-size="9" fill="#9ca3af">forearm points up</text><text x="90" y="175" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="175" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const SVG_GHD = '<svg viewBox="0 0 360 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display:block;margin-bottom:8px"><rect x="30" y="95" width="120" height="20" rx="5" fill="#c5d8cb" opacity="0.7"/><line x1="148" y1="105" x2="148" y2="175" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="30" y1="175" x2="155" y2="175" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="62" cy="72" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="62" y1="82" x2="62" y2="95" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="55" y1="93" x2="45" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="69" y1="93" x2="79" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="45" y1="108" x2="40" y2="115" stroke="#4a7c59" stroke-width="2" stroke-linecap="round"/><line x1="62" y1="95" x2="148" y2="115" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="148" y1="115" x2="148" y2="165" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="210" y="105" width="120" height="20" rx="5" fill="#c5d8cb" opacity="0.7"/><line x1="328" y1="115" x2="328" y2="175" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/><line x1="210" y1="175" x2="335" y2="175" stroke="#c5d8cb" stroke-width="3" stroke-linecap="round"/><circle cx="242" cy="115" r="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/><line x1="242" y1="115" x2="328" y2="115" stroke="#e74c3c" stroke-width="4" stroke-linecap="round"/><line x1="235" y1="112" x2="225" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="249" y1="112" x2="259" y2="108" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><line x1="328" y1="115" x2="328" y2="165" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/><rect x="320" y="110" width="16" height="12" rx="3" fill="#e74c3c" opacity="0.2"/><line x1="323" y1="108" x2="318" y2="98" stroke="#e74c3c" stroke-width="1.5"/><text x="324" y="96" font-family="system-ui,sans-serif" font-size="8" fill="#e74c3c">stop here</text><text x="90" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Start</text><text x="270" y="190" text-anchor="middle" font-family="system-ui,sans-serif" font-size="11" fill="#6b7280">Finish</text></svg>';

    const CALF_DATA = _h(SVG_CALF,
      ['Stand near a wall for balance. Transfer all weight to the left foot. Raise the right foot slightly off the floor.',
       'If using a step, stand with the ball of the left foot on the edge so the heel can drop below step level.',
       'Lower the left heel as far as it will go — full stretch at the bottom. This is the starting position.',
       'Drive the left heel upward as high as it will go, rising onto the ball of the foot.',
       'Pause at the top for 1–2 seconds — this pause is important for calf development.',
       'Lower slowly over 3 seconds back to the bottom. The slow lowering (eccentric) is the most therapeutically valuable part.',
       'Left leg only at all times until the right foot is cleared by the physio.',
       'Breathe: exhale as you rise, inhale as you lower.'],
      'You should feel the left calf — both the gastrocnemius (upper calf belly) and soleus (lower, deeper) — working hard. The eccentric lowering is where most of the therapeutic benefit occurs for your dorsiflexion deficit. <strong>Common mistakes:</strong> (1) Bouncing at the bottom — hold the bottom stretch for a moment. (2) Skipping the pause at the top — this pause is required. (3) Using the right leg for any support.',
      '<span class="how-sub">Progression</span>When all sets reach 12 reps with full range (heel below step level to full rise) and 3-second lowering, add a light load held in the hand. Long-term target: 3×15 with 10 kg in hand. <span class="how-sub">Climbing Carryover</span>Your 3 cm dorsiflexion deficit bilaterally is your highest-impact single mobility limitation. Single-leg calf raises build the eccentric strength and tendon resilience that underpins dorsiflexion range — you cannot stretch your way to ankle mobility without also strengthening the structures around it.'
    );

    const PLANK_DATA = _h(SVG_PLANK,
      ['Get into position on your forearms and toes. Elbows directly under shoulders.',
       'Forearms parallel to each other or hands clasped. Toes on the floor.',
       'Set your body position: a perfectly straight line from the back of your head to your heels.',
       'No hips raised, no hips sagged.',
       'Brace the core hard — pull your belly button toward your spine and squeeze your glutes simultaneously.',
       'Press the forearms into the floor as if trying to push them apart — this engages the serratus and keeps shoulder blades flat.',
       'Hold the position. Breathe slowly and continuously — holding your breath accelerates fatigue.',
       'When your lower back begins to sag — your specific failure mode — the set is over. Stop and rest.',
       'Log the time you held before breakdown. That is your true score.'],
      'You should feel the deep core and lower back stabilisers working hard — a diffuse tension across the trunk. <strong>Your specific failure mode:</strong> lower back sagging before anything else gives out. When the lower back sags, the set is over — holding a broken position builds nothing and risks injury. <strong>Common mistakes:</strong> (1) Raising hips — makes it easier but defeats the purpose. (2) Holding your breath — exhale slowly and continuously. (3) Head sagging forward — keep a neutral spine all the way to the crown.',
      '<span class="how-sub">Progression</span>When your best hold reaches the current target time with perfect form throughout, add 5 seconds to the target. Current target: 30 seconds. Long-term target: 90 seconds unbroken. Your assessment baseline was 62 seconds with form breakdown — re-test quality not just duration. <span class="how-sub">Climbing Carryover</span>Lumbar stabiliser endurance was the consistent failure mode across all three of your core tests — your lower back sags before everything else. Improving your plank time directly improves your ability to maintain body tension on sustained climbing sequences, especially on routes that require holding poor rests or bridging between moves.'
    );

    const DBROW_DATA = _h(SVG_DBROW,
      ['Place left hand and left knee on a flat bench. Back flat and parallel to the floor.',
       'Right foot flat on the floor for stability. Dumbbell in the right hand hanging straight down.',
       'Brace your core hard before lifting. Your torso should not rotate at all during this exercise.',
       'Pull the dumbbell upward by driving the right elbow toward the ceiling and back — imagine putting the dumbbell in a back pocket.',
       'The dumbbell travels close to your body — not swinging outward in an arc.',
       'Pull until the dumbbell reaches your hip and the elbow is pointing straight up.',
       'Hold briefly. Feel the lat and mid-back on the right side contracting.',
       'Lower slowly over 2 seconds back to the start. Allow the shoulder blade to protract fully at the bottom.',
       'Breathe: exhale as you pull up, inhale as you lower. Complete all reps on one side before switching.'],
      'You should feel the lat and mid-back on the working side — the broad muscles from your armpit to your hip. A correct rep feels like rowing your elbow directly into your back pocket. <strong>Common mistakes:</strong> (1) Torso rotation — the body must stay square throughout. If you rotate, lower the weight. (2) The dumbbell swinging outward in an arc instead of tracking the body. (3) Shrugging the shoulder at the top — the shoulder stays packed, not elevated.',
      '<span class="how-sub">Progression</span>When all 4 sets reach 10 reps with zero torso rotation, add 2 kg. Current: 26 kg. Long-term target: 4×10 at 36–40 kg. <span class="how-sub">Climbing Carryover</span>Your single-arm row tested at 30 kg with no bilateral asymmetry — an important positive. This exercise builds the mid-back thickness and scapular control that stabilises your shoulder under load. The unilateral format ensures neither side compensates for the other, which is important given your history of asymmetrical loading patterns from climbing.'
    );

    const CSROW_DATA = _h(SVG_CSROW,
      ['Set incline bench to roughly 45–60 degrees. Lie chest-down — chest and stomach supported, head above the top edge.',
       'Hold a dumbbell in each hand, arms hanging straight down toward the floor.',
       'Let the shoulder blades spread fully apart at the start — full protraction.',
       'Pull both dumbbells upward simultaneously, driving elbows back and slightly flared.',
       'Pull until upper arms are roughly parallel to the floor.',
       'Squeeze the shoulder blades together hard at the top — maximum scapular retraction.',
       'Hold briefly at the top.',
       'Lower slowly back to full arm extension and full scapular protraction.',
       'Breathe: exhale as you pull, inhale as you lower.'],
      'You should feel the mid-back, rhomboids, and rear deltoids working hard at the top. The chest support removes all lower back involvement — this is pure mid-back work. <strong>Common mistakes:</strong> (1) Not achieving full protraction at the bottom — let the shoulder blades fully spread forward. (2) Elbows flaring too wide — keep them roughly 45 degrees from the torso. (3) Using momentum by bouncing off the bench.',
      '<span class="how-sub">Progression</span>When all sets reach 12 reps with full retraction at top and full protraction at bottom, add 2.5 kg per hand. Current: 50 kg total. Long-term target: 3×12 at 70 kg. <span class="how-sub">Climbing Carryover</span>The chest support removes any opportunity for lower back compensation, forcing all work into the mid-back and rear delts. This is horizontal pulling volume at its most honest — you cannot cheat it. It directly supports the scapular retraction pattern that protects your shoulder on heavy pulling days and maintains the bilateral symmetry your assessment confirmed.'
    );

    const ADIP_DATA = _h(SVG_ADIP,
      ['Set the assisted dip machine to enough counterweight that you can complete 6 clean reps with full control.',
       'Grip the handles, step or kneel onto the assist pad, and push up to starting position with arms fully extended.',
       'Lean your torso slightly forward — about 10–15 degrees — this shifts emphasis to chest and reduces shoulder stress.',
       'Slowly lower your body by bending the elbows. Elbows track over your hands — not flaring excessively wide.',
       'Lower until upper arms are roughly parallel to the floor. Stop here if there is any shoulder discomfort.',
       'Pause briefly at the bottom.',
       'Push back up to the start position, driving through the palms.',
       'Breathe: inhale as you lower, exhale as you push up.'],
      'You should feel the triceps and lower chest doing the primary work. The slight forward lean increases chest involvement. <strong>Common mistakes:</strong> (1) No forward lean — this places excessive stress on the anterior shoulder. (2) Elbows flaring too wide — keep them tracking over the wrists. (3) Going deeper than comfortable — your assessment flagged caution above pain-free depth, stop before any shoulder discomfort. <strong>Warning:</strong> Stop immediately if you feel anterior shoulder pain.',
      '<span class="how-sub">Progression</span>When all sets reach 8 reps with controlled descent and no shoulder discomfort, reduce the counterweight by 5 kg. Work toward unassisted dips. Long-term target: 3×10 unassisted. <span class="how-sub">Climbing Carryover</span>Your dip max tested at only 4 reps — well behind your pulling numbers. Dip strength is the primary pushing antagonist to your pulling work. Weak triceps and anterior shoulders limit your ability to mantel, push through awkward top-out positions, and maintain elbow health under climbing load.'
    );

    const SCAPPU_DATA = _h(SVG_SCAPPU,
      ['Hang from the pull-up bar with a shoulder-width overhand grip. Arms fully extended.',
       'Let your shoulders shrug all the way up toward your ears — completely passive hang, no muscle activation.',
       'Without bending the elbows at all, pull your shoulder blades downward and slightly together — away from your ears.',
       'As the scapulae depress your body will rise slightly — perhaps 5–10 cm. Elbows remain straight throughout.',
       'This is not a pull-up. It is a scapular movement only — no elbow bend.',
       'Hold the depressed position for 1–2 seconds. Feel the muscles below and around the shoulder blades.',
       'Slowly return to the shrugged passive hang.',
       'Breathe: exhale as you depress, inhale as you return.'],
      'You should feel the lower trapezius and serratus anterior — the muscles below and around the shoulder blade — working. Not the biceps, not the lats. <strong>Common mistakes:</strong> (1) Bending the elbows — if the elbows bend, you are doing a partial pull-up, not a scapular pull-up. (2) Not returning to the full passive shrug — the full range from shrug to depression is what trains the movement. (3) Moving too fast.',
      '<span class="how-sub">Progression</span>When all sets reach 10 reps with zero elbow bend and full depression, add reps. Long-term target: 3×15. Your assessment showed 9 clean reps with correct activation — one of your best results. <span class="how-sub">Climbing Carryover</span>This movement trains the bottom of the pull-up specifically: the scapular depression that initiates every efficient pull. Strong lower trapezius prevents shoulder impingement under load and is the foundation of every pulling movement you do on the wall.'
    );

    const BDOG_DATA = _h(SVG_BDOG,
      ['Start on hands and knees. Hands directly under shoulders, knees directly under hips.',
       'Spine in a neutral position — not rounded, not arched. Eyes looking at the floor.',
       'Brace your core gently — enough to keep the spine neutral but not a maximum brace.',
       'Slowly extend your right arm straight forward and your left leg straight back — simultaneously and at the same speed.',
       'Both limbs should end up parallel to the floor.',
       'Your hips must stay completely level — do not let the left hip rise as the left leg extends.',
       'Hold for 2–3 seconds. Check the hips.',
       'Return both limbs slowly to the start.',
       'Switch to left arm and right leg.',
       'Breathe: exhale as you extend, inhale as you return. If hips are rocking, slow down first.'],
      'You should feel the lower back extensors and the glute of the extended leg working together to maintain the position. <strong>Common mistakes:</strong> (1) Hips rocking — move more slowly and reduce hold time if needed. (2) The arm or leg not reaching parallel to the floor — only go as far as you can maintain level hips. (3) Rushing — the deliberate pace is the entire challenge.',
      '<span class="how-sub">Progression</span>When all sets reach 8 reps each side with hips perfectly level throughout, add a 1-second hold. Long-term target: 3×12 with 3-second holds. <span class="how-sub">Climbing Carryover</span>The bird dog trains contralateral limb coordination and anti-rotation stability — exactly the core quality used when flagging and back-flagging. Your flagging is already instinctive, but building the underlying motor control under slow deliberate load makes it more reliable under fatigue and on harder terrain.'
    );

    const CHINUP_DATA = _h(SVG_CHINUP,
      ['Grip the bar with palms facing toward you (supinated grip). Use a shoulder-width grip — slightly narrower than overhand.',
       'Hang completely. Full dead hang, arms extended.',
       'Depress the scapulae first — same cue as the neutral-grip pull-up.',
       'Pull upward by driving the elbows down toward the hips. The supinated grip means the biceps are more involved — this is by design.',
       'Pull until the chin clears the bar.',
       'Lower with full control over 2 seconds.',
       'Given your golfer\'s elbow history: stop immediately if medial elbow pain develops.',
       'Breathe: exhale up, inhale down.'],
      'You should feel the biceps more than on the neutral-grip pull-up, with the lats also working hard. This is normal and intended — the supinated grip recruits biceps more fully. <strong>Common mistakes:</strong> Same as neutral-grip pull-up — no kipping, controlled descent, chin must clear bar cleanly. <strong>Warning sign:</strong> Any medial elbow pain (inside of elbow) — stop the set immediately. Your assessment showed no elbow discomfort on this variation which is a positive sign, but monitor carefully.',
      '<span class="how-sub">Progression</span>When all 4 sets reach 4 reps with controlled 2-second descent, add 1 rep per set. Long-term target: 4×8. <span class="how-sub">Climbing Carryover</span>The supinated chin-up provides a different stimulus to the same pulling pattern, reducing cumulative tendon stress across the week while maintaining volume. Rotating between neutral and supinated grip across the week is specifically chosen for your golfer\'s elbow history.'
    );

    const DBPRESS_DATA = _h(SVG_DBPRESS,
      ['Sit on a bench with back support or at the end of a flat bench with upright torso.',
       'Hold a dumbbell in each hand at shoulder height, palms facing each other — neutral grip.',
       'Elbows at roughly 45 degrees from the torso, not flared straight out to the sides.',
       'Before pressing, brace your core and pull the ribs down. Actively resist the urge to arch the lower back.',
       'Press both dumbbells upward, keeping palms facing each other throughout.',
       'Press until arms are fully extended overhead — stop short of lockout to maintain tension.',
       'Dumbbells should finish directly above your shoulders, not drifting forward.',
       'Lower slowly back to shoulder height.',
       'Breathe: exhale as you press up, inhale as you lower. If lower back arches at any point, reduce the weight.'],
      'You should feel all three deltoid heads and upper trapezius working, with triceps assisting at the top. The neutral grip reduces shoulder impingement risk significantly compared to a barbell. <strong>Common mistakes:</strong> (1) Lower back arching — this is your primary compensation pattern from your assessment. Brace the core hard before every rep. If it arches, reduce weight. (2) Elbows flaring straight out — keep them at 45 degrees. (3) Dumbbells drifting forward at the top — keep them above the shoulders.',
      '<span class="how-sub">Progression</span>When all sets reach 10 reps with zero lower back arch, add 2 kg per hand. Current: 13 kg. Long-term target: 3×10 at 20 kg with strict form. <span class="how-sub">Climbing Carryover</span>Your strict overhead press ceiling without lower back compensation is likely 30–35 kg. The neutral grip keeps this pain-free while you build the overhead stability that translates to lock-offs and reaching moves on the wall — moves that your current left shoulder restriction is limiting.'
    );

    const HLR_DATA = _h(SVG_HLR,
      ['Hang from the pull-up bar with a shoulder-width overhand grip. Full dead hang, arms extended, legs hanging straight down.',
       'Brace your core and begin lifting both legs together by flexing at the hips.',
       'Drive the knees upward and forward. A slight knee bend is fine — it reduces the lever without compromising the hip flexor work.',
       'Raise until the thighs are roughly parallel to the floor or higher if strength allows.',
       'Hold briefly at the top.',
       'Lower slowly over 2–3 seconds. Do not drop the legs.',
       'If your grip fails before your hip flexors: switch to lying leg raises on the floor for remaining sets.',
       'Breathe: exhale as you raise, inhale as you lower.'],
      'You should feel the hip flexors and lower abdominals doing the work — a compression in the lower abdomen and the front of the hips. <strong>Common mistakes:</strong> (1) Swinging to generate momentum — slow the eccentric down and the swing disappears. (2) Using only a small range — the more the hips flex, the more the lower abs work. (3) Holding your breath — breathe continuously.',
      '<span class="how-sub">Progression</span>When all sets reach 10 reps with slow lowering, add reps or straighten the legs completely. Long-term target: 3×10 with straight legs (full hanging leg raises). <span class="how-sub">Climbing Carryover</span>Your assessment identified that you cannot generate sufficient hip flexor tension to load heel hooks and toe hooks properly. This exercise directly addresses that limiter while also training the dead hang grip endurance that feeds into your 90-second hang target.'
    );

    const SLYDER_DATA = _h(SVG_SLYDER,
      ['Lie on your side on a bench or the floor. Bottom arm under your head.',
       'Top elbow is bent to 90 degrees and tucked firmly into your waist.',
       'Top forearm points across your body, toward the floor. Hold a very light dumbbell in the top hand.',
       'The elbow is glued to your waist — it does not move at any point.',
       'Rotate the top forearm upward toward the ceiling — externally rotating the shoulder.',
       'Rotate until the forearm is roughly vertical — pointing straight up.',
       'Hold for 1 second.',
       'Lower slowly back to the start.',
       'Breathe: exhale as you rotate up, inhale down.'],
      'You should feel the posterior shoulder and rotator cuff — a small, precise contraction at the back of the shoulder joint. <strong>Common mistakes:</strong> (1) Elbow lifting off the waist — if it lifts, the weight is too heavy. (2) Only rotating through a small range — aim for vertical forearm. (3) Moving too fast — this is a precision exercise requiring full control.',
      '<span class="how-sub">Progression</span>When all sets reach 12 reps with elbow never leaving the waist, add 1.25 kg. Current: 2.5 kg. Long-term target: 3×12 at 7.5 kg. <span class="how-sub">Climbing Carryover</span>This is a lighter, more isolated version of the cable external rotation done lying down to eliminate any compensation. Thursday\'s extra ER volume exists because the 14:1 ratio is the most urgent injury finding in your assessment. This second weekly stimulus accelerates the ratio correction that keeps your rotator cuff healthy.'
    );

    const GHD_DATA = _h(SVG_GHD,
      ['Adjust the GHD machine so the pad sits at your hip crease — not at your waist or thighs.',
       'Secure your feet in the foot holders. Cross your arms on your chest.',
       'Hinge forward from the hips until your torso is hanging toward the floor.',
       'From the hanging position, slowly raise your torso by extending the hips and lower back.',
       'Raise to a position where your body is in a straight line — torso parallel to the floor, in line with the legs.',
       'STOP at the straight-line position. Do NOT hyperextend past parallel.',
       'Your assessment flagged a mid-spine clinical finding — hyperextension is not permitted until the physio clears it.',
       'Hold the straight position for 1 second.',
       'Lower slowly back to the start.',
       'Breathe: exhale as you rise, inhale as you lower.'],
      'You should feel the lumbar erector spinae and glutes working as you rise. The controlled stop at parallel requires active braking. <strong>Warning — STOP here:</strong> Do not hyperextend past the straight-line position under any circumstances until cleared by your physio. <strong>Common mistakes:</strong> (1) Hyperextending past parallel — this is specifically contra-indicated given your mid-spine finding. (2) Going too fast and overshooting the stopping point. (3) Not reaching full extension — you should reach true parallel, not stop short.',
      '<span class="how-sub">Progression</span>When all sets reach 12 reps with a clean stop at parallel and no compensation, add a small load at the chest (2.5–5 kg plate). Long-term target: 3×15 with 10 kg at chest — after physio clearance on hyperextension. <span class="how-sub">Climbing Carryover</span>Your posterior chain endurance tested at 41 seconds on the arch hold — adequate but not strong. GHD back extension builds the lumbar erector endurance that underpins body tension on steep terrain, controls hip position on dynamic moves, and supports the hinge patterns you will be loading more heavily once the foot is cleared.'
    );

    return {
      'ua-pullup':  PULLUP_NEUTRAL_DATA,
      'ua-ext-rot': ER_DATA, 'ub-ext-rot': ER_DATA, 'ep-ext-rot': ER_DATA, 'uc-ext-rot': ER_DATA,
      'ua-latpd':   LATPD_DATA, 'uc-latpd': LATPD_DATA,
      'ua-wrist':   WRIST_DATA, 'ub-wrist': WRIST_DATA, 'ep-wrist': WRIST_DATA, 'uc-wrist': WRIST_DATA,
      'ua-srow':    SROW_DATA,  'uc-srow':  SROW_DATA,
      'ua-facepull':FACEPULL_DATA,
      'ua-deadbug': DEADBUG_DATA,
      'ua-pallof':  PALLOF_DATA, 'ep-pallof': PALLOF_DATA,
      'el-hipab':   HIPAB_DATA,
      'el-bandab':  BANDAB_DATA,
      'el-hamcurl': HAMCURL_DATA,
      'el-calf':    CALF_DATA,
      'el-plank':   PLANK_DATA,
      'ub-dbrow':   DBROW_DATA,
      'ub-csrow':   CSROW_DATA,
      'ub-adip':    ADIP_DATA,
      'ub-scappu':  SCAPPU_DATA,
      'ub-bdog':    BDOG_DATA,
      'uc-chinup':  CHINUP_DATA,
      'uc-dbpress': DBPRESS_DATA,
      'uc-hlr':     HLR_DATA,
      'ep-slyder':  SLYDER_DATA,
      'ep-ghd':     GHD_DATA,
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

  function rirOpts(def) {
    def = def == null ? '3' : String(def);
    const LABELS = { '1':'1 — easy', '2':'2 — moderate', '3':'3 — hard', '4':'4 — very hard', '5':'5 — max' };
    return ['1','2','3','4','5'].map(v => `<option value="${v}"${v === def ? ' selected' : ''}>${LABELS[v]}</option>`).join('');
  }

  function buildSetRows(ex, lastData) {
    let html = '';
    if (ex.type !== 'timed') {
      html += `<div class="set-cols-header">
        <span class="set-col-spacer"></span>
        <div class="set-col-hdr"><span class="set-col-hdr-main">Weight</span><span class="set-col-hdr-sub">load progression</span></div>
        <div class="set-col-hdr"><span class="set-col-hdr-main">Reps</span><span class="set-col-hdr-sub">volume target</span></div>
        <div class="set-col-hdr"><span class="set-col-hdr-main">Effort</span><span class="set-col-hdr-sub">1 easy → 5 max</span></div>
        <span class="set-col-remove-spacer"></span>
      </div>`;
    }
    for (let i = 0; i < ex.sets; i++) {
      const last  = lastData?.sets?.[i];
      const defW  = last?.weight  ?? ex.weight;
      const defR  = last?.reps    ?? (ex.repRange ? ex.repRange[0] : 1);
      const defRIR = last?.rir    ?? '3';
      const defSec = last?.secs   ?? getTimedTarget(ex.id, ex.targetSec || 30);

      if (ex.type === 'timed') {
        html += `<div class="set-row">
          <span class="set-lbl">Set ${i+1}</span>
          <input type="number" class="sel-secs" min="5" max="600" step="5" value="${defSec}" />
          <span style="font-size:12px;color:var(--text-sec);white-space:nowrap;flex-shrink:0">sec</span>
          <button type="button" class="btn-remove-set" onclick="this.closest('.set-row').remove()" title="Remove set">×</button>
        </div>`;
      } else {
        const isBW  = ex.weight === 'BW' || ex.type === 'assisted';
        const wVal  = isBW ? (defW === 'BW' ? 0 : defW) : defW;
        const wUnit = isBW ? 'kg added' : 'kg';
        html += `<div class="set-row">
          <span class="set-lbl">Set ${i+1}</span>
          <div class="input-unit-wrap">
            <input type="number" class="sel-weight" step="1.25" min="0" max="300" value="${wVal}" />
            <span class="input-unit">${wUnit}</span>
          </div>
          <input type="number" class="sel-reps" step="1" min="1" max="50" value="${defR}" />
          <select class="sel-rir">${rirOpts(defRIR)}</select>
          <button type="button" class="btn-remove-set" onclick="this.closest('.set-row').remove()" title="Remove set">×</button>
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
    const why   = EX_WHY_TEXTS[ex.id];
    const howTo = EX_HOW_TO_TEXTS[ex.id];
    const whyBtn   = why   ? `<button class="why-btn"  onclick="(function(b){b.closest('.ex-card').querySelector('.why-body').classList.toggle('open')})(this)">Why?</button>` : '';
    const howBtn   = howTo ? `<button class="how-btn"  onclick="(function(b){b.closest('.ex-card').querySelector('.how-body-wrap').classList.toggle('open')})(this)">How to ↓</button>` : '';
    const btnRow   = (why || howTo) ? `<div class="ex-btn-row">${whyBtn}${howBtn}</div>` : '';
    const whyBody  = why   ? `<div class="why-body">${why}</div>` : '';
    const howBody  = howTo ? `<div class="how-body-wrap"><div class="how-body-inner"><div class="how-body">${howTo}</div></div></div>` : '';

    return `<div class="card ex-card" data-ex-id="${ex.id}">
      <div class="ex-header">
        <span class="ex-name">${ex.name}</span>
        ${staple}${cautionIcon}
        <button type="button" class="btn-skip-ex" onclick="(function(btn){const card=btn.closest('.ex-card');const skipped=card.dataset.skipped==='true';card.dataset.skipped=skipped?'false':'true';btn.textContent=skipped?'Skip':'Skipped';btn.classList.toggle('active',!skipped);card.querySelector('.ex-sets-body').style.opacity=skipped?'1':'0.35';card.querySelector('.ex-sets-body').style.pointerEvents=skipped?'':'none';})(this)">Skip</button>
      </div>
      ${cautionText}
      ${cueHtml}
      ${btnRow}
      ${whyBody}
      ${howBody}
      <div class="ex-sets-body">
        <div class="ex-last">${lastStr}</div>
        <div class="set-rows">${buildSetRows(ex, lastData)}</div>
        <textarea class="ex-notes" placeholder="Notes…"></textarea>
      </div>
    </div>`;
  }

  /* ─── SESSION DURATION ESTIMATE ────────────────────────────────── */
  function calcEstDuration(exercises, dayType) {
    let totalSec = 0;
    const isEngine = ['Engine + Lower','Engine + Prehab'].includes(dayType);
    if (isEngine) totalSec += 35 * 60; // zone 2 default 35 min

    exercises.forEach(ex => {
      if (ex.type === 'zone2') return;
      const sets = ex.sets || 0;
      if (ex.type === 'timed') {
        const target = getTimedTarget(ex.id, ex.targetSec || 30);
        totalSec += sets * (target + 60); // set + 60s rest
      } else if (ex.repRange && ex.repRange[0] >= 12) {
        totalSec += sets * (30 + 60) + 30; // isolation: 30s set, 60s rest, 30s transition
      } else {
        totalSec += sets * (35 + 90) + 30; // strength: 35s set, 90s rest, 30s transition
      }
    });
    return Math.round(totalSec / 60);
  }

  /* ─── DRAFT PERSISTENCE ────────────────────────────────────────── */
  const KEY_GYM_DRAFT = 'tt_gym_draft';
  let _draftTimer = null;

  function saveGymDraft() {
    const todayStr = toDateStr(new Date());
    const draft = { date: todayStr, inputs: {} };
    document.querySelectorAll('#gym-exercise-list .ex-card').forEach(card => {
      const exId = card.dataset.exId;
      if (!exId) return;
      const sets = [];
      card.querySelectorAll('.set-row').forEach(row => {
        const w = row.querySelector('.sel-weight');
        const r = row.querySelector('.sel-reps');
        const rir = row.querySelector('.sel-rir');
        const s = row.querySelector('.sel-secs');
        if (s) sets.push({ secs: s.value });
        else if (w) sets.push({ weight: w.value, reps: r?.value, rir: rir?.value });
      });
      draft.inputs[exId] = {
        sets,
        notes: card.querySelector('.ex-notes')?.value || '',
        skipped: card.dataset.skipped === 'true',
      };
    });
    localStorage.setItem(KEY_GYM_DRAFT, JSON.stringify(draft));
  }

  function restoreGymDraft(todayStr) {
    let draft;
    try { draft = JSON.parse(localStorage.getItem(KEY_GYM_DRAFT) || 'null'); } catch { return; }
    if (!draft || draft.date !== todayStr) return;

    document.querySelectorAll('#gym-exercise-list .ex-card').forEach(card => {
      const exId = card.dataset.exId;
      const saved = draft.inputs[exId];
      if (!saved) return;

      const setRows = [...card.querySelectorAll('.set-row')];
      saved.sets.forEach((s, i) => {
        const row = setRows[i];
        if (!row) return;
        if (s.secs !== undefined) {
          const inp = row.querySelector('.sel-secs');
          if (inp) inp.value = s.secs;
        } else {
          const w = row.querySelector('.sel-weight');
          const r = row.querySelector('.sel-reps');
          const rir = row.querySelector('.sel-rir');
          if (w) w.value = s.weight;
          if (r) r.value = s.reps;
          if (rir) rir.value = s.rir;
        }
      });
      const notes = card.querySelector('.ex-notes');
      if (notes) notes.value = saved.notes || '';

      if (saved.skipped) {
        card.dataset.skipped = 'true';
        const btn = card.querySelector('.btn-skip-ex');
        const body = card.querySelector('.ex-sets-body');
        if (btn) { btn.textContent = 'Skipped'; btn.classList.add('active'); }
        if (body) { body.style.opacity = '0.35'; body.style.pointerEvents = 'none'; }
      }
    });
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

    // Duration estimate banner
    const banner = document.getElementById('gym-duration-banner');
    if (banner && exercises.length) {
      const estMin = calcEstDuration(exercises, dayType);
      const startKey = 'tt_gym_start_' + todayStr;
      const startTime = parseInt(localStorage.getItem(startKey) || '0');
      if (!startTime) localStorage.setItem(startKey, String(Date.now()));
      const elapsed = startTime ? Math.floor((Date.now() - startTime) / 60000) : 0;
      const elapsedStr = elapsed >= 5 ? ` · ${elapsed} min in` : '';
      banner.style.display = 'block';
      banner.innerHTML = `<i class="fa-regular fa-clock"></i> Est. ~<strong>${estMin} min</strong>${elapsedStr}`;
    }

    restoreGymDraft(todayStr);

    const list = document.getElementById('gym-exercise-list');
    list.addEventListener('input', () => {
      clearTimeout(_draftTimer);
      _draftTimer = setTimeout(saveGymDraft, 500);
    });
    list.addEventListener('change', () => {
      clearTimeout(_draftTimer);
      _draftTimer = setTimeout(saveGymDraft, 500);
    });
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
      const allHit = sets.every(s => s.reps >= top && parseInt(s.rir) >= 4);
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

      if (card.dataset.skipped === 'true') {
        exerciseData.push({ id:ex.id, name:ex.name, sets:[], notes:'', skipped:true, progressionFlag:false, stallFlag:false });
        return;
      }

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
          const rawW = parseFloat(wEl.value);
          const isBWEx = ex.weight === 'BW' || ex.type === 'assisted';
          const weight = (isBWEx && rawW === 0) ? 'BW' : (isNaN(rawW) ? wEl.value : rawW);
          sets.push({ setNum:i+1, weight, reps:parseInt(rEl.value)||0, rir:rirEl.value });
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
    localStorage.removeItem(KEY_GYM_DRAFT);

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

