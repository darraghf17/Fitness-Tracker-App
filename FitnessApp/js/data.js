  /* ─── BLOCK DATA ──────────────────────────────────────────────── */
  const BLOCK_SCHEDULES = {
    'Block 1':  { Mon:'Upper A', Tue:'Engine + Lower', Wed:'Upper B', Thu:'Engine + Prehab', Fri:'Upper C', Sat:'Rest', Sun:'Rest' },
    'Block 2A': { Mon:'Upper A', Tue:'Lower',          Wed:'Upper B', Thu:'Engine + Prehab', Fri:'Upper C', Sat:'Rest', Sun:'Rest' },
    'Block 2B': { Mon:'Upper A', Tue:'Engine + Lower', Wed:'Upper B', Thu:'Engine + Prehab', Fri:'Upper C', Sat:'Rest', Sun:'Rest' },
    'Block 3':  { Mon:'Upper A', Tue:'Lower',          Wed:'Upper B', Thu:'Engine + Prehab + Climbing', Fri:'Upper C + Climbing', Sat:'Rest', Sun:'Rest' },
  };

  const BLOCK_AUTO_RANGES = [
    { name:'Block 1',  from:'2026-05-30', to:'2026-06-08' },
    { name:'Block 2A', from:'2026-06-09', to:'2026-07-26' },
    { name:'Block 3',  from:'2026-07-27', to:'2026-09-10' },
  ];

  const PROGRAMME_RATIONALE = {
    'Block 1':  'Block 1 (30 May – 8 June) is your re-introduction phase. Volume is moderate and technique is the priority. All three upper-body days give you frequency to re-groove movement patterns after your break. Engine + Lower on Tuesday maintains conditioning without overloading the lower body. Target 70–80% perceived effort throughout.',
    'Block 2A': 'Block 2A (9 June – 26 July) removes the Engine component from Tuesday to reduce fatigue accumulation as volume ramps. Focus on progressive overload across the main compound lifts, targeting 2–3 sets within your rep range before stepping load.',
    'Block 2B': 'Block 2B (9 June – 26 July) maintains the full Engine + Lower structure from Block 1 with a higher intensity target. Emphasis on consistent form under fatigue, particularly on lower body movements.',
    'Block 3':  'Block 3 (27 July – 10 Sept) integrates climbing-specific preparation into the programme. Thursday and Friday sessions include rotator cuff, antagonist balance, and grip/finger prehab work. Volume tapers in the final two weeks as you approach the 10 September target date.',
  };

  /* ─── STORAGE KEYS ──────────────────────────────────────────────── */
  /* Canonical definitions live in store.js (KEYS). These aliases are kept
     so existing references keep working; they point at the single source. */
  const KEY_SETTINGS = KEYS.settings;
  const KEY_GYM      = KEYS.gym;
  const KEY_MOB      = KEYS.mob;
  const KEY_REHAB    = KEYS.rehab;

  /* ─── SETTINGS ──────────────────────────────────────────────────── */
  const SETTING_DEFAULTS = {
    athleteName: 'Darragh Fallon',
    block: '',
    blockStartDate: '',
    lastReportDate: '',
  };
