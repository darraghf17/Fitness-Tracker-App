
  /* ─── DAILY REHAB DATA ───────────────────────────────────────────── */
  const KEY_REHAB_PROG = KEYS.rehabProg;

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

  /* ─── CHECKLIST ENGINE WIRING ────────────────────────────────────── */
  const _rehabChecklist = createChecklist({
    progKey:        KEY_REHAB_PROG,
    sessionKey:     KEY_REHAB,
    sessionRecord:  dateStr => ({ date: dateStr }),
    getItemIds:     () => REHAB_EXERCISES.map(e => e.id),
    rowSelector:    id => `[data-rehab-id="${id}"]`,
    doneClass:      'rehab-ex-done',
    progressTextId: 'rehab-progress-text',
    progressFillId: 'rehab-progress-fill',
    formatProgress: (done, total) => `${done} of ${total} completed`,
  });

  // Global wrappers — referenced from row onclick / builders.
  function getRehabTicks(dateStr)      { return _rehabChecklist.getTicks(dateStr); }
  function toggleRehabTick(exId, date) { _rehabChecklist.toggle(exId, date); }
  function updateRehabProgress(date)   { _rehabChecklist.updateProgress(date); }

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
    const list = document.getElementById('rehab-exercise-list');
    if (list) {
      list.innerHTML = REHAB_EXERCISES.map(ex => buildRehabExRow(ex, dateStr)).join('');
    }
    updateRehabProgress(dateStr);
  }
