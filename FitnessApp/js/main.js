  /* ─── DASHBOARD RENDER ──────────────────────────────────────────── */
  function renderDashboard() {
    const settings = loadSettings();
    const today    = new Date();
    const todayStr = toDateStr(today);

    const firstName  = (settings.athleteName || 'Darragh Fallon').split(' ')[0];
    const hr         = today.getHours();
    const salutation = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
    document.getElementById('dash-greeting-text').textContent = `${salutation}, ${firstName}`;

    const blockName = settings.block || getAutoBlock(todayStr);
    const dayType   = getDayType(blockName, today);
    const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    document.getElementById('hero-date').textContent  = `${DAYS[today.getDay()]}, ${today.getDate()} ${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
    document.getElementById('hero-block').textContent = `${blockName} — ${dayType}`;
    const daysLeft = Math.max(0, Math.ceil((new Date('2026-09-10T23:59:59') - today) / 86400000));
    document.getElementById('hero-countdown').textContent = `${daysLeft} day${daysLeft !== 1 ? 's' : ''} until 10 Sept 2026`;

    const gymSessions = loadSessions(KEY_GYM);
    const mobSessions = loadSessions(KEY_MOB);
    document.getElementById('gym-streak').textContent = `🔥 ${calcStreak(gymSessions)} gym`;
    document.getElementById('mob-streak').textContent = `🔥 ${calcStreak(mobSessions)} mobility`;

    const gymDoneToday = gymSessions.some(s => s.date === todayStr);
    const mobDoneToday = mobSessions.some(s => s.date === todayStr);
    const ctaGym = document.querySelector('.cta-gym');
    const ctaMob = document.querySelector('.cta-mobility');
    if (ctaGym) {
      if (gymDoneToday) {
        ctaGym.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Gym Complete</span>';
        ctaGym.classList.add('cta-done');
        ctaGym.onclick = null;
      } else {
        ctaGym.innerHTML = '<i class="fa-solid fa-dumbbell"></i><span>Log Gym Session</span>';
        ctaGym.classList.remove('cta-done');
        ctaGym.onclick = () => navigateTo('screen-gym');
      }
    }
    if (ctaMob) {
      if (mobDoneToday) {
        ctaMob.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Mobility Complete</span>';
        ctaMob.classList.add('cta-done');
        ctaMob.onclick = null;
      } else {
        ctaMob.innerHTML = '<i class="fa-solid fa-person-running"></i><span>Log Mobility</span>';
        ctaMob.classList.remove('cta-done');
        ctaMob.onclick = () => navigateTo('screen-mobility');
      }
    }

    const rehabSessions  = loadSessions(KEY_REHAB);
    const rehabDoneToday = rehabSessions.some(s => s.date === todayStr);
    const ctaRehab = document.querySelector('.cta-rehab');
    if (ctaRehab) {
      if (rehabDoneToday) {
        ctaRehab.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Rehab Done</span>';
        ctaRehab.classList.add('cta-done');
        ctaRehab.onclick = null;
      } else {
        ctaRehab.innerHTML = '<i class="fa-solid fa-person-walking"></i><span>Daily Rehab</span>';
        ctaRehab.classList.remove('cta-done');
        ctaRehab.onclick = () => navigateTo('screen-rehab');
      }
    }

    const lastGym = gymSessions.length ? gymSessions[gymSessions.length - 1] : null;
    const lastMob = mobSessions.length ? mobSessions[mobSessions.length - 1] : null;

    const gymEl = document.getElementById('last-gym-value');
    const mobEl = document.getElementById('last-mob-value');
    gymEl.innerHTML = lastGym
      ? `<div class="session-val">${formatDisplayDate(lastGym.date)}</div><div class="session-sub">${lastGym.dayType || '—'}</div>`
      : `<div class="session-val" style="color:var(--text-sec)">No sessions yet</div>`;
    mobEl.innerHTML = lastMob
      ? `<div class="session-val">${formatDisplayDate(lastMob.date)}</div><div class="session-sub">${lastMob.routine || 'General'}</div>`
      : `<div class="session-val" style="color:var(--text-sec)">No sessions yet</div>`;

    const alerts = (lastGym && lastGym.progressionAlerts) ? lastGym.progressionAlerts : [];
    const alertsSection = document.getElementById('overload-section');
    const alertsList    = document.getElementById('overload-list');
    if (alerts.length) {
      alertsSection.style.display = 'block';
      alertsList.innerHTML = alerts.map(a => `
        <div class="overload-alert">
          <i class="fa-solid fa-arrow-trend-up"></i>
          <div>
            <div class="overload-exname">${a.exercise}</div>
            <div class="overload-cta">↑ Ready to add load — suggested: ${a.suggestedWeight}kg next session</div>
          </div>
        </div>`).join('');
    } else {
      alertsSection.style.display = 'none';
    }
  }

  /* ─── SETTINGS RENDER ───────────────────────────────────────────── */
  function renderSettings() {
    const s = loadSettings();
    document.getElementById('sett-name').value        = s.athleteName;
    document.getElementById('sett-report-date').value = s.lastReportDate || '';
  }

  /* ─── SETTINGS LISTENERS ────────────────────────────────────────── */
  function initSettings() {
    document.getElementById('sett-name').addEventListener('input', e => {
      saveSettings({ athleteName: e.target.value });
      renderDashboard();
    });

    document.getElementById('sett-report-date').addEventListener('change', e => {
      saveSettings({ lastReportDate: e.target.value });
    });

    document.getElementById('btn-export').addEventListener('click', () => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('tt_')) {
          try { data[k] = JSON.parse(localStorage.getItem(k)); }
          catch { data[k] = localStorage.getItem(k); }
        }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement('a'), { href: url, download: `training-data-${toDateStr(new Date())}.json` });
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('sett-import').addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          Object.entries(data).forEach(([k, v]) => {
            localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
          });
          renderSettings();
          renderDashboard();
          alert('Data imported successfully.');
        } catch { alert('Invalid JSON file — please check and try again.'); }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

  }

  /* ─── INIT ──────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        navigateTo(tab.dataset.target);
        if (tab.dataset.target === 'screen-home')     renderDashboard();
        if (tab.dataset.target === 'screen-settings') renderSettings();
      });
    });
    initSettings();
    initGymLogger();

    // Progress HR button
    document.getElementById('btn-log-hr').addEventListener('click', () => {
      const val = parseFloat(document.getElementById('hr-input').value);
      if (isNaN(val) || val < 30 || val > 200) { alert('Please enter a valid HR (30–200 bpm)'); return; }
      saveHrEntry(val);
    });

    renderDashboard();
    renderMobilityLogger();
    renderRehabLogger();
  });
