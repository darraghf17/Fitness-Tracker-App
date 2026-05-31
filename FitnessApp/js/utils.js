
  function loadSettings() {
    try { return { ...SETTING_DEFAULTS, ...JSON.parse(localStorage.getItem(KEY_SETTINGS) || '{}') }; }
    catch { return { ...SETTING_DEFAULTS }; }
  }

  function saveSettings(patch) {
    const updated = { ...loadSettings(), ...patch };
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(updated));
    return updated;
  }

  /* ─── SESSION DATA ──────────────────────────────────────────────── */
  function loadSessions(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  }

  /* ─── HELPERS ───────────────────────────────────────────────────── */
  function toDateStr(d) { return d.toISOString().slice(0, 10); }

  function getAutoBlock(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    for (const b of BLOCK_AUTO_RANGES) {
      if (d >= new Date(b.from + 'T00:00:00') && d <= new Date(b.to + 'T23:59:59')) return b.name;
    }
    return 'Block 1';
  }

  function getDayType(blockName, date) {
    const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const schedule = BLOCK_SCHEDULES[blockName] || BLOCK_SCHEDULES['Block 1'];
    return schedule[DAY[date.getDay()]] || 'Rest';
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    const D = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${D[d.getDay()]} ${d.getDate()} ${M[d.getMonth()]}`;
  }

  function calcStreak(sessions) {
    if (!sessions.length) return 0;
    const uniqueDates = [...new Set(sessions.map(s => s.date).filter(Boolean))].sort().reverse();
    if (!uniqueDates.length) return 0;
    const today     = toDateStr(new Date());
    const yesterday = toDateStr(new Date(Date.now() - 86400000));
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;
    let cursor = new Date(uniqueDates[0] + 'T00:00:00');
    let streak = 0;
    for (const d of uniqueDates) {
      if (d === toDateStr(cursor)) { streak++; cursor = new Date(cursor.getTime() - 86400000); }
      else break;
    }
    return streak;
  }

  /* ─── NAVIGATION ────────────────────────────────────────────────── */
  function navigateTo(screenId) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const tab = document.querySelector(`.nav-tab[data-target="${screenId}"]`);
    if (tab) tab.classList.add('active');
    const scr = document.getElementById(screenId);
    if (scr) scr.classList.add('active');
    if (screenId === 'screen-gym')      renderGymLogger();
    if (screenId === 'screen-mobility') renderMobilityLogger();
    if (screenId === 'screen-progress') renderProgress();
    if (screenId === 'screen-overload') renderOverload();
    if (screenId === 'screen-calendar') renderCalendar();
  }

