  /* ═══════════════════════════════════════════════════════════════════
     CHECKLIST ENGINE

     Mobility and rehab are the same flow: tick off today's items, drive a
     progress bar, and record a session once everything is done. This factory
     holds that shared logic once; each screen supplies a small config for the
     bits that differ (which items count today, the DOM ids/classes, the copy).

     Loaded before mobility.js / rehab.js so createChecklist is in scope.
  ═══════════════════════════════════════════════════════════════════ */

  /* cfg = {
       progKey,                       // localStorage key for today's ticks
       sessionKey,                    // localStorage key for the sessions array
       sessionRecord(dateStr) -> obj, // record pushed when the day is complete
       getItemIds() -> [id],          // the tickable items that count today
       rowSelector(id) -> string,     // CSS selector for an item's row
       doneClass,                     // class toggled on a completed row
       progressTextId, progressFillId,
       completeText,                  // shown when 100% (optional)
       formatProgress(done,total) -> string,
     } */
  function createChecklist(cfg) {
    function getTicks(dateStr) {
      const d = readJSON(cfg.progKey, {});
      return d.date === dateStr ? (d.ticks || {}) : {};
    }

    function persistTick(exId, checked, dateStr) {
      let d = readJSON(cfg.progKey, {});
      if (d.date !== dateStr) d = { date: dateStr, ticks: {} };
      d.ticks[exId] = checked;
      writeJSON(cfg.progKey, d);
    }

    function saveRecord(dateStr) {
      const sessions = loadSessions(cfg.sessionKey);
      if (sessions.some(s => s.date === dateStr)) return;
      sessions.push(cfg.sessionRecord(dateStr));
      writeJSON(cfg.sessionKey, sessions);
    }

    function updateProgress(dateStr) {
      const ticks = getTicks(dateStr);
      const ids   = cfg.getItemIds();
      const done  = ids.filter(id => ticks[id]).length;
      const total = ids.length;

      const textEl = document.getElementById(cfg.progressTextId);
      const fillEl = document.getElementById(cfg.progressFillId);
      if (!textEl || !fillEl || total === 0) return;

      fillEl.style.width = Math.round((done / total) * 100) + '%';
      if (done >= total) {
        textEl.innerHTML = cfg.completeText || cfg.formatProgress(done, total);
        saveRecord(dateStr);
        renderDashboard();
      } else {
        textEl.textContent = cfg.formatProgress(done, total);
      }
    }

    function toggle(exId, dateStr) {
      const nowChecked = !getTicks(dateStr)[exId];
      persistTick(exId, nowChecked, dateStr);

      const row = document.querySelector(cfg.rowSelector(exId));
      if (row) {
        const cb = row.querySelector('.mob-checkbox');
        row.classList.toggle(cfg.doneClass, nowChecked);
        if (cb) cb.classList.toggle('checked', nowChecked);
      }
      updateProgress(dateStr);
    }

    return { getTicks, persistTick, saveRecord, updateProgress, toggle };
  }
