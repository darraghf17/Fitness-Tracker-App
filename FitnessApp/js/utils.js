
  function loadSettings() {
    return { ...SETTING_DEFAULTS, ...readJSON(KEY_SETTINGS, {}) };
  }

  function saveSettings(patch) {
    const updated = { ...loadSettings(), ...patch };
    writeJSON(KEY_SETTINGS, updated);
    return updated;
  }

  /* ─── SESSION DATA ──────────────────────────────────────────────── */
  function loadSessions(key) {
    return readJSON(key, []);
  }

  /* ─── HELPERS ───────────────────────────────────────────────────── */
  function toDateStr(d) {
    // Local date (not UTC) — avoids the day rolling early in timezones ahead of UTC
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

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
  // Several screens share one bottom-nav tab (Recovery groups mobility+rehab;
  // Insights groups progress+overload+report; settings keeps Home lit). This
  // maps a screen to the tab that should highlight while it's open.
  const NAV_GROUP = {
    'screen-home':     'screen-home',
    'screen-gym':      'screen-gym',
    'screen-mobility': 'screen-mobility',
    'screen-rehab':    'screen-mobility',
    'screen-progress': 'screen-progress',
    'screen-overload': 'screen-progress',
    'screen-report':   'screen-progress',
    'screen-calendar': 'screen-calendar',
    'screen-settings': 'screen-home',
  };

  function navigateTo(screenId) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const tab = document.querySelector(`.nav-tab[data-target="${NAV_GROUP[screenId] || screenId}"]`);
    if (tab) tab.classList.add('active');
    const scr = document.getElementById(screenId);
    if (scr) scr.classList.add('active');
    window.scrollTo(0, 0);
    if (screenId === 'screen-home')     renderDashboard();
    if (screenId === 'screen-gym')      renderGymLogger();
    if (screenId === 'screen-mobility') renderMobilityLogger();
    if (screenId === 'screen-rehab')    renderRehabLogger();
    if (screenId === 'screen-progress') renderProgress();
    if (screenId === 'screen-overload') renderOverload();
    if (screenId === 'screen-report')   renderReport();
    if (screenId === 'screen-settings') renderSettings();
    if (screenId === 'screen-calendar') renderCalendar();
  }

