  /* ═══════════════════════════════════════════════════════════════════
     MOBILITY LOGGER
  ═══════════════════════════════════════════════════════════════════ */
  const KEY_MOB_PROG = 'tt_mob_prog';

  /* ── Date-seeded shuffle (same result each calendar day) ─────── */
  function _dateSeed(dateStr) {
    return dateStr.split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 0);
  }
  function _seededShuffle(arr, seed) {
    const a = [...arr]; let s = seed >>> 0;
    for (let i = a.length - 1; i > 0; i--) {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      const j = s % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* 4 non-negotiable daily essentials (always shown) */
  const MOB_ESSENTIALS = [
    { id:'mob-d1',  name:'Seated band dorsiflexion',               target:'2 × 15 reps/side' },
    { id:'mob-d2',  name:'Hip flexor wall-assisted kneeling lunge', target:'2 × 45s/side' },
    { id:'mob-d6',  name:'Open-book thoracic rotation',             target:'2 × 8/side', flag:'Mid-spine clinical finding: rotation and cat-cow only' },
    { id:'mob-d10', name:'Shoulder CARs',                           target:'Slow, within comfortable range' },
  ];

  /* Rotating pool — 6 selected daily via date seed */
  const MOB_POOL = [
    // Shoulder / upper body
    { id:'mob-d3',  name:'Prayer stretch',                          target:'2 × 30s' },
    { id:'mob-d4',  name:'Reverse prayer stretch',                  target:'2 × 30s' },
    { id:'mob-d5',  name:'Wrist CARs',                              target:'5 circles each direction' },
    { id:'mob-d7',  name:'Cat-cow',                                 target:'1 × 10' },
    { id:'mob-d8',  name:'Sleeper stretch',                         target:'2 × 30s/side', flag:'No forcing overhead' },
    { id:'mob-d9',  name:'Wall-corner pec stretch',                 target:'2 × 30s/side' },
    { id:'mob-w5',  name:"Child's pose lat reach",                  target:'2 × 45s/side' },
    { id:'mob-w6',  name:'Standing side-bend lat stretch',          target:'2 × 45s/side' },
    { id:'mob-w7',  name:'Neck lateral tilt',                       target:'2 × 30s/side' },
    { id:'mob-w8',  name:'Neck rotation',                           target:'2 × 10/side' },
    // Hip / lower body
    { id:'mob-w1',  name:'90-90 hip switches',                      target:'2 × 8/side' },
    { id:'mob-w2',  name:'Figure-4 supine stretch',                 target:'2 × 45s/side' },
    { id:'mob-w3',  name:'Pigeon pose',                             target:'2 × 45s/side' },
    { id:'mob-w4',  name:'Supine band hamstring stretch',           target:'2 × 45s/side', caution:'Right side conservative' },
    // Leg flexibility (goal area)
    { id:'mob-leg1', name:'Standing quad stretch',                  target:'2 × 45s/side' },
    { id:'mob-leg2', name:'Kneeling adductor stretch',              target:'2 × 45s/side' },
    { id:'mob-leg3', name:'Calf-soleus deep stretch',               target:'2 × 45s/side' },
    { id:'mob-leg4', name:'Long-sit hamstring stretch',             target:'2 × 45s', caution:'Right side conservative — ease into it' },
    { id:'mob-leg5', name:'Deep frog stretch',                      target:'2 × 45s' },
  ];

  /* Day info: type, duration, rationale — keyed by day-of-week (0=Sun) */
  const MOB_DAY_INFO = {
    0: { name:'Sunday',    type:'Full rest day',       duration:'~35 min', rationale:"Deepest session of the week — full rest day, maximum hold times, complete mobility reset" },
    1: { name:'Monday',    type:'Upper day recovery',  duration:'~20 min', rationale:"Hip and lower body focus — upper body recovers from today's gym session" },
    2: { name:'Tuesday',   type:'Engine day recovery', duration:'~25 min', rationale:"Hip rotation and lat work — upper body in recovery, hips active from engine day" },
    3: { name:'Wednesday', type:'Upper day recovery',  duration:'~20 min', rationale:"Hip and hamstring focus — arms and shoulders resting after a heavy rowing session" },
    4: { name:'Thursday',  type:'Engine day recovery', duration:'~25 min', rationale:"Deepest hip and lat work of the week — second pigeon session, engine day recovery" },
    5: { name:'Friday',    type:'Upper day recovery',  duration:'~20 min', rationale:"Full lower body and neck focus — preparing the body for the weekend's deeper sessions" },
    6: { name:'Saturday',  type:'Rest day',            duration:'~30 min', rationale:"Medium full-body session — rest day, longer holds, more volume" },
  };


  /* Physio-locked deeper work per day (shown greyed/padlocked until physio toggle on) */
  const MOB_LOCKED_DEEPER = {
    1: [{ id:'mob-l1', name:'Knee-to-wall ankle drill', target:'2 × 10 reps/side', rationale:'After physio clearance — ankle mobility work after an upper gym day' }],
    3: [{ id:'mob-l1', name:'Knee-to-wall ankle drill', target:'2 × 10 reps/side', rationale:'Second ankle session of the week after an upper gym day' }],
    5: [{ id:'mob-l1', name:'Knee-to-wall ankle drill', target:'2 × 10 reps/side', rationale:'Third ankle session of the week — three sessions weekly for the 3 cm dorsiflexion deficit' }],
    2: [{ id:'mob-l2', name:'Eccentric heel drop', target:'3 × 15 reps/side', rationale:'After physio clearance — Achilles and calf eccentric work on an engine day' }],
    4: [{ id:'mob-l2', name:'Eccentric heel drop', target:'3 × 15 reps/side', rationale:'Second eccentric heel drop session of the week' }],
    6: [
      { id:'mob-l3', name:'Wall angel', target:'2 × 10 reps',    rationale:'After physio clearance — thoracic mobility with posterior chain activation on rest day' },
      { id:'mob-l4', name:'Loaded thoracic extension', target:'2 × 60s', rationale:'Loaded thoracic extension on rest day — no gym fatigue' },
    ],
    0: [
      { id:'mob-l3', name:'Wall angel', target:'3 × 10 reps',    rationale:'More volume on full rest day' },
      { id:'mob-l4', name:'Loaded thoracic extension', target:'3 × 60s', rationale:'Maximum volume on full rest day' },
      { id:'mob-l5', name:'Forced end-range left shoulder overhead', target:'3 × 30s', rationale:'Sunday only — most recovered day for the most demanding shoulder exercise' },
    ],
  };

  /* ── MOB_DETAILS: per-exercise SVG + content ─────────────────── */
  const MOB_DETAILS = {

    'mob-d1': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="168" x2="280" y2="168" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="85" cy="52" r="15" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="85" y1="67" x2="85" y2="82" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <rect x="70" y="82" width="30" height="52" rx="8" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="70" y1="95" x2="48" y2="120" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="48" y1="120" x2="52" y2="152" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="95" x2="122" y2="120" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="122" y1="120" x2="118" y2="152" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="85" cy="134" r="6" fill="#4a7c59"/>
  <line x1="85" y1="140" x2="255" y2="160" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="170" cy="150" r="5" fill="#4a7c59"/>
  <ellipse cx="258" cy="162" rx="10" ry="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <path d="M252,158 Q190,130 118,152" stroke="#4a7c59" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  <path d="M252,158 Q190,130 52,152" stroke="#4a7c59" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  <ellipse cx="200" cy="153" rx="38" ry="9" fill="#e74c3c" opacity="0.18"/>
  <line x1="248" y1="160" x2="216" y2="156" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar1)"/>
  <text x="248" y="180" font-size="10" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">pull toes back</text>
</svg>`,
      steps: [
        'Sit on the floor with one leg extended straight in front of you. Sit up tall with a straight spine — do not hunch.',
        'Loop a resistance band around the ball of your foot, just below the toes. Anchor the other end to something low and solid in front of you — a table leg, or hold it taut in your hands.',
        'The band should be pulling your foot away from you (toes pointing forward). This is your starting position.',
        'Slowly pull your toes back toward your shin, working against the resistance of the band. This movement is dorsiflexion.',
        'At the top, toes should be pointing as far back toward your shin as possible. Hold for 1 second.',
        'Slowly return your foot to the starting position — control the movement, do not let the band snap the foot back.',
        'Complete all reps on one side before switching.',
        'Breathe: exhale as you pull the toes toward the shin, inhale as you return.'
      ],
      feel: 'You should feel the front of your shin (tibialis anterior) working during the pull, and a mild stretch in your calf and Achilles on return. This is both a strengthening and mobilising exercise — expect a muscle-effort feeling, not just a passive stretch. Expect some asymmetry between sides given the documented 3 cm dorsiflexion deficit.',
      prog: {
        ready: 'The stretch intensity in the calf on return has dropped to 2/10, and you can complete all reps with a full controlled pull without the foot flicking back.',
        next: 'Increase band resistance by one level, or add a second set. Progress to performing the movement seated on a slightly raised surface to increase the dorsiflexion demand.',
        goal: 'Full symmetrical dorsiflexion on both sides — 3 cm deficit eliminated. In a weight-bearing knee-to-wall test, knee should travel 10–12 cm past the toe.',
        time: '6–10 weeks of daily practice to close a 3 cm deficit. Ankle mobility responds well to consistent daily work but is slow to change — expect gradual week-by-week improvement.'
      }
    },

    'mob-d2': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <rect x="264" y="10" width="16" height="185" fill="#e0e0e0" stroke="#ccc" stroke-width="1"/>
  <line x1="20" y1="168" x2="264" y2="168" stroke="#ccc" stroke-width="1.5"/>
  <ellipse cx="80" cy="168" rx="14" ry="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <line x1="82" y1="163" x2="108" y2="125" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="108" cy="125" r="6" fill="#4a7c59"/>
  <line x1="108" y1="125" x2="148" y2="100" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="148" cy="100" r="6" fill="#4a7c59"/>
  <rect x="136" y="48" width="28" height="52" rx="8" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="48" x2="150" y2="36" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="150" cy="22" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="148" y1="100" x2="192" y2="150" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="192" cy="150" r="6" fill="#4a7c59"/>
  <line x1="192" y1="150" x2="264" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="264" cy="130" rx="5" ry="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <line x1="136" y1="62" x2="116" y2="88" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="164" y1="62" x2="178" y2="88" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="170" cy="118" rx="24" ry="18" fill="#e74c3c" opacity="0.22"/>
  <path d="M148,108 Q138,122 145,132" stroke="#e74c3c" stroke-width="2.5" fill="none" marker-end="url(#ar2)"/>
  <text x="112" y="145" font-size="9" fill="#e74c3c" font-family="sans-serif">tuck pelvis</text>
  <text x="162" y="110" font-size="9" fill="#e74c3c" font-family="sans-serif">hip flexor</text>
</svg>`,
      steps: [
        'Set up about 60–70 cm away from a wall, facing away from it. Place a folded towel under your rear knee for padding.',
        'Kneel and place your right knee on the floor, right foot raised with the top of the foot resting flat against the wall. Left foot flat on the floor with left knee at roughly 90 degrees.',
        'Before doing anything else, check your posture: spine tall, shoulders back, hips facing forward square. Do not lean forward or collapse through the lower back.',
        'Gently squeeze the glute of the rear (right) leg. This is crucial — the glute squeeze creates a posterior pelvic tilt that generates the real stretch in the hip flexor.',
        'Without letting the lower back arch, gently shift your hips forward slightly until you feel a deep stretch in the front of the right hip and upper thigh.',
        'To intensify: tuck your pelvis under — imagine bringing your pubic bone toward your belly button.',
        'Hold for 30–45 seconds, breathing slowly and deeply. Exhale into the stretch and allow your body to relax deeper with each breath out.',
        'To come out: release the glute, sit back upright, step the rear foot down from the wall. Switch sides.'
      ],
      feel: 'You should feel a deep stretch in the front of the rear hip and upper thigh — the hip flexor. The glute of the rear leg should be lightly engaged throughout. If you feel the stretch mainly in the knee or shin, the position needs adjusting. If the lower back aches, increase the glute squeeze and pelvic tuck.',
      prog: {
        ready: 'The stretch intensity has dropped to 2/10 at the same position, you can hold the full duration with steady breathing and no lower-back arching, and glute engagement feels natural rather than effortful.',
        next: 'Increase hold duration to 60 seconds per side. Add a gentle lateral torso lean away from the rear leg to bias the TFL and lateral hip flexors, or add a slight overhead reach with the same-side arm.',
        goal: 'Comfortable deep hip flexor stretch with a completely neutral spine, hips fully square, and no sensation in the lower back — indicating the iliopsoas is releasing freely rather than the spine compensating.',
        time: '8–12 weeks for meaningful hip flexor length change. Chronic tightness from prolonged sitting takes consistent daily work to reverse.'
      }
    },

    'mob-d3': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <rect x="125" y="70" width="50" height="70" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="70" x2="150" y2="56" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="150" cy="42" r="16" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="125" y1="82" x2="90" y2="85" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="175" y1="82" x2="210" y2="85" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="90" y1="85" x2="115" y2="122" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="210" y1="85" x2="185" y2="122" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <rect x="132" y="102" width="18" height="40" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <rect x="150" y="102" width="18" height="40" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <line x1="150" y1="102" x2="150" y2="142" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="3,2"/>
  <ellipse cx="133" cy="112" rx="8" ry="16" fill="#e74c3c" opacity="0.2"/>
  <ellipse cx="167" cy="112" rx="8" ry="16" fill="#e74c3c" opacity="0.2"/>
  <line x1="150" y1="148" x2="150" y2="168" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar3)"/>
  <text x="150" y="185" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">lower hands gently</text>
</svg>`,
      steps: [
        'Stand or sit upright. Bring both hands together in front of your chest, palms flat against each other, fingers pointing upward, wrists at chest height.',
        'Press your palms firmly together so there is full contact from the base of the palm to the fingertips. Pressure should be even on both sides.',
        'Keeping the palms pressed together, slowly lower your joined hands downward toward your waist while maintaining full palm contact.',
        'As your hands descend you will feel increasing tension across the inner forearms and wrists. Stop when you reach a 4–5/10 stretch intensity.',
        'Hold for the full 30 seconds. Breathe slowly and continuously — do not hold your breath.',
        'On each exhale, try to lower the hands very slightly further. Let gravity and relaxation do the work — do not force.',
        'To finish: bring the hands back to chest height and release.'
      ],
      feel: 'You should feel a clear stretch across the inner forearms and wrists — the wrist flexor muscles and tendons. The sensation is a dull pull, not a sharp pain. Both sides should feel similar intensity, though minor asymmetry is normal. This targets wrist extension range, which is critical for pushing movements in climbing.',
      prog: {
        ready: 'You can lower your hands to waist height while maintaining full palm contact, stretch intensity has dropped to 2/10, and you can breathe fully and slowly throughout the entire hold.',
        next: 'Increase hold duration by 15 seconds per set. Add gentle fingertip extensions during the hold — while hands are pressed and lowered, gently try to extend fingers backward to add a secondary stretch.',
        goal: 'Hands fully lowered to waist height with palms completely flat and fingers fully extended — indicating full bilateral wrist extension range of motion.',
        time: '4–8 weeks of daily practice for meaningful wrist extension improvement. Wrist mobility responds relatively quickly to consistent stretching compared to larger joints.'
      }
    },

    'mob-d4': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect x="120" y="55" width="60" height="75" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="58" x2="150" y2="128" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="150" y1="55" x2="150" y2="42" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="150" cy="28" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="120" y1="68" x2="90" y2="72" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="180" y1="68" x2="210" y2="72" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="90" y1="72" x2="108" y2="115" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="210" y1="72" x2="192" y2="115" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <rect x="124" y="120" width="18" height="38" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <rect x="158" y="120" width="18" height="38" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <circle cx="133" cy="124" r="2.5" fill="#4a7c59"/>
  <circle cx="167" cy="124" r="2.5" fill="#4a7c59"/>
  <ellipse cx="112" cy="110" rx="9" ry="16" fill="#e74c3c" opacity="0.22"/>
  <ellipse cx="188" cy="110" rx="9" ry="16" fill="#e74c3c" opacity="0.22"/>
  <text x="150" y="175" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">backs of hands together behind back</text>
  <text x="100" y="108" font-size="9" fill="#e74c3c" text-anchor="end" font-family="sans-serif">forearms</text>
</svg>`,
      steps: [
        'Stand upright or sit tall. This stretch targets the wrist flexors and outer forearms — the opposite of the prayer stretch.',
        'Bring both hands behind your back. Bend your elbows slightly and bring the backs of your hands together behind your lower back, fingers pointing downward.',
        'Press the backs of your hands firmly together. Try to get full contact from the knuckles to the wrists. If this is very difficult at first, bring the backs as close together as you can manage.',
        'Once the hands are together, slowly try to slide them upward toward the middle of your back, keeping the backs of the hands in contact. Stop when you feel a clear stretch across the back of the wrists and outer forearms.',
        'Hold for 30 seconds, breathing slowly. On each exhale ease very slightly deeper.',
        'To finish: release the hands and shake out the wrists gently.'
      ],
      feel: 'You should feel the stretch across the back of the wrists and the outer forearms — the wrist flexor muscles on their lengthened side. This is the opposite sensation to the prayer stretch. If you feel pain at the wrist joint itself rather than the forearm muscle belly, reduce the intensity.',
      prog: {
        ready: 'You can slide the hands comfortably to mid-back height with the backs fully in contact, stretch intensity has dropped to 2/10, and you can hold with relaxed shoulders and steady breathing.',
        next: 'Increase hold time to 45 seconds. Try to slide the hands progressively higher up the back over weeks.',
        goal: 'Hands pressed together mid-to-upper back with full back-of-hand contact, fingers pointing straight down — indicating full bilateral wrist flexion range.',
        time: '4–6 weeks for early improvement. Combined with the prayer stretch and wrist CARs daily, expect meaningful forearm flexibility progress within 6–8 weeks.'
      }
    },

    'mob-d5': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#4a7c59"/></marker></defs>
  <rect x="55" y="90" width="95" height="20" rx="8" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="155" cy="100" r="9" fill="#e74c3c" opacity="0.3"/>
  <circle cx="155" cy="100" r="9" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <circle cx="155" cy="100" r="50" fill="none" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="6,4"/>
  <rect x="142" y="152" width="26" height="18" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <text x="155" y="186" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">flex</text>
  <rect x="142" y="30" width="26" height="18" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <text x="155" y="26" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">extend</text>
  <rect x="200" y="91" width="18" height="18" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" transform="rotate(90,209,100)"/>
  <text x="232" y="104" font-size="9" fill="#6b7280" font-family="sans-serif">ulnar</text>
  <rect x="82" y="91" width="18" height="18" rx="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" transform="rotate(-90,91,100)"/>
  <text x="78" y="104" font-size="9" fill="#6b7280" text-anchor="end" font-family="sans-serif">radial</text>
  <path d="M155,52 A48,48 0 0,1 203,100" stroke="#4a7c59" stroke-width="2.5" fill="none" marker-end="url(#ar5)"/>
  <text x="155" y="115" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">wrist joint</text>
</svg>`,
      steps: [
        'Stand or sit. Hold one arm out in front of you, elbow straight, hand relaxed. Other hand rests at your side.',
        'Begin with your wrist in a neutral position — hand in line with the forearm, no bend in any direction.',
        'Slowly move your hand into full flexion — curl the fingers and wrist downward as far as they will comfortably go.',
        'From full flexion, rotate into ulnar deviation — keeping the wrist low, tilt the hand toward the little finger side.',
        'Continue the circle into full extension — bring the hand upward and back, fingers pointing toward the ceiling, as far as comfortable.',
        'Continue into radial deviation — tilt the hand toward the thumb side.',
        'Complete the circle back to the neutral starting position. That is one full rotation.',
        'Move slowly and deliberately — one full circle should take 8–10 seconds. Spend extra time in any range that feels stiff. Breathe continuously. 5 full circles in each direction, then switch hands.'
      ],
      feel: 'You should feel the wrist joint moving through its full available range. Each quadrant may feel different — restriction or mild discomfort in any direction is normal and indicates where mobility is lacking. Sharp pain is not normal. Given the forearm tightness in your assessment, extension range is likely the most restricted direction.',
      prog: {
        ready: 'Each full circle feels smooth and controlled with equal range in all four directions, no catching or clicking in any quadrant, and the movement takes the full 8–10 seconds without rushing through restricted areas.',
        next: 'Add gentle overpressure with the opposite hand at end range in each direction — hold for 2–3 seconds before continuing the circle. Progress to loaded CARs with a very light weight (0.5 kg).',
        goal: 'Full circumduction in both directions with equal, smooth range — no restriction in any quadrant, able to complete at speed without loss of range.',
        time: '4–6 weeks for initial improvement. Wrist CARs are primarily a maintenance and exploration tool — improvement is measured by reduced stiffness and improved smoothness of movement.'
      }
    },

    'mob-d6': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="172" x2="280" y2="172" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="130" cy="148" r="7" fill="#4a7c59"/>
  <line x1="130" y1="148" x2="90" y2="148" stroke="#4a7c59" stroke-width="14" stroke-linecap="round" opacity="0.25"/>
  <line x1="130" y1="148" x2="90" y2="148" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="90" cy="148" r="6" fill="#4a7c59"/>
  <line x1="90" y1="148" x2="90" y2="170" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <rect x="128" y="118" width="70" height="30" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="198" cy="128" r="7" fill="#4a7c59"/>
  <line x1="198" y1="128" x2="242" y2="128" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="222" cy="115" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="198" y1="128" x2="172" y2="82" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6,3"/>
  <path d="M242,128 A44,44 0 0,0 172,86" stroke="#4a7c59" stroke-width="1.5" fill="none" stroke-dasharray="5,3"/>
  <line x1="180" y1="90" x2="165" y2="78" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar6)"/>
  <ellipse cx="158" cy="133" rx="18" ry="9" fill="#e74c3c" opacity="0.22"/>
  <text x="152" y="160" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">thoracic spine</text>
  <text x="162" y="70" font-size="9" fill="#4a7c59" text-anchor="middle" font-family="sans-serif">rotate open</text>
</svg>`,
      steps: [
        'Lie on your side on the floor. Hips and knees bent at roughly 90 degrees — knees stacked on top of each other. Bottom arm extended straight out in front of you along the floor, palm down. Head rests on the floor or on your bottom arm.',
        'Take your top arm and extend it straight out in front so both arms are stacked, palms together.',
        'Slowly rotate your top arm upward and over — following it with your eyes and your head — opening your chest toward the ceiling like opening a book. Let the top arm travel in an arc toward the floor on the opposite side.',
        'Your knees stay stacked and stay on the floor throughout. They do not move. Only the upper body rotates. If your knees lift, place a folded towel on them.',
        'Rotate as far as you comfortably can. Ideally the top arm reaches the floor on the opposite side, but do not force it. Go to your comfortable end range.',
        'Hold for 2–3 seconds at the end position, breathing out as you hold.',
        'Slowly return the top arm back in an arc to the starting stacked position. That is one rep.',
        'Breathe: inhale to prepare, exhale as you rotate open, inhale to return.'
      ],
      feel: 'You should feel a rotation through your mid and upper back (thoracic spine) and a mild opening stretch across the chest on the rotating side. This is rotation only — not extending backward. If you feel the movement mainly in the lower back or the knees are lifting, the thoracic spine is stiff and the lumbar is compensating. This is expected given the mid-spine findings and will improve with practice.',
      prog: {
        ready: 'Your top arm reaches the floor on the opposite side with knees fully stacked and stationary, breathing is slow and full throughout, and you feel the rotation clearly in the thoracic spine rather than the lower back.',
        next: 'Add a 5-second hold at end range. Progress to a supported version with a pillow under the top knee to allow deeper rotation.',
        goal: 'Top arm flat on the floor on the opposite side, knees fully stacked on the floor, head following the arm — approximately 45–50 degrees of thoracic rotation.',
        time: '6–10 weeks for meaningful thoracic rotation improvement. Thoracic mobility is notoriously slow to change in adults — daily practice is essential.'
      }
    },

    'mob-d7': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ar7a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker>
    <marker id="ar7b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker>
  </defs>
  <text x="60" y="18" font-size="11" fill="#4a7c59" text-anchor="middle" font-family="sans-serif" font-weight="700">COW</text>
  <line x1="10" y1="170" x2="135" y2="170" stroke="#ccc" stroke-width="1.5"/>
  <line x1="28" y1="162" x2="28" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="95" y1="162" x2="95" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="28" cy="128" r="5" fill="#4a7c59"/>
  <circle cx="95" cy="128" r="5" fill="#4a7c59"/>
  <path d="M28,128 Q62,148 95,128" stroke="#4a7c59" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="62" cy="138" rx="22" ry="9" fill="#e74c3c" opacity="0.22"/>
  <line x1="28" y1="128" x2="28" y2="162" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="95" y1="128" x2="95" y2="162" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="28" y1="128" x2="18" y2="108" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="14" cy="96" r="13" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="62" y1="155" x2="62" y2="168" stroke="#e74c3c" stroke-width="2" marker-end="url(#ar7a)"/>
  <text x="220" y="18" font-size="11" fill="#4a7c59" text-anchor="middle" font-family="sans-serif" font-weight="700">CAT</text>
  <line x1="160" y1="170" x2="285" y2="170" stroke="#ccc" stroke-width="1.5"/>
  <line x1="178" y1="162" x2="178" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="245" y1="162" x2="245" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="178" cy="128" r="5" fill="#4a7c59"/>
  <circle cx="245" cy="128" r="5" fill="#4a7c59"/>
  <path d="M178,128 Q212,105 245,128" stroke="#4a7c59" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="212" cy="113" rx="22" ry="9" fill="#e74c3c" opacity="0.22"/>
  <line x1="178" y1="128" x2="178" y2="162" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="245" y1="128" x2="245" y2="162" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="178" y1="128" x2="185" y2="148" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="187" cy="160" r="13" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="212" y1="100" x2="212" y2="87" stroke="#e74c3c" stroke-width="2" marker-end="url(#ar7b)"/>
</svg>`,
      steps: [
        'Start on your hands and knees — hands directly under shoulders, knees directly under hips. Spine neutral, head in line with the spine, looking at the floor.',
        'COW first: slowly let your belly drop toward the floor, lower back arching gently. Lift your head and tailbone upward. The spine curves downward in a U shape. Do not crank your neck — let the head follow naturally. Breathe in during cow.',
        'Pause briefly at the bottom of the cow position and feel the stretch through the front of the spine.',
        'CAT: slowly reverse the movement. Round your spine upward toward the ceiling like an angry cat. Head drops, tailbone tucks under, mid-back pushes up as high as it will go. Breathe out during cat.',
        'Pause briefly at the top of the cat position and feel the stretch through the back of the spine.',
        'Move slowly and deliberately — each transition should take 2–3 seconds. This is not a fast exercise.',
        '10 reps means 10 full cycles of cow then cat.',
        'On each cat, focus on pushing the thoracic (mid-back) area upward — try to feel movement in the middle of the back, not just the lower back.'
      ],
      feel: 'You should feel gentle movement throughout the entire spine from the lower back up through the thoracic spine. The cat position should produce a clear stretch through the upper and middle back. If you feel nothing in the thoracic area during cat, that is a sign of how stiff it currently is — the movement is still beneficial and will improve with consistency.',
      prog: {
        ready: 'You can feel clear thoracic movement (not just lumbar) in both cat and cow, can breathe fully throughout, and complete all 10 reps with smooth fluid transitions.',
        next: 'Add a 3-second hold at the peak of each cat and cow. Progress to segmental cat-cow — try to initiate the movement from different segments of the spine to develop spinal articulation.',
        goal: 'Full segmental spinal mobility — rolling through each vertebral segment individually in both directions, with clear thoracic movement independent of the lumbar spine.',
        time: '4–8 weeks to feel meaningful thoracic engagement in the cat position. Spinal mobility improves predictably with consistent daily practice.'
      }
    },

    'mob-d8': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="175" x2="280" y2="175" stroke="#ccc" stroke-width="1.5"/>
  <ellipse cx="150" cy="165" rx="60" ry="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" opacity="0.5"/>
  <rect x="130" y="118" width="75" height="28" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="205" cy="128" r="8" fill="#e74c3c" opacity="0.3"/>
  <circle cx="205" cy="128" r="8" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <line x1="205" y1="128" x2="248" y2="128" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="248" cy="128" r="5" fill="#4a7c59"/>
  <line x1="248" y1="128" x2="248" y2="86" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="248" cy="86" r="5" fill="#4a7c59"/>
  <line x1="222" y1="108" x2="248" y2="110" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" stroke-dasharray="5,3"/>
  <circle cx="220" cy="107" r="5" fill="#4a7c59"/>
  <line x1="248" y1="95" x2="248" y2="113" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar8)"/>
  <circle cx="258" cy="110" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <text x="205" y="150" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">posterior capsule</text>
  <text x="268" y="84" font-size="9" fill="#e74c3c" font-family="sans-serif">press ↓</text>
</svg>`,
      steps: [
        'Lie on your side on a firm surface. The shoulder you are stretching is the bottom shoulder — directly underneath you, not on top. Bottom arm extended straight out from the shoulder at 90 degrees to your body, palm facing upward.',
        'Bend your bottom elbow to 90 degrees so your forearm points straight up toward the ceiling, palm facing your feet.',
        'This is the starting position: bottom shoulder on the floor, elbow at 90 degrees, forearm vertical.',
        'Using your top hand, gently press your bottom forearm downward toward the floor — rotating the shoulder internally. Apply only gentle, steady pressure. This is not a forceful stretch.',
        'Lower the forearm toward the floor as far as it will comfortably go. Many people find it barely moves at first — this is completely normal given the posterior capsule tightness.',
        'Hold the end position for 30 seconds. Breathe slowly and allow the shoulder to relax. Never force this stretch.',
        'To finish: release the pressure from the top hand, return the forearm to vertical, and roll onto your back before switching sides.',
        'If you feel any pinching at the front of the shoulder, reduce the pressure immediately.'
      ],
      feel: 'You should feel a deep stretch in the back of the shoulder — the posterior capsule and posterior rotator cuff. The sensation is a dull, deep ache in the rear of the shoulder joint. Not a sharp pain, not a pinching sensation at the front. If you feel pinching at the front of the shoulder, reduce the pressure immediately — this indicates impingement rather than capsule stretching.',
      prog: {
        ready: 'Your forearm lowers to within 5 cm of the floor with gentle pressure, stretch intensity has dropped to 2/10, and there is no pinching sensation at any point during the hold.',
        next: 'Increase hold time to 45 seconds. Add gentle oscillatory pressure at end range — small pulses of pressure lasting 1 second each — which can mobilise the capsule more effectively.',
        goal: 'Forearm fully flat on the floor with no pressure from the top hand needed — indicating the posterior capsule has lengthened. Clinically: 45–55 degrees of internal rotation in the horizontal position.',
        time: '10–16 weeks of daily practice. Capsular restriction is one of the slowest shoulder structures to respond to stretching. Consistent daily work at low intensity is more effective than occasional aggressive stretching.'
      }
    },

    'mob-d9': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="150" y1="10" x2="55" y2="100" stroke="#ccc" stroke-width="8" stroke-linecap="round"/>
  <line x1="150" y1="10" x2="245" y2="100" stroke="#ccc" stroke-width="8" stroke-linecap="round"/>
  <line x1="20" y1="178" x2="280" y2="178" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="150" cy="55" r="16" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="71" x2="150" y2="85" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <rect x="130" y="85" width="40" height="55" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="138" y1="140" x2="130" y2="178" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="162" y1="140" x2="170" y2="178" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="130" y1="96" x2="88" y2="96" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="88" y1="96" x2="75" y2="128" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="170" y1="96" x2="212" y2="96" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="212" y1="96" x2="225" y2="128" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="112" cy="105" rx="22" ry="14" fill="#e74c3c" opacity="0.22"/>
  <ellipse cx="188" cy="105" rx="22" ry="14" fill="#e74c3c" opacity="0.22"/>
  <text x="88" y="142" font-size="9" fill="#e74c3c" font-family="sans-serif">pec</text>
  <text x="200" y="142" font-size="9" fill="#e74c3c" font-family="sans-serif">pec</text>
  <text x="150" y="166" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">lean forward gently</text>
</svg>`,
      steps: [
        'Find a doorframe or corner of a room where two walls meet. Stand facing the corner or doorframe, about one small step back from it.',
        'Raise both arms out to the sides and bend your elbows to 90 degrees — upper arms parallel to the floor, forearms pointing straight up. This is a goalpost arm position.',
        'Place both forearms flat against the walls or doorframe — one forearm per wall, from the elbow to the wrist in contact with the surface.',
        'Stand tall with a proud chest. Do not let the lower back arch — engage your core gently to keep the ribs down.',
        'Slowly lean your body forward between the walls or through the doorframe, keeping both forearms in contact with the surface.',
        'Stop when you feel a clear stretch across the front of the chest and front of the shoulders — a 4–5/10 intensity.',
        'Hold for 30 seconds, breathing slowly and deeply. On each exhale allow your chest to open slightly further.',
        'To finish: step back from the wall and lower your arms.'
      ],
      feel: 'You should feel the stretch across the pectorals (chest muscles) and the anterior (front) of the shoulders. This is a broad, satisfying stretch across the front of the upper body. If you feel discomfort at the front of the shoulder joint specifically (not the muscle), reduce the lean angle.',
      prog: {
        ready: 'You can lean fully forward with forearms flat against the walls, stretch intensity has dropped to 2/10, you can breathe fully without restriction, and the chest opens fully.',
        next: 'Lower the arm position on the wall (elbows below shoulder height) to shift emphasis to lower pec fibres. Or raise the forearms to emphasise the upper pec and anterior shoulder.',
        goal: 'Full lean forward with both forearms flat on the walls, chest fully open, anterior shoulder completely relaxed — indicating resolved anterior shoulder and chest tightness.',
        time: '4–8 weeks of daily practice. Pec and anterior shoulder tightness responds well to consistent stretching, especially combined with postural strengthening.'
      }
    },

    'mob-d10': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#4a7c59"/></marker></defs>
  <rect x="118" y="90" width="34" height="70" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="135" y1="90" x2="135" y2="76" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="135" cy="62" r="15" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="125" y1="160" x2="118" y2="190" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="145" y1="160" x2="152" y2="190" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="152" cy="100" r="8" fill="#e74c3c" opacity="0.3"/>
  <circle cx="152" cy="100" r="8" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <circle cx="152" cy="100" r="72" fill="none" stroke="#4a7c59" stroke-width="1.5" stroke-dasharray="6,4"/>
  <line x1="152" y1="108" x2="152" y2="168" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="152" y1="100" x2="82" y2="100" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
  <line x1="152" y1="100" x2="152" y2="30" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
  <line x1="152" y1="100" x2="218" y2="84" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" opacity="0.4" stroke-dasharray="5,3"/>
  <path d="M152,172 A72,72 0 0,0 82,100" stroke="#4a7c59" stroke-width="2.5" fill="none" marker-end="url(#ar10)"/>
  <text x="88" y="58" font-size="9" fill="#4a7c59" font-family="sans-serif">full circle</text>
  <text x="152" y="196" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">slow, full arc</text>
  <text x="152" y="96" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">shoulder</text>
</svg>`,
      steps: [
        'Stand upright, feet shoulder-width apart, core gently engaged. Hold one arm straight down by your side. Keep the elbow straight throughout the entire movement.',
        'Slowly raise your arm forward and upward — in front of your body, like a front raise. Keep the elbow straight and movement controlled.',
        'Continue raising the arm overhead until it is pointing straight up. At this point rotate your palm to face outward (away from your body).',
        'Continue the arc, taking the arm backward and downward behind your body as far as it will comfortably go. This is the posterior arc where most restriction is felt.',
        'Complete the circle by bringing the arm forward and back to the starting position.',
        'Throughout the movement, work within pain-free range only. Do not force past restriction.',
        'Move very slowly — one full circle should take 8–10 seconds. 5 circles forward then 5 circles backward, each side.',
        'Your left shoulder will have a noticeably smaller arc than the right — this is expected and will improve with consistent practice.'
      ],
      feel: 'You should feel the shoulder joint moving through its full available range. The posterior arc (arm going behind and down) is where most restriction is felt — a tightening deep in the shoulder. Any stiffness or mild discomfort during the arc is normal. Sharp pain or a catching/clunking sensation is not normal. Given the documented left shoulder restriction of 80° active flexion, the left arc will be significantly smaller — this is expected.',
      prog: {
        ready: 'The left arm arc is noticeably larger, the catching or restriction feeling in the posterior arc has reduced, and both circles take the full 8–10 seconds without rushing through tight spots.',
        next: 'At the point of most restriction, hold for 3–5 seconds with gentle additional effort to push into the restriction before continuing the arc.',
        goal: 'Full symmetric shoulder circumduction — arm completing a complete 360-degree arc through all planes without restriction. Clinically: full overhead flexion (180°) and full extension behind the body.',
        time: '12–20 weeks for meaningful improvement in a shoulder with existing restriction. Shoulder CARs need to be performed daily without exception to drive change.'
      }
    },

    'mob-w1': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ar11a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker>
    <marker id="ar11b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker>
  </defs>
  <line x1="20" y1="178" x2="280" y2="178" stroke="#ccc" stroke-width="1.5"/>
  <rect x="125" y="75" width="40" height="60" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="145" y1="75" x2="145" y2="60" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="145" cy="46" r="15" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="132" cy="135" r="7" fill="#e74c3c" opacity="0.4"/>
  <circle cx="158" cy="135" r="7" fill="#e74c3c" opacity="0.4"/>
  <line x1="132" y1="135" x2="85" y2="155" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="85" cy="155" r="5" fill="#4a7c59"/>
  <line x1="85" y1="155" x2="55" y2="178" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="158" y1="135" x2="200" y2="155" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="200" cy="155" r="5" fill="#4a7c59"/>
  <line x1="200" y1="155" x2="240" y2="178" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <path d="M78,148 Q70,138 82,130" stroke="#e74c3c" stroke-width="2.5" fill="none" marker-end="url(#ar11a)"/>
  <path d="M208,148 Q218,138 206,130" stroke="#e74c3c" stroke-width="2.5" fill="none" marker-end="url(#ar11b)"/>
  <text x="52" y="170" font-size="9" fill="#6b7280" font-family="sans-serif">front shin</text>
  <text x="226" y="170" font-size="9" fill="#6b7280" font-family="sans-serif">rear shin</text>
  <text x="145" y="162" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">switch →</text>
</svg>`,
      steps: [
        'Sit on the floor with both legs bent at 90 degrees. Your front leg has the shin facing forward — hip rotated outward, knee in front, shin parallel to the front of your body. Your rear leg has the shin facing backward — hip rotated inward, knee to the side, shin pointing behind. Both knees on the floor. Sit upright.',
        'Before switching, sit tall and distribute your weight evenly through both sitting bones.',
        'Slowly rotate both knees to one side simultaneously — the front shin sweeps outward and back, the rear shin sweeps forward. Both knees travel in the same direction.',
        'Continue the rotation until the legs have fully switched — what was the front leg is now the rear leg.',
        'Sit tall in the new position. Hold for 1–2 seconds.',
        'Rotate back to the starting position. That is one rep.',
        'Breathe: exhale as you rotate, inhale as you settle into the new position.',
        'Keep the movement slow and controlled — you are actively rotating the hips through their range, not flopping the legs side to side.'
      ],
      feel: 'You should feel deep in the hip socket on both sides — a combination of internal and external rotation being worked alternately. One side will feel more restricted than the other, and this asymmetry is normal. If you cannot keep both knees on the floor during the switch, use hands on the floor for support. This exercise works the same hip structures that load under heel hooks and high steps on the wall.',
      prog: {
        ready: 'You can complete the full switch with both knees reaching the floor on each side, the movement is smooth and controlled, and you can complete all reps without using hands for support.',
        next: 'Add a 5-second pause at the fully switched position on each side. Progress to active 90-90 — from the switched position, try to lift the front shin off the floor (active hip internal rotation) for 3 seconds.',
        goal: 'Smooth, controlled 90-90 switches with both hips reaching the floor in each position, equal range of internal and external rotation on both sides.',
        time: '6–10 weeks for meaningful improvement in hip rotation range, especially combined with pigeon and figure-4 work.'
      }
    },

    'mob-w2': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="178" x2="280" y2="178" stroke="#ccc" stroke-width="1.5"/>
  <rect x="90" y="135" width="90" height="28" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="220" cy="148" r="15" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="90" y1="150" x2="30" y2="175" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="100" cy="148" r="5" fill="#4a7c59"/>
  <circle cx="130" cy="148" r="5" fill="#4a7c59"/>
  <line x1="100" y1="148" x2="80" y2="115" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="80" cy="115" r="6" fill="#4a7c59"/>
  <line x1="80" y1="115" x2="70" y2="148" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="130" y1="148" x2="90" y2="105" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="90" cy="105" r="6" fill="#4a7c59"/>
  <line x1="90" y1="105" x2="75" y2="118" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="74" cy="119" r="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <line x1="130" y1="148" x2="140" y2="120" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="148" x2="108" y2="118" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="124" cy="115" rx="18" ry="8" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <ellipse cx="90" cy="108" rx="20" ry="16" fill="#e74c3c" opacity="0.22"/>
  <text x="90" y="88" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">outer hip/glute</text>
</svg>`,
      steps: [
        'Lie on your back on the floor with both knees bent and both feet flat on the floor, hip-width apart. Relax your upper body completely.',
        'Cross your right ankle over your left thigh, just above the knee. Your right knee will fall out to the side, creating a figure-4 shape with your legs.',
        'Flex your right foot — pull the toes back toward your shin. This protects the knee joint during the stretch.',
        'Reach your hands through the gap between your legs and clasp them behind your left thigh.',
        'Gently draw your left thigh toward your chest, lifting the left foot off the floor. As you do this you will feel the stretch deepen in the outer right hip and glute.',
        'Pull until you feel a 4–5/10 stretch intensity in the outer right hip. Hold for 30 seconds.',
        'Breathe slowly and deeply — on each exhale allow the right hip to relax and the stretch to deepen slightly.',
        'To finish: release your hands, uncross the ankle, and place both feet back on the floor. Switch sides.'
      ],
      feel: 'You should feel the stretch primarily in the outer glute and deep hip rotators (piriformis) of the crossed leg. The sensation is a deep, broad ache in the outer hip and buttock. This is the same structure that causes hip pinching in deep squat positions and loads heavily during heel hooks. Some people also feel a mild stretch along the outer thigh.',
      prog: {
        ready: 'The stretch intensity has dropped to 2/10 at the same position, you can draw the thigh fully to the chest without the crossed knee pointing straight upward, and breathing is relaxed throughout.',
        next: 'Increase hold time to 45 seconds. Add gentle overpressure with the hand on the inner knee of the crossed leg — pushing it slightly away to increase external rotation of the hip.',
        goal: 'Crossed ankle sitting easily on the thigh with the crossed knee pointing well out to the side, thigh drawn fully to the chest, outer hip completely relaxed.',
        time: '6–10 weeks for meaningful hip external rotation improvement when practiced 3–4x per week consistently.'
      }
    },

    'mob-w3': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="175" x2="280" y2="175" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="140" cy="130" r="8" fill="#e74c3c" opacity="0.3"/>
  <circle cx="140" cy="130" r="8" fill="none" stroke="#e74c3c" stroke-width="2"/>
  <line x1="85" y1="160" x2="155" y2="145" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="86" cy="160" r="6" fill="#4a7c59"/>
  <line x1="86" y1="160" x2="140" y2="130" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="140" y1="130" x2="255" y2="170" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="200" cy="150" r="5" fill="#4a7c59"/>
  <ellipse cx="258" cy="172" rx="12" ry="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <rect x="128" y="72" width="30" height="58" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="143" y1="72" x2="143" y2="58" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="143" cy="44" r="15" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="128" y1="105" x2="98" y2="125" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="96" cy="127" r="5" fill="#4a7c59"/>
  <line x1="158" y1="105" x2="185" y2="120" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="187" cy="122" r="5" fill="#4a7c59"/>
  <ellipse cx="110" cy="150" rx="30" ry="15" fill="#e74c3c" opacity="0.2"/>
  <text x="92" y="143" font-size="9" fill="#e74c3c" font-family="sans-serif">outer hip</text>
</svg>`,
      steps: [
        'Start on your hands and knees on the floor.',
        'Bring your right knee forward and place it on the floor behind your right wrist. Your right shin will be at an angle across the mat — anywhere from 45 degrees to parallel with the front of the mat depending on your flexibility. More parallel = more intense stretch. Start at whatever angle is comfortable.',
        'Slide your left leg straight back behind you, extending it fully with the top of the foot resting on the floor. Hips should be as square to the front as possible.',
        'Place your hands on the floor in front of you for support and sit tall. If the right hip is floating high, place a folded towel underneath it for support.',
        'Decide your depth: hands on floor and torso upright is the moderate version. Walking the hands forward and lowering the torso deepens the stretch significantly. Start upright.',
        'Hold for 30–45 seconds. Breathe slowly and deeply. On each exhale consciously relax the hip and allow your body to sink very slightly deeper. Never bounce or force.',
        'To come out: push through your hands, tuck the right toes, and slide back to hands and knees. Switch sides.'
      ],
      feel: 'You should feel a deep stretch in the outer right hip, glute, and possibly the groin. The sensation is a broad, deep ache in the hip. This directly addresses your bilateral hip external rotation restriction confirmed in the assessment. With consistency, the hip will eventually lower toward the floor. If you feel a sharp or pinching sensation in the front of the hip, shift the shin angle away from parallel.',
      prog: {
        ready: 'The right hip touches the floor without a cushion under it, stretch intensity has dropped to 2/10 in the upright position, and you can lower the torso forward on hands and still breathe comfortably.',
        next: 'Progress to a forward fold — walk the hands out and lower the torso toward the floor, forehead resting on stacked hands. Hold for 45 seconds.',
        goal: 'Both hips flat on the floor in pigeon, shin at or near parallel with the front of the mat, torso fully folded forward with forearms on the floor.',
        time: '12–20 weeks for the hip to reach the floor from a raised position. Pigeon is one of the slowest stretches to see dramatic change in. Consistency at 3–4x per week is essential.'
      }
    },

    'mob-w4': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar14" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="178" x2="280" y2="178" stroke="#ccc" stroke-width="1.5"/>
  <rect x="85" y="140" width="100" height="26" rx="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="225" cy="152" r="15" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="85" y1="155" x2="25" y2="175" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="110" cy="152" r="5" fill="#4a7c59"/>
  <line x1="110" y1="152" x2="138" y2="95" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="138" cy="95" r="6" fill="#4a7c59"/>
  <line x1="138" y1="95" x2="148" y2="42" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="150" cy="38" rx="10" ry="6" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <path d="M150,44 Q130,80 115,152" stroke="#4a7c59" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  <path d="M150,44 Q170,80 182,152" stroke="#4a7c59" stroke-width="2" stroke-dasharray="5,3" fill="none"/>
  <circle cx="115" cy="150" r="5" fill="#4a7c59"/>
  <circle cx="182" cy="150" r="5" fill="#4a7c59"/>
  <ellipse cx="124" cy="122" rx="14" ry="28" fill="#e74c3c" opacity="0.2" transform="rotate(-15,124,122)"/>
  <line x1="150" y1="44" x2="150" y2="22" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar14)"/>
  <text x="150" y="15" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">gentle pull</text>
  <text x="152" y="130" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif">hamstring</text>
</svg>`,
      steps: [
        'Lie flat on your back on the floor. Both legs extended straight, lower back relaxed into the floor.',
        'Loop a resistance band around the sole of your right foot, holding an end of the band in each hand.',
        'Keeping the left leg flat on the floor, slowly raise the right leg upward toward the ceiling. Keep the right knee soft — not fully locked out. A very slight bend is important given the suspected proximal hamstring tendinopathy.',
        'Use the band to guide the leg upward but do not yank it — the band is for support and gentle assistance, not aggressive pulling.',
        'Raise the leg until you feel a clear but gentle stretch along the back of the thigh — a 3–4/10 intensity only. This stretch should never be aggressive on the right side.',
        'Hold for 30 seconds. Breathe slowly. On each exhale allow the leg to very slightly rise further if it naturally wants to — do not push it.',
        'Lower the leg slowly back to the floor with control. Switch sides. The left side can be taken slightly deeper.',
        'If you feel a sharp or pulling sensation at the very top of the hamstring near the sitting bone on the right side, reduce the range immediately.'
      ],
      feel: 'You should feel the stretch along the back of the thigh (hamstring muscle belly), not at the sitting bone. A dull pull in the middle of the back of the thigh is correct. Any pain or sharp sensation at the very top of the hamstring near the sitting bone on the right is a warning sign for the proximal hamstring tendinopathy — reduce range immediately and keep the knee softer.',
      prog: {
        ready: 'Stretch intensity has dropped to 2/10 at the same leg height, knee is comfortable slightly soft, no sensation at the sitting bone, and you can breathe fully throughout.',
        next: 'Very gently increase the range by allowing the leg to rise 5–10 degrees higher per session. Keep the knee soft. Only progress once the right side is completely symptom-free.',
        goal: 'Leg raised to 80–90 degrees from the floor (close to vertical) with a soft knee, comfortable stretch in the hamstring belly only, no sitting bone sensation.',
        time: '12–20 weeks for the right side given the proximal hamstring tendinopathy history. Conservative management is critical — never push through sitting bone pain.'
      }
    },

    'mob-w5': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar15" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="178" x2="280" y2="178" stroke="#ccc" stroke-width="1.5"/>
  <ellipse cx="80" cy="160" rx="22" ry="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="80" y1="150" x2="165" y2="128" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="165" cy="128" r="7" fill="#4a7c59"/>
  <line x1="165" y1="128" x2="240" y2="112" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="165" y1="128" x2="265" y2="120" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="242" cy="113" r="5" fill="#4a7c59"/>
  <circle cx="267" cy="121" r="5" fill="#4a7c59"/>
  <circle cx="195" cy="140" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <ellipse cx="115" cy="138" rx="28" ry="14" fill="#e74c3c" opacity="0.22" transform="rotate(-15,115,138)"/>
  <line x1="256" y1="117" x2="274" y2="113" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar15)"/>
  <text x="265" y="104" font-size="9" fill="#e74c3c" font-family="sans-serif">reach</text>
  <text x="105" y="124" font-size="9" fill="#e74c3c" font-family="sans-serif" transform="rotate(-15,105,124)">left lat</text>
</svg>`,
      steps: [
        'Start on hands and knees, then sit your hips back toward your heels as far as they will comfortably go. Arms extended forward on the floor, forehead resting on the floor. This is standard child\'s pose.',
        'From child\'s pose, walk both hands to the right side — shifting the entire arm reach to the right so your body creates a curved shape.',
        'Press your left armpit gently toward the floor. You do not need to get it all the way down — just allow gravity to add gentle downward pressure.',
        'Keep your hips sitting back toward your heels throughout. The temptation is to let the hips shift to the right to reduce the stretch — resist this.',
        'Hold for 30 seconds. Breathe into the left side of your ribcage — try to expand that side on the inhale and feel it lengthen the lat further.',
        'Walk the hands back to centre and then to the left side. Switch sides.'
      ],
      feel: 'You should feel a deep stretch running from the outer armpit down through the side of the torso — this is the latissimus dorsi. Tight lats are extremely common in climbers and directly restrict overhead reach and thoracic mobility. The stretch should feel like a long pull down the side of the torso, not a sharp pain in the shoulder.',
      prog: {
        ready: 'Stretch intensity has dropped to 2/10 with hands walked fully to the side, hips sitting back fully on heels throughout, and you can breathe laterally into the stretched side easily.',
        next: 'Increase hold time to 45 seconds. Add a gentle grip of a stable object to the right side (a table leg) to apply gentle traction and deepen the lat stretch.',
        goal: 'Full lat length — hands walked as far to the side as possible, hips fully back on heels, left armpit dropping toward the floor, breathing fully into the left ribcage without restriction.',
        time: '6–10 weeks for meaningful lat lengthening. Lat tightness in climbers responds well to consistent stretching, especially paired with overhead mobility work.'
      }
    },

    'mob-w6': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar16" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="185" x2="280" y2="185" stroke="#ccc" stroke-width="1.5"/>
  <ellipse cx="152" cy="183" rx="12" ry="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <ellipse cx="168" cy="183" rx="12" ry="5" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <line x1="152" y1="178" x2="148" y2="145" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="168" y1="178" x2="172" y2="145" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="160" cy="143" rx="16" ry="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <path d="M160,133 Q148,95 118,55" stroke="#4a7c59" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="118" cy="55" r="6" fill="#4a7c59"/>
  <circle cx="110" cy="42" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="118" y1="55" x2="88" y2="22" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="86" cy="20" r="5" fill="#4a7c59"/>
  <line x1="160" y1="133" x2="178" y2="150" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="142" cy="95" rx="18" ry="40" fill="#e74c3c" opacity="0.2" transform="rotate(-25,142,95)"/>
  <line x1="86" y1="22" x2="70" y2="14" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar16)"/>
  <text x="100" y="12" font-size="9" fill="#e74c3c" font-family="sans-serif">reach up &amp; over</text>
  <text x="128" y="88" font-size="9" fill="#e74c3c" text-anchor="middle" font-family="sans-serif" transform="rotate(-25,128,88)">lat</text>
</svg>`,
      steps: [
        'Stand upright, feet hip-width apart, core gently engaged so the lower back does not arch.',
        'Raise your right arm straight overhead, bicep close to your ear.',
        'Reach the right arm up as tall as you can first — really lengthen through the right side before you bend. Create as much space as possible between the ribs and the hip before the lateral movement begins.',
        'Keeping the arm long and the ribs lifted, slowly bend your entire torso to the left — carrying the right arm with you in a long arc to the left.',
        'Your left hand rests on your left thigh or hip for light support. Do not lean on it or push with it.',
        'Bend only as far as you can while keeping the right arm close to your ear and the movement coming from the side of the torso, not the lower back.',
        'Hold for 30 seconds. Breathe into the right side of the ribcage, expanding it on each inhale to deepen the stretch.',
        'Return to upright and switch sides.'
      ],
      feel: 'You should feel a long stretch from the outer right hip all the way up through the right side of the torso, under the armpit, and into the lat. This is one of the best standing lat stretches available without equipment. If you feel the stretch mainly in the shoulder rather than the lat, ensure the arm is reaching up and over rather than being pulled across the body.',
      prog: {
        ready: 'Stretch intensity has dropped to 2/10 at a full side bend, you can keep the arm close to your ear throughout, and breathing into the right ribcage is easy without any catching sensation.',
        next: 'At full side bend, try to reach the fingers a few centimetres further toward the floor for 3–5 seconds, then relax back to the hold position.',
        goal: 'Full lateral flexion with the arm close to the ear throughout, torso making a smooth arc from hip to fingertips, no restriction in the lat on either side.',
        time: '4–8 weeks for meaningful improvement. Lateral torso and lat flexibility respond well to daily stretching and can show noticeable change within a few weeks.'
      }
    },

    'mob-w7': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar17" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="80" y1="140" x2="220" y2="140" stroke="#4a7c59" stroke-width="5" stroke-linecap="round"/>
  <rect x="132" y="88" width="28" height="52" rx="8" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="165" cy="55" r="40" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <circle cx="155" cy="48" r="3" fill="#4a7c59"/>
  <circle cx="175" cy="48" r="3" fill="#4a7c59"/>
  <path d="M152,66 Q165,74 178,66" stroke="#4a7c59" stroke-width="2" fill="none"/>
  <ellipse cx="205" cy="55" rx="6" ry="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <ellipse cx="128" cy="88" rx="12" ry="28" fill="#e74c3c" opacity="0.25"/>
  <text x="100" y="82" font-size="9" fill="#e74c3c" text-anchor="end" font-family="sans-serif">upper trap</text>
  <line x1="165" y1="15" x2="192" y2="13" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ar17)"/>
  <text x="165" y="172" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">tilt ear toward shoulder (shoulder stays down)</text>
</svg>`,
      steps: [
        'Sit or stand upright. Shoulders relaxed and level — not hunched up toward the ears. Eyes forward.',
        'Slowly tilt your head to the right — bringing your right ear toward your right shoulder. Do not lift the shoulder to meet the ear. The shoulder stays down.',
        'Move slowly and stop when you feel a gentle stretch along the left side of the neck — the upper trapezius and scalene muscles.',
        'Do not rotate the head — keep the nose pointing straight forward throughout. This is a pure lateral tilt, not a rotation.',
        'Hold for 20 seconds. Breathe slowly. On each exhale allow the head to very slightly increase the tilt if it naturally wants to.',
        'To increase the stretch slightly: let the weight of the right hand rest very gently on the top right side of the head — do not pull, just let the weight add a little gentle traction.',
        'Slowly return the head to upright. Switch sides.'
      ],
      feel: 'You should feel the stretch along the side of the neck that is lengthening — the upper trapezius and scalene muscles. The sensation is a gentle pulling along the side of the neck. Never any pinching or sharp pain on either side. Your assessment showed a 5 cm gap on lateral tilt — expect the stretch to feel more pronounced on one side than the other.',
      prog: {
        ready: 'The lateral tilt gap has reduced to 2–3 cm, stretch intensity has dropped to 2/10 at full range, you can breathe slowly throughout, and the movement feels smooth without any catching.',
        next: 'Increase hold time to 30 seconds. Combine with a gentle chin tuck before the tilt — this pre-lengthens the scalenes and adds an additional element to the stretch.',
        goal: 'Symmetric lateral tilt — ear reaching equally close to each shoulder, with the measured gap on each side being equal and under 2 cm.',
        time: '6–12 weeks to see meaningful reduction in the lateral tilt gap. Neck mobility responds to consistent gentle stretching but should never be forced.'
      }
    },

    'mob-w8': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ar18" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <ellipse cx="150" cy="145" rx="28" ry="35" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <ellipse cx="150" cy="172" rx="80" ry="22" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2" opacity="0.5"/>
  <ellipse cx="175" cy="90" rx="45" ry="52" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <ellipse cx="218" cy="88" rx="7" ry="10" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <circle cx="188" cy="75" r="4" fill="#4a7c59"/>
  <circle cx="200" cy="75" r="4" fill="#4a7c59"/>
  <path d="M150,52 A55,55 0 0,1 220,95" stroke="#e74c3c" stroke-width="2.5" fill="none" marker-end="url(#ar18)"/>
  <ellipse cx="118" cy="112" rx="22" ry="15" fill="#e74c3c" opacity="0.25"/>
  <text x="86" y="108" font-size="9" fill="#e74c3c" text-anchor="end" font-family="sans-serif">posterior neck</text>
  <text x="150" y="190" font-size="9" fill="#6b7280" text-anchor="middle" font-family="sans-serif">top-down view — rotating right</text>
</svg>`,
      steps: [
        'Sit or stand upright. Shoulders level and relaxed, chin parallel to the floor.',
        'Keeping the chin level — not tilting up or down — slowly rotate your head to the right, as if looking over your right shoulder.',
        'Move only as far as is comfortable. Do not force the end range.',
        'Hold for 2–3 seconds at the end of the range.',
        'Slowly return to the centre and rotate to the left.',
        'Keep the movement smooth and controlled throughout — this is not a fast exercise.',
        'Breathe continuously. Exhale as you rotate, inhale as you return to centre.',
        'Complete the prescribed reps on each side. No pain, no pinching, no dizziness. If any of those occur, stop immediately.'
      ],
      feel: 'You should feel gentle movement through the cervical spine and a mild stretch on the opposite side of the neck to whichever direction you are rotating toward. The sensation is a gentle pulling along the back and side of the neck. No sharp pain, no pinching, no dizziness or lightheadedness at any point. If dizziness occurs, stop immediately and consult a medical professional before continuing.',
      prog: {
        ready: 'Rotation is smooth in both directions with no catching, the range of motion feels equal on both sides, and you can complete the reps with relaxed shoulders and steady breathing throughout.',
        next: 'Increase to a 5-second hold at end range each side. Add a gentle chin-tuck variation: from the rotated position, gently tuck the chin slightly to add a flexion element, stretching the posterior cervical muscles more deeply.',
        goal: 'Full symmetric cervical rotation — 70–80 degrees in each direction with a smooth, even arc and no restriction on either side.',
        time: '4–8 weeks for meaningful improvement in cervical rotation. Neck rotation mobility responds relatively well to gentle daily practice.'
      }
    },

    /* ── LOCKED EXERCISES (physio-cleared) ─────────────────────────── */
    'mob-l1': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arl1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <rect x="230" y="10" width="14" height="170" fill="#e0e0e0" stroke="#ccc" stroke-width="1"/>
  <line x1="20" y1="168" x2="244" y2="168" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="110" cy="38" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="110" y1="52" x2="110" y2="92" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="68" x2="85" y2="86" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="68" x2="135" y2="86" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="92" x2="168" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="168" cy="130" r="5" fill="#4a7c59"/>
  <line x1="168" y1="130" x2="230" y2="168" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="110" y1="92" x2="90" y2="136" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="90" cy="136" r="5" fill="#4a7c59"/>
  <line x1="90" y1="136" x2="80" y2="168" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="230" cy="162" rx="8" ry="6" fill="#e74c3c" opacity="0.35"/>
  <line x1="185" y1="128" x2="218" y2="152" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#arl1)"/>
  <text x="155" y="118" font-size="9" fill="#e74c3c" font-family="sans-serif">knee drives to wall</text>
  <text x="30" y="186" font-size="9" fill="#6b7280" font-family="sans-serif">heel stays flat on floor throughout</text>
</svg>`,
      steps: [
        'Stand facing a wall, about 10 cm away from it. Feet hip-width apart, toes pointing forward.',
        'Place your hands on the wall lightly for balance. Both feet flat on the floor, heels down.',
        'Take a small step back so your big toe is roughly 10 cm from the wall.',
        'Slowly drive your front knee forward and toward the wall — keep the knee tracking over the second toe, not collapsing inward.',
        'Try to touch the knee to the wall while keeping the heel fully flat on the floor. Do not let the heel rise.',
        'If the knee touches the wall with the heel flat, move the foot back 1–2 cm and repeat. Find the maximum distance at which you can touch the wall with heel flat.',
        'Complete 10 controlled reps, pressing the knee to the wall and returning. Focus on range of motion, not speed.',
        'Switch feet and repeat on the other side.'
      ],
      feel: 'You should feel a deep stretch through the calf and Achilles tendon as the knee drives forward. The ankle joint is being mobilised under load. With the documented 3 cm bilateral dorsiflexion deficit, you will feel significant restriction — this is exactly the tissue you are targeting. No sharp pain at the ankle joint itself. Mild calf ache is normal and expected.',
      prog: {
        ready: 'You can touch the wall with your knee at 12 cm from the wall with the heel completely flat and no wobble in the ankle, and the stretch sensation has reduced to 2/10.',
        next: 'Increase the foot-to-wall distance by 1 cm increments. Add a pause at end range — hold 2 seconds knee against wall before returning.',
        goal: 'Knee-to-wall distance equal on both sides, minimum 10–12 cm, heel flat throughout. This corresponds to full normalisation of the 3 cm bilateral dorsiflexion deficit.',
        time: '8–12 weeks with daily practice. Ankle dorsiflexion is one of the slower joints to change, but responds well to consistent daily loading at end range.'
      }
    },

    'mob-l2': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arl2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <rect x="90" y="122" width="120" height="18" rx="4" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <rect x="60" y="140" width="180" height="40" fill="#d5e8d4" stroke="#4a7c59" stroke-width="1.5" rx="3"/>
  <circle cx="150" cy="36" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="50" x2="150" y2="90" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="65" x2="120" y2="82" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="65" x2="180" y2="82" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="90" x2="138" y2="120" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="138" y1="120" x2="132" y2="148" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="150" y1="90" x2="162" y2="120" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="162" y1="120" x2="166" y2="122" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="132" cy="152" rx="10" ry="5" fill="#e74c3c" opacity="0.3"/>
  <line x1="132" y1="148" x2="132" y2="163" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#arl2)"/>
  <text x="95" y="180" font-size="9" fill="#e74c3c" font-family="sans-serif">heel drops below step — slow controlled descent</text>
</svg>`,
      steps: [
        'Stand on the edge of a step or a firm raised surface (at least 10 cm high). Position the ball of one foot on the edge — heel hanging off.',
        'Hold a wall or railing lightly for balance. Stand upright with the opposite foot off the step or slightly raised.',
        'Rise up onto the ball of the foot on the step — both calves active for the concentric (up) phase.',
        'Shift weight to the working leg only. Slowly lower your heel below the level of the step over 3–4 seconds. This is the eccentric (lowering) phase — the most important part.',
        'Lower as far as the ankle will comfortably allow. Do not rush the descent.',
        'At the bottom, use both feet to rise back to the top (reduce the load for the concentric phase).',
        'That is one rep. Complete all reps on one side before switching.',
        'Begin with bodyweight only. Progress to holding a light weight only when physio advises.'
      ],
      feel: 'You should feel the calf and Achilles tendon working hard during the slow lowering phase. A deep ache in the calf belly and a stretch through the Achilles at the bottom is expected and correct. This is a loading exercise, not a passive stretch. No sharp pain at the heel, no sharp ankle joint pain. This exercise is specifically for proximal hamstring and Achilles tendon resilience — progress slowly.',
      prog: {
        ready: '3 × 15 reps with a full 3-second lowering phase and no heel pain or tendon soreness lasting more than 24 hours after the session.',
        next: 'Hold a light weight (2–4 kg) in the hand on the working side to increase load. Increase reps before adding load.',
        goal: '3 × 15 eccentric heel drops with a 5-second lowering phase and 6 kg added load, fully pain-free — indicating normalised Achilles tendon load capacity.',
        time: '12 weeks of progressive loading is the minimum for meaningful Achilles tendon adaptation. Tendons adapt slowly — consistency over weeks is more important than intensity.'
      }
    },

    'mob-l3': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arl3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#4a7c59"/></marker></defs>
  <rect x="16" y="10" width="14" height="180" fill="#e0e0e0" stroke="#ccc" stroke-width="1"/>
  <line x1="30" y1="175" x2="284" y2="175" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="150" cy="48" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="62" x2="150" y2="108" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="108" x2="138" y2="172" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="150" y1="108" x2="162" y2="172" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="150" y1="72" x2="30" y2="112" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="150" y1="72" x2="270" y2="112" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="6,4"/>
  <circle cx="30" cy="112" r="6" fill="#4a7c59"/>
  <circle cx="270" cy="112" r="6" fill="#4a7c59" opacity="0.4"/>
  <line x1="270" y1="112" x2="270" y2="58" stroke="#4a7c59" stroke-width="3" stroke-linecap="round" stroke-dasharray="5,4" opacity="0.4"/>
  <circle cx="270" cy="58" r="5" fill="#4a7c59" opacity="0.4"/>
  <line x1="30" y1="112" x2="30" y2="58" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="30" cy="58" r="5" fill="#4a7c59"/>
  <line x1="255" y1="95" x2="265" y2="65" stroke="#4a7c59" stroke-width="2.5" marker-end="url(#arl3)" opacity="0.7"/>
  <text x="155" y="95" font-size="9" fill="#4a7c59" font-family="sans-serif">arms slide up wall</text>
  <text x="50" y="192" font-size="9" fill="#6b7280" font-family="sans-serif">back and arms flat against wall throughout</text>
</svg>`,
      steps: [
        'Stand with your back flat against a wall. Feet 5–10 cm away from the base of the wall. Head, upper back, and tailbone in contact with the wall.',
        'Raise both arms and place them against the wall in a "W" position — elbows at shoulder height, bent at 90 degrees, forearms pointing upward. Wrists and elbows should both be in contact with the wall.',
        'This is your starting position. Check: lower back should not be excessively arched. Gently brace the core to keep the lumbar spine close to the wall.',
        'Slowly slide your arms up the wall — straightening the elbows and reaching overhead into a "Y" position, like a goalpost expanding into a V overhead.',
        'Keep the back of the wrists and elbows in contact with the wall throughout the entire movement. This is the hard part — the thoracic restriction will make this very difficult at first.',
        'Go only as far as you can while keeping contact with the wall. Do not allow the lower back to arch away from the wall.',
        'Slowly return to the "W" starting position. That is one rep.',
        'Breathe continuously. Exhale as you slide the arms up, inhale as you return.'
      ],
      feel: 'You should feel a strong challenge across the posterior shoulders, upper back, and thoracic spine. The thoracic restriction noted in your assessment will make this movement feel very restricted — the arms may not be able to reach fully overhead while staying flat on the wall. This is exactly what you are training. No sharp pain. A dull ache through the posterior shoulder is expected and appropriate.',
      prog: {
        ready: 'Both arms can slide from the W position to full overhead Y with wrists and elbows maintaining wall contact throughout, lower back does not arch away from the wall, and you can complete 10 reps with smooth fluid movement.',
        next: 'Add a 3-second hold at the top of each rep with arms fully overhead. Move feet slightly further from the wall to increase the demand.',
        goal: 'Full wall angel from W to Y and back with every contact point maintained throughout — indicating resolved thoracic mobility restriction and adequate posterior shoulder flexibility.',
        time: '8–12 weeks. Thoracic mobility is one of the slowest regions to change. Consistent daily practice is the only way to make progress.'
      }
    },

    'mob-l4': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arl4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <ellipse cx="150" cy="128" rx="45" ry="16" fill="#d5e8d4" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="20" y1="175" x2="280" y2="175" stroke="#ccc" stroke-width="1.5"/>
  <line x1="60" y1="128" x2="90" y2="128" stroke="#4a7c59" stroke-width="6" stroke-linecap="round"/>
  <line x1="210" y1="128" x2="240" y2="128" stroke="#4a7c59" stroke-width="6" stroke-linecap="round"/>
  <line x1="60" y1="128" x2="60" y2="172" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <line x1="240" y1="128" x2="240" y2="172" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <path d="M90,128 Q150,80 210,128" stroke="#4a7c59" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="150" cy="90" r="5" fill="#e74c3c" opacity="0.6"/>
  <line x1="120" y1="128" x2="90" y2="128" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="90" y1="128" x2="75" y2="112" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="65" cy="100" r="12" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="185" y1="128" x2="218" y2="128" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="218" y1="128" x2="232" y2="110" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="150" cy="105" rx="24" ry="14" fill="#e74c3c" opacity="0.2"/>
  <line x1="150" y1="91" x2="150" y2="77" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#arl4)"/>
  <text x="160" y="73" font-size="9" fill="#e74c3c" font-family="sans-serif">thoracic extends over roller</text>
  <text x="70" y="192" font-size="9" fill="#6b7280" font-family="sans-serif">foam roller under mid-back — not lumbar</text>
</svg>`,
      steps: [
        'Place a foam roller on the floor perpendicular to your body. Sit in front of it with knees bent, feet flat on the floor.',
        'Lean back and position the roller under your mid-back (thoracic spine) — roughly at bra-strap level, between the shoulder blades. The roller should NOT be under your lower back.',
        'Support your head with both hands interlaced behind the neck — do not pull on the neck. Elbows point forward.',
        'Gently allow your upper back to drape over the roller. Let gravity pull the thoracic spine into extension over the roller. Breathe out and allow your body to relax.',
        'Hold the extended position for 5–10 seconds. You may feel gentle clicks or pops — this is normal.',
        'To move to a different thoracic segment: support your weight through your feet and hips, scoot slightly up or down (toward the head or toward the lower back) to reposition the roller at a new vertebral level.',
        'Work your way from the lower thoracic spine (just above the lower back) up toward the upper thoracic (between the shoulder blades). Spend extra time at any segment that feels particularly stiff.',
        'Return to sitting. Total hold time across all segments should equal the target duration.'
      ],
      feel: 'You should feel a mobilising sensation through the mid and upper back — a sense of the spine releasing into extension over the roller. Some gentle clicking is normal and often satisfying. Do not expect this to feel like a painful stretch — it should feel relieving and mobilising. Given the mid-spine clinical findings, avoid aggressive pressure over any segment that produces pain rather than release. The lumbar spine should not be over the roller at any point.',
      prog: {
        ready: 'You can achieve a full thoracic extension range with the roller at each segment without guarding or significant discomfort, and the clicks/pops have reduced (indicating improved mobility).',
        next: 'Add a gentle reaching overhead with both arms while extended over the roller — this adds shoulder flexion and lat stretch on top of the thoracic extension. Progress to a loaded version with a light weight held overhead.',
        goal: 'Full thoracic extension mobility — ability to extend over the roller from T4 to T12 with symmetrical range and no guarding.',
        time: '6–10 weeks for initial improvement in thoracic extension. This is one of the best tools for reversing desk-posture-related thoracic kyphosis.'
      }
    },

    'mob-l5': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arl5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <line x1="20" y1="172" x2="280" y2="172" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="150" cy="46" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="60" x2="150" y2="106" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="106" x2="135" y2="168" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="150" y1="106" x2="165" y2="168" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="150" y1="76" x2="190" y2="88" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="190" y1="88" x2="212" y2="112" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="150" y1="76" x2="106" y2="28" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="106" cy="28" r="5" fill="#4a7c59"/>
  <ellipse cx="106" cy="22" rx="12" ry="7" fill="#e74c3c" opacity="0.3"/>
  <line x1="106" y1="28" x2="106" y2="14" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#arl5)"/>
  <text x="118" y="22" font-size="9" fill="#e74c3c" font-family="sans-serif">left arm reaches end range</text>
  <text x="50" y="190" font-size="9" fill="#6b7280" font-family="sans-serif">left shoulder only — gentle overpressure at end range</text>
</svg>`,
      steps: [
        'Stand upright with a straight spine. Both feet shoulder-width apart and stable.',
        'Raise your left arm straight overhead, reaching as high as you comfortably can.',
        'This is your starting position. The goal is to find the true end range of left shoulder flexion — the point at which the shoulder can go no further overhead.',
        'Using your right hand, gently grasp the left wrist. Apply very gentle downward traction (pulling the arm slightly to feel the shoulder joint) combined with a gentle push to encourage the arm slightly higher into flexion.',
        'The key word is gentle — this is overpressure to find end range, not a forced stretch. You should reach a clear endpoint where the shoulder stops, not pain.',
        'Hold at the end range for 30 seconds. Breathe slowly and allow the shoulder to gradually release into the overhead position.',
        'Ensure the spine stays neutral — do not lean to the side or arch the lower back to achieve apparent range.',
        'Release the overpressure and lower the arm. Rest 30 seconds. Repeat for the prescribed sets.'
      ],
      feel: 'You should feel the shoulder joint at its true end range — a sense of the joint stopping rather than the muscle stretching. Some deep shoulder girdle stretch is expected. This is a post-physio-clearance exercise that addresses the overhead reach restriction diagnosed in your assessment. No sharp pain. No pinching at the front of the shoulder. If either of these occur, stop immediately.',
      prog: {
        ready: 'The left shoulder reaches the same overhead height as the right with no overpressure required, the end range feels soft (muscle) rather than hard (joint), and you can hold 30 seconds with relaxed breathing.',
        next: 'Progress to a standing wall slide — raise the left arm up a wall surface to track the range improvement objectively. Measure the height reached on the wall monthly.',
        goal: 'Full bilateral overhead shoulder flexion — left arm matching the right, approximately 170–180 degrees of shoulder flexion, pain-free at end range.',
        time: '12–16 weeks for meaningful overhead range improvement. Shoulder overhead restriction is one of the more challenging restrictions to reverse — but consistent daily end-range loading is the most effective approach.'
      }
    }

    /* ── Leg flexibility exercises ─────────────────────────────── */
    'mob-leg1': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="180" x2="280" y2="180" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="120" cy="40" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="120" y1="54" x2="120" y2="80" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- standing leg -->
  <line x1="120" y1="80" x2="110" y2="130" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="110" y1="130" x2="110" y2="178" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- bent leg -->
  <line x1="120" y1="80" x2="130" y2="120" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="130" y1="120" x2="125" y2="80" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- hand holding ankle -->
  <line x1="120" y1="65" x2="138" y2="90" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="128" cy="82" r="5" fill="#4a7c59"/>
  <text x="155" y="115" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">Quad</text>
  <text x="155" y="128" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">stretch</text>
  <path d="M150,120 Q135,110 133,95" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#ar-leg)"/>
  <defs><marker id="ar-leg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
</svg>`,
      steps: [
        'Stand tall near a wall for balance. Bend one knee, bringing your heel toward your glutes.',
        'Grasp the ankle with the same-side hand. Keep your knees together.',
        'Tuck your pelvis slightly (posterior pelvic tilt) to increase the stretch through the rectus femoris.',
        'Hold 45 seconds, breathing steadily. Switch sides.',
        'If you cannot reach your ankle, loop a strap or towel around it.',
      ],
      feel: 'A strong pull along the front of the thigh from knee to hip. No knee pain. The stretch should deepen when you tuck the pelvis.',
      prog: {
        ready: 'You can hold for 60 seconds comfortably on both sides with heel touching glutes and knees aligned.',
        next: 'Add a hip flexor bias: lunge position with the back knee on the floor, then pull the ankle back while driving the hip forward.',
        goal: 'Full knee flexion range and symmetrical quad length — both sides reaching 120° passive knee flexion.',
        time: '6–10 weeks of daily work to notice meaningful change in quad flexibility.'
      }
    },

    'mob-leg2': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="175" x2="280" y2="175" stroke="#ccc" stroke-width="1.5"/>
  <!-- person kneeling, one leg to side -->
  <circle cx="150" cy="50" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="64" x2="150" y2="100" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- kneeling leg -->
  <line x1="150" y1="100" x2="160" y2="140" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="160" y1="140" x2="170" y2="172" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- side leg -->
  <line x1="150" y1="100" x2="90" y2="130" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="90" y1="130" x2="72" y2="172" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <defs><marker id="ar-add" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <path d="M115,155 Q100,140 95,128" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#ar-add)"/>
  <text x="185" y="130" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">Adductor</text>
  <text x="185" y="143" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">stretch</text>
</svg>`,
      steps: [
        'Start on all fours. Slide one leg out to the side as far as comfortable, toes pointing out.',
        'Lower your hips toward the floor. Keep the grounded knee over the toes.',
        'Rock gently side to side to find the deepest comfortable position, then hold.',
        'Hold 45 seconds per side. Use hands on the floor for support.',
        'Increase the range gradually over weeks — never force through sharp groin pain.',
      ],
      feel: 'A deep stretch along the inner thigh from groin to knee. No sharp knee pain.',
      prog: {
        ready: 'You can hold 60 seconds per side with the hip dropping close to the floor without discomfort.',
        next: 'Move toward a full side split — measure how far apart your feet are monthly.',
        goal: 'Enough adductor length for comfortable stemming positions and high foot placements on the wall.',
        time: '8–12 weeks to notice meaningful improvement in inner thigh flexibility.'
      }
    },

    'mob-leg3': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="185" x2="280" y2="185" stroke="#ccc" stroke-width="1.5"/>
  <circle cx="80" cy="60" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="80" y1="74" x2="80" y2="105" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- front leg bent -->
  <line x1="80" y1="105" x2="100" y2="145" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="100" y1="145" x2="105" y2="183" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- back leg -->
  <line x1="80" y1="105" x2="55" y2="145" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="55" y1="145" x2="50" y2="183" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- wall/step -->
  <rect x="95" y="155" width="20" height="28" rx="2" fill="#e8f2ec" stroke="#4a7c59" stroke-width="1.5"/>
  <text x="130" y="110" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">Bent knee</text>
  <text x="130" y="123" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">calf stretch</text>
  <defs><marker id="ar-calf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <path d="M125,160 Q115,162 107,165" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#ar-calf)"/>
</svg>`,
      steps: [
        'Stand facing a wall. Place the ball of the foot of the target leg on the wall or a step.',
        'Bend the knee of the target leg, pressing it toward the wall. Keep the heel on the floor.',
        'This bent-knee position specifically targets the soleus (deeper calf muscle).',
        'Hold 45 seconds. You should feel the stretch lower in the calf and above the heel.',
        'Increase the knee bend angle gradually for more stretch over weeks.',
      ],
      feel: 'A deep stretch low in the calf — lower than a straight-leg calf stretch. Some pull toward the Achilles tendon area.',
      prog: {
        ready: 'Knee tracks to the wall with 5+ cm between the toe and wall, heel stays flat, no calf tightness limiting range.',
        next: 'Progress to 3 sets. Add eccentric heel drops (after physio clearance) to complement the passive stretch.',
        goal: 'Symmetrical dorsiflexion — 10+ cm knee-to-wall test on both sides, resolving the 3 cm bilateral deficit.',
        time: '6–8 weeks combined with ankle drills for the dorsiflexion restriction.'
      }
    },

    'mob-leg4': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="180" x2="280" y2="180" stroke="#ccc" stroke-width="1.5"/>
  <!-- seated forward fold -->
  <circle cx="80" cy="80" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <!-- torso leaning forward -->
  <line x1="80" y1="94" x2="80" y2="120" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="80" y1="100" x2="200" y2="130" stroke="#4a7c59" stroke-width="3.5" stroke-linecap="round"/>
  <!-- legs straight -->
  <line x1="80" y1="120" x2="220" y2="125" stroke="#4a7c59" stroke-width="4" stroke-linecap="round"/>
  <circle cx="222" cy="125" r="7" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2"/>
  <!-- arms reaching -->
  <line x1="80" y1="100" x2="200" y2="127" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6,3"/>
  <defs><marker id="ar-ham" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <path d="M160,155 Q170,145 175,133" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#ar-ham)"/>
  <text x="155" y="165" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">Posterior chain stretch</text>
</svg>`,
      steps: [
        'Sit on the floor with both legs straight in front of you (long sit position).',
        'Sit tall, then hinge forward from the hips — not by rounding the spine.',
        'Reach forward toward your feet. Use a strap around your feet if needed.',
        'Hold 45 seconds. Right side: ease in gently — conservative for proximal hamstring tendinopathy.',
        'Focus on feeling the stretch in the belly of the hamstring, not behind the knee.',
      ],
      feel: 'A stretch in the middle of the back of the thigh. Not sharp behind the knee. Not specifically in the sitting bones (stop if so — proximal hamstring tendinopathy warning).',
      prog: {
        ready: 'Both hands reach past the heels with straight legs and a neutral spine, held for 60 seconds.',
        next: 'Progress to single-leg version, holding the raised leg at different angles to vary the neural component.',
        goal: 'Full posterior chain length — hamstrings long enough for comfortable high foot placements and heel hooks.',
        time: '8–12 weeks for meaningful hamstring length gains, particularly on the right side.'
      }
    },

    'mob-leg5': {
      svg: `<svg viewBox="0 0 300 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="185" x2="280" y2="185" stroke="#ccc" stroke-width="1.5"/>
  <!-- frog / wide squat position -->
  <circle cx="150" cy="55" r="14" fill="#e8f2ec" stroke="#4a7c59" stroke-width="2.5"/>
  <line x1="150" y1="69" x2="150" y2="105" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- left leg wide -->
  <line x1="150" y1="105" x2="95" y2="145" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="95" y1="145" x2="88" y2="183" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- right leg wide -->
  <line x1="150" y1="105" x2="205" y2="145" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <line x1="205" y1="145" x2="212" y2="183" stroke="#4a7c59" stroke-width="3" stroke-linecap="round"/>
  <!-- arms support -->
  <line x1="150" y1="88" x2="120" y2="115" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="150" y1="88" x2="180" y2="115" stroke="#4a7c59" stroke-width="2.5" stroke-linecap="round"/>
  <text x="220" y="110" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">Deep</text>
  <text x="220" y="123" fill="#4a7c59" font-size="11" font-family="Inter,sans-serif">frog</text>
  <defs><marker id="ar-frog" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#e74c3c"/></marker></defs>
  <path d="M115,163 Q105,150 97,143" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#ar-frog)"/>
  <path d="M185,163 Q195,150 203,143" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4,3" fill="none" marker-end="url(#ar-frog)"/>
</svg>`,
      steps: [
        'Start on all fours. Walk both knees out to the sides as wide as comfortable.',
        'Lower your forearms to the floor for support. Hips should be in line with or lower than the knees.',
        'Toes can point out or straight back — experiment to find where you feel it most.',
        'Hold for 45 seconds, breathing into the groin stretch. Rock gently forward and back.',
        'Exit by walking the knees back in before attempting to stand.',
      ],
      feel: 'A wide, deep stretch in the inner thighs and groin on both sides simultaneously. Some stretch into the hip flexors. No knee pain.',
      prog: {
        ready: 'You can comfortably hold 60 seconds with forearms on the floor and hips dropping below knee level.',
        next: 'Gradually increase the width of the knees over weeks. Progress toward a full frog position with hips on the floor.',
        goal: 'Wide hip opening range — enough for comfortable stemming, hip turns, and high foot placements in climbing.',
        time: '10–14 weeks for meaningful hip width and groin flexibility improvement.'
      }
    },

  }; /* end MOB_DETAILS */

  function toggleMobDetail(id) {
    const detail = document.getElementById('detail-' + id);
    const btn    = document.querySelector('.mob-how-to-btn[data-for="' + id + '"]');
    if (!detail) return;
    const opening = !detail.classList.contains('open');
    detail.classList.toggle('open');
    if (btn) btn.textContent = opening ? 'How to ↑' : 'How to ↓';
  }

  function buildMobDetailHtml(id, d) {
    const stepsHtml = d.steps.map(function(s){ return '<li>' + s + '</li>'; }).join('');
    const progHtml =
      '<div class="mob-detail-prog-sub">Ready to progress when…</div>' +
      '<p class="mob-detail-prog">' + d.prog.ready + '</p>' +
      '<div class="mob-detail-prog-sub">Next level</div>' +
      '<p class="mob-detail-prog">' + d.prog.next + '</p>' +
      '<div class="mob-detail-prog-sub">End goal</div>' +
      '<p class="mob-detail-prog">' + d.prog.goal + '</p>' +
      '<div class="mob-detail-prog-sub">Timeline</div>' +
      '<p class="mob-detail-prog">' + d.prog.time + '</p>';
    return '<button class="mob-how-to-btn" data-for="' + id + '" onclick="toggleMobDetail(\'' + id + '\')">How to ↓</button>' +
      '<div class="mob-detail" id="detail-' + id + '">' +
        '<div class="mob-detail-inner">' +
          '<div class="mob-detail-body">' +
            '<div class="mob-detail-label">Illustration</div>' +
            d.svg +
            '<div class="mob-detail-label">Step-by-step instructions</div>' +
            '<ul class="mob-detail-steps">' + stepsHtml + '</ul>' +
            '<div class="mob-detail-label">What you should feel</div>' +
            '<p class="mob-detail-feel">' + d.feel + '</p>' +
            '<div class="mob-detail-label">Progression guide</div>' +
            progHtml +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ── Tick state persistence ─────────────────────────────────── */
  function getMobTicks(dateStr) {
    try {
      const d = JSON.parse(localStorage.getItem(KEY_MOB_PROG) || '{}');
      return (d.date === dateStr) ? (d.ticks || {}) : {};
    } catch { return {}; }
  }

  function _persistMobTick(exId, checked, dateStr) {
    try {
      let d = JSON.parse(localStorage.getItem(KEY_MOB_PROG) || '{}');
      if (d.date !== dateStr) d = { date: dateStr, ticks: {} };
      d.ticks[exId] = checked;
      localStorage.setItem(KEY_MOB_PROG, JSON.stringify(d));
    } catch {}
  }

  function _saveMobSessionRecord(dateStr) {
    const sessions = loadSessions(KEY_MOB);
    if (sessions.some(s => s.date === dateStr)) return;
    sessions.push({ date: dateStr, routine: 'Day Programme' });
    localStorage.setItem(KEY_MOB, JSON.stringify(sessions));
  }

  /* Global — called from onclick attributes */
  function toggleMobTick(exId, dateStr) {
    const ticks = getMobTicks(dateStr);
    const nowChecked = !ticks[exId];
    _persistMobTick(exId, nowChecked, dateStr);

    const row = document.querySelector(`.mob-ex-row[data-ex-id="${exId}"]`);
    if (row) {
      const cb = row.querySelector('.mob-checkbox');
      if (nowChecked) { row.classList.add('mob-ex-done');    if (cb) cb.classList.add('checked'); }
      else            { row.classList.remove('mob-ex-done'); if (cb) cb.classList.remove('checked'); }
    }
    updateMobProgress(dateStr);
  }

  function updateMobProgress(dateStr) {
    const ticks = getMobTicks(dateStr);
    const rows  = [...document.querySelectorAll(
      '#mob-daily-list .mob-ex-row:not(.mob-row-locked-new), #mob-deeper-list .mob-ex-row:not(.mob-row-locked-new)'
    )];
    const allIds = rows.map(r => r.dataset.exId).filter(Boolean);
    const done   = allIds.filter(id => ticks[id]).length;
    const total  = allIds.length;

    const textEl = document.getElementById('mob-progress-text');
    const fillEl = document.getElementById('mob-progress-fill');
    if (!textEl || !fillEl || total === 0) return;

    const pct = Math.round((done / total) * 100);
    fillEl.style.width = pct + '%';

    if (done >= total) {
      textEl.innerHTML = 'Session complete &#127881;';
      _saveMobSessionRecord(dateStr);
      renderDashboard();
    } else {
      textEl.textContent = `${done} of ${total} exercises completed today`;
    }
  }

  /* ── Row builders ───────────────────────────────────────────── */
  function buildMobExRowNew(ex, dateStr) {
    const ticks     = getMobTicks(dateStr);
    const checked   = !!ticks[ex.id];
    const doneClass = checked ? ' mob-ex-done' : '';
    const cbClass   = checked ? ' checked' : '';

    const flagHtml = ex.flag ? `
      <span class="mob-flag" onclick="var b=this.nextElementSibling;b.style.display=b.style.display==='block'?'none':'block'">⚑ FLAG</span>
      <div class="mob-flag-body">${ex.flag}</div>` : '';
    const cautionHtml = ex.caution ? `
      <span class="mob-caution" onclick="var b=this.nextElementSibling;b.style.display=b.style.display==='block'?'none':'block'">⚠ CAUTION</span>
      <div class="mob-caution-body">${ex.caution}</div>` : '';

    const detail   = MOB_DETAILS[ex.id];
    let howToHtml = '';
    try { if (detail) howToHtml = buildMobDetailHtml(ex.id, detail); } catch(e) { console.warn('Detail failed for', ex.id, e); }

    return `<div class="mob-ex-row${doneClass}" data-ex-id="${ex.id}">
      <div class="mob-ex-check-new" onclick="toggleMobTick('${ex.id}','${dateStr}')">
        <div class="mob-checkbox${cbClass}"></div>
      </div>
      <div class="mob-ex-body">
        <div class="mob-ex-name">${ex.name}</div>
        <div class="mob-ex-target">${ex.target}</div>
        ${(ex.flag || ex.caution) ? `<div class="mob-ex-icons">${flagHtml}${cautionHtml}</div>` : ''}
        ${howToHtml}
      </div>
    </div>`;
  }

  function buildLockedMobRowNew(ex) {
    const detail    = MOB_DETAILS[ex.id];
    const howToHtml = detail ? buildMobDetailHtml(ex.id, detail) : '';
    return `<div class="mob-ex-row mob-row-locked-new" data-ex-id="${ex.id}">
      <div class="mob-lock-icon-new"><i class="fa-solid fa-lock" style="color:var(--text-sec);font-size:16px"></i></div>
      <div class="mob-ex-body">
        <div class="mob-ex-name">${ex.name}</div>
        <div class="mob-ex-target">${ex.target}</div>
        ${howToHtml}
      </div>
    </div>`;
  }

  /* ── Amber banner ───────────────────────────────────────────── */
  let _mobBannerDismissed = false;

  function checkMobWarningBanner() {
    const banner = document.getElementById('mob-warning-banner');
    if (!banner) return;
    const hr = new Date().getHours();
    if (hr === 23 && !_mobBannerDismissed) {
      banner.style.display = 'flex';
    } else if (hr !== 23) {
      banner.style.display = 'none';
      _mobBannerDismissed = false;
    }
  }

  /* ── Midnight reset ─────────────────────────────────────────── */
  let _mobMidnightTimer = null;

  function scheduleMobMidnightReset() {
    if (_mobMidnightTimer) clearTimeout(_mobMidnightTimer);
    const now      = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 10);
    _mobMidnightTimer = setTimeout(() => {
      _mobBannerDismissed = false;
      const scr = document.getElementById('screen-mobility');
      if (scr && scr.classList.contains('active')) renderMobilityLogger();
      scheduleMobMidnightReset();
    }, midnight.getTime() - now.getTime());
  }

  /* ── Main render ────────────────────────────────────────────── */
  function renderMobilityLogger() {
    const now        = new Date();
    const dateStr    = toDateStr(now);
    const dow        = now.getDay();
    const dayInfo    = MOB_DAY_INFO[dow];

    const nameEl = document.getElementById('mob-day-name');
    const typeEl = document.getElementById('mob-day-type');
    const ratiEl = document.getElementById('mob-day-rationale');
    if (nameEl) nameEl.textContent = dayInfo.name;
    if (typeEl) typeEl.textContent = `${dayInfo.type} · ~30 min`;
    if (ratiEl) ratiEl.textContent = dayInfo.rationale;

    checkMobWarningBanner();

    function safeRow(ex) {
      try { return buildMobExRowNew(ex, dateStr); }
      catch(e) { console.warn('Exercise render failed:', ex.id, e); return ''; }
    }

    // 4 essentials always shown
    const dailyEl = document.getElementById('mob-daily-list');
    if (dailyEl) dailyEl.innerHTML = MOB_ESSENTIALS.map(safeRow).join('');

    // 6 from pool, seeded by date for variety
    const seed      = _dateSeed(dateStr);
    const shuffled  = _seededShuffle(MOB_POOL, seed);
    const poolPicks = shuffled.slice(0, 6);

    const lockedExs = MOB_LOCKED_DEEPER[dow] || [];
    let deeperHtml  = poolPicks.map(safeRow).join('');
    if (lockedExs.length) {
      deeperHtml += lockedExs.map(safeRow).join('');
    }
    const deeperEl = document.getElementById('mob-deeper-list');
    if (deeperEl) deeperEl.innerHTML = deeperHtml;

    updateMobProgress(dateStr);
    scheduleMobMidnightReset();

    const dismissBtn = document.getElementById('mob-banner-dismiss');
    if (dismissBtn && !dismissBtn._bound) {
      dismissBtn._bound = true;
      dismissBtn.addEventListener('click', () => {
        _mobBannerDismissed = true;
        document.getElementById('mob-warning-banner').style.display = 'none';
      });
    }
  }

