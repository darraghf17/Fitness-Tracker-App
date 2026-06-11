
  /* ─── DAILY REHAB DATA ───────────────────────────────────────────── */
  const KEY_REHAB_PROG = 'tt_rehab_prog';

  const REHAB_EXERCISES = [
    {
      id: 'rh-1',
      name: 'SL eccentric gastrocnemius (floor)',
      equipment: 'Chair',
      sets: 3,
      reps: 20,
      rest: '30s',
      sides: 'both',
      instructions: 'Stand with both legs straight at hip-width apart. Rise up onto your toes, keeping your legs straight, and transfer your weight onto your affected leg. Control the movement back down to the start position, and repeat, ensuring you rise up on both legs.'
    },
    {
      id: 'rh-2',
      name: 'SL star excursion (8 points)',
      equipment: 'Cones',
      sets: 3,
      reps: 20,
      rest: '30s',
      sides: 'affected',
      instructions: 'Stand up straight on your affected leg. Place targets around you on the floor at 8 different points like a star. Balance on your affected leg while trying to slowly touch your elevated foot to each target. Ensure you keep good control in your stance leg with your knee travelling directly forwards over your toes, rather than inwards.'
    },
    {
      id: 'rh-3',
      name: 'Resisted ankle eversion (long sitting)',
      equipment: 'Mat + resistance band',
      sets: 3,
      reps: 20,
      rest: '30s',
      sides: 'single',
      instructions: 'Sit with your legs straight. Place a resistance band around each foot, close to your toes. Make sure your legs are spread apart so there is tension in the band. Use one foot as an anchor as you turn the other foot outwards, away from your body.'
    }
  ];

  /* ─── STORAGE HELPERS ────────────────────────────────────────────── */
  function getRehabTicks(dateStr) {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY_REHAB_PROG) || '{}');
      if (stored.date === dateStr) return stored.ticks || {};
    } catch {}
    return {};
  }

  function _persistRehabTick(exId, checked, dateStr) {
    const ticks = getRehabTicks(dateStr);
    ticks[exId] = checked;
    localStorage.setItem(KEY_REHAB_PROG, JSON.stringify({ date: dateStr, ticks }));
  }

  function _saveRehabSessionRecord(dateStr) {
    const sessions = loadSessions(KEY_REHAB);
    if (!sessions.some(s => s.date === dateStr)) {
      sessions.push({ date: dateStr });
      localStorage.setItem(KEY_REHAB, JSON.stringify(sessions));
    }
  }

  /* ─── STATE UPDATES ──────────────────────────────────────────────── */
  function toggleRehabTick(exId, dateStr) {
    const ticks = getRehabTicks(dateStr);
    _persistRehabTick(exId, !ticks[exId], dateStr);
    updateRehabProgress(dateStr);

    const row = document.querySelector(`[data-rehab-id="${exId}"]`);
    if (row) {
      const checked = !ticks[exId];
      const cb = row.querySelector('.mob-checkbox');
      if (cb) cb.classList.toggle('checked', checked);
      row.classList.toggle('rehab-ex-done', checked);
    }
  }

  function updateRehabProgress(dateStr) {
    const ticks = getRehabTicks(dateStr);
    const done  = REHAB_EXERCISES.filter(e => ticks[e.id]).length;
    const total = REHAB_EXERCISES.length;

    const textEl = document.getElementById('rehab-progress-text');
    const fillEl = document.getElementById('rehab-progress-fill');
    if (textEl) textEl.textContent = `${done} of ${total} completed`;
    if (fillEl) fillEl.style.width = `${Math.round((done / total) * 100)}%`;

    if (done === total) {
      _saveRehabSessionRecord(dateStr);
      renderDashboard();
    }
  }

  /* ─── ROW BUILDER ────────────────────────────────────────────────── */
  function buildRehabExRow(ex, dateStr) {
    const ticks   = getRehabTicks(dateStr);
    const checked = !!ticks[ex.id];
    const doneClass = checked ? ' rehab-ex-done' : '';
    const cbClass   = checked ? ' checked' : '';

    const sidesLabel = ex.sides === 'both'     ? 'Both sides'
                     : ex.sides === 'affected' ? 'Affected leg'
                     : 'Single side';

    return `
      <div class="mob-ex-row${doneClass}" data-rehab-id="${ex.id}">
        <div class="mob-ex-check-new" onclick="toggleRehabTick('${ex.id}','${dateStr}')">
          <div class="mob-checkbox${cbClass}"></div>
        </div>
        <div class="mob-ex-body">
          <div class="mob-ex-name">${ex.name}</div>
          <div class="rehab-ex-meta">${ex.sets} × ${ex.reps} reps · Rest ${ex.rest}</div>
          <div class="mob-ex-icons">
            <span class="rehab-equip-badge"><i class="fa-solid fa-box-open"></i> ${ex.equipment}</span>
            <span class="rehab-sides-badge">${sidesLabel}</span>
          </div>
          <div class="rehab-how-wrap" id="rehab-how-wrap-${ex.id}">
            <div class="rehab-how-body">
              <p class="rehab-how-text">${ex.instructions}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ─── MAIN RENDER ────────────────────────────────────────────────── */
  function renderRehabLogger() {
    const dateStr = toDateStr(new Date());
    const ticks   = getRehabTicks(dateStr);
    const done    = REHAB_EXERCISES.filter(e => ticks[e.id]).length;
    const total   = REHAB_EXERCISES.length;

    const textEl = document.getElementById('rehab-progress-text');
    const fillEl = document.getElementById('rehab-progress-fill');
    if (textEl) textEl.textContent = `${done} of ${total} completed`;
    if (fillEl) fillEl.style.width = `${Math.round((done / total) * 100)}%`;

    const list = document.getElementById('rehab-exercise-list');
    if (list) {
      list.innerHTML = REHAB_EXERCISES.map(ex => buildRehabExRow(ex, dateStr)).join('');
    }
  }
