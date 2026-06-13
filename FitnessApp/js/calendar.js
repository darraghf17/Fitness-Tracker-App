  /* ═══════════════════════════════════════════════════════════════════
     CALENDAR
  ═══════════════════════════════════════════════════════════════════ */
  const CAL_START = '2026-05-30';
  const CAL_END   = '2026-09-10';
  const _CMNS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const _CDNS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function calBlock(dateStr, sett) {
    return sett.block || getAutoBlock(dateStr);
  }

  function calDayType(dateStr, sett) {
    const d   = new Date(dateStr + 'T00:00:00');
    const blk = calBlock(dateStr, sett);
    const DAY = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const dn  = DAY[d.getDay()];
    return (BLOCK_SCHEDULES[blk] || BLOCK_SCHEDULES['Block 1'])[dn] || 'Rest';
  }

  function calExercises(dayType) {
    if (GYM_EXERCISES[dayType])                  return GYM_EXERCISES[dayType];
    if (dayType === 'Lower')                     return GYM_EXERCISES['Engine + Lower'].filter(e => e.type !== 'zone2');
    if (dayType === 'Engine + Prehab + Climbing') return GYM_EXERCISES['Engine + Prehab'];
    if (dayType === 'Upper C + Climbing')        return GYM_EXERCISES['Upper C'];
    return [];
  }

  function calPill(dayType) {
    if (dayType === 'Rest')
      return '<span class="cal-session-pill pill-rest">Rest</span>';
    if (dayType === 'Lower')
      return '<span class="cal-session-pill pill-lower">Lower</span>';
    if (dayType.startsWith('Upper'))
      return `<span class="cal-session-pill pill-upper">${dayType.replace(' + Climbing','')}</span>`;
    if (dayType.startsWith('Engine'))
      return `<span class="cal-session-pill pill-engine">${dayType.includes('Lower') ? 'Engine + Lower' : 'Engine + Prehab'}</span>`;
    return `<span class="cal-session-pill pill-rest">${dayType}</span>`;
  }

  function calBuildCard(dateStr, sett, todayStr, loggedSet) {
    const d       = new Date(dateStr + 'T00:00:00');
    const dayType = calDayType(dateStr, sett);
    const isToday = dateStr === todayStr;
    const isPast  = dateStr < todayStr;
    const dateLabel = `${_CDNS[d.getDay()]} ${d.getDate()} ${_CMNS[d.getMonth()]}`;
    const isGymDay  = dayType !== 'Rest';

    let statusBadge = '';
    if (isPast && isGymDay) {
      statusBadge = loggedSet.has(dateStr)
        ? '<span class="cal-logged-badge">✓ Logged</span>'
        : '<span class="cal-missed-badge">○ Missed</span>';
    }

    const todayPill = isToday ? '<span class="cal-today-pill">Today</span>' : '';
    const cls = 'cal-day-card' + (isToday ? ' today' : isPast ? ' past' : ' future');

    let body = '';
    if (dayType === 'Rest') {
      body = '<div class="cal-rest-text">Rest day — prioritise sleep, nutrition, and the daily mobility routine.</div>';
    } else {
      const blk = calBlock(dateStr, sett);
      body = `<div class="cal-ex-ph" data-date="${dateStr}" data-daytype="${dayType}" data-block="${blk}" data-past="${isPast}" data-loaded="false"></div>`;
    }

    return `<div class="${cls}" id="cal-card-${dateStr}">
      <div class="cal-card-header">
        <span class="cal-date-label">${dateLabel}</span>
        <div class="cal-badge-row">${todayPill}${calPill(dayType)}${statusBadge}</div>
      </div>
      <div class="cal-divider"></div>
      ${body}
    </div>`;
  }

  function calFillExList(ph) {
    const dayType = ph.dataset.daytype;
    const block   = ph.dataset.block;
    const isPast  = ph.dataset.past === 'true';
    const exercises = calExercises(dayType);
    const hasZ2   = ['Engine + Lower','Engine + Prehab','Engine + Prehab + Climbing'].includes(dayType);
    const z2mins  = (block === 'Block 3') ? 45 : 35;
    const isClimb = dayType.includes('Climbing');

    let h = '';
    if (hasZ2) {
      h += `<div class="cal-zone2-block">
        <div class="cal-z2-label">🚴 Zone 2 Cardio</div>
        <div class="cal-z2-detail">${z2mins} min · HR 119–139 bpm · Bike or Ski Erg</div>
      </div>`;
    }
    if (isClimb) {
      h += '<div class="cal-b3-note">Block 3 — Climbing prep active</div>';
    }

    const exList = exercises.filter(e => e.type !== 'zone2');
    if (exList.length) {
      h += '<div class="cal-ex-list">';
      exList.forEach(ex => {
        let detail;
        if (ex.type === 'timed') {
          detail = `${ex.sets} × max · BW`;
        } else {
          const rr = ex.repRange ? `${ex.repRange[0]}–${ex.repRange[1]}` : '—';
          const w  = ex.weight === 'BW' ? 'BW' : `${ex.weight}kg`;
          detail = `${ex.sets} × ${rr} · ${w}`;
        }
        const staple  = ex.staple  ? ' <span class="cal-ex-staple">⭐ STAPLE</span>' : '';
        const caution = ex.caution ? ' <span title="Caution">⚠️</span>' : '';
        const rowCls  = isPast ? 'cal-ex-row past-row' : 'cal-ex-row';
        h += `<div class="${rowCls}"><span class="cal-ex-name">${ex.name}</span><span class="cal-ex-detail"> · ${detail}</span>${staple}${caution}</div>`;
      });
      h += '</div>';
    }
    h += '<div class="cal-mob-note">+ Daily mobility routine (20–30 min, at home)</div>';

    ph.innerHTML = h;
    ph.dataset.loaded = 'true';
  }

  let _calObs = null;

  function renderCalendar() {
    const list    = document.getElementById('cal-list');
    if (!list) return;
    const sett    = loadSettings();
    const today   = toDateStr(new Date());
    const logged  = new Set(loadSessions(KEY_GYM).map(s => s.date));

    const progStart = new Date(CAL_START + 'T00:00:00');
    const progEnd   = new Date(CAL_END   + 'T00:00:00');
    let cur = new Date(progStart), html = '', wkNum = 0;

    while (cur <= progEnd) {
      const dayIdx = Math.round((cur - progStart) / 86400000);
      if (dayIdx % 7 === 0) {
        wkNum++;
        const wkS  = new Date(cur);
        const wkE  = new Date(Math.min(cur.getTime() + 6 * 86400000, progEnd.getTime()));
        const blks = new Set();
        for (let t = new Date(wkS); t <= wkE; t = new Date(t.getTime() + 86400000))
          blks.add(calBlock(toDateStr(t), sett) || 'Block 2');
        const fmt = d => `${d.getDate()} ${_CMNS[d.getMonth()]}`;
        html += `<div class="cal-week-hdr">Week ${wkNum} — ${fmt(wkS)} to ${fmt(wkE)} · ${[...blks].join(' / ')}</div>`;
        if (wkE >= progEnd)
          html += '<div class="cal-completion-note">🎉 Membership ends 10 Sept — return to the wall in Limerick. Programme complete.</div>';
      }
      html += calBuildCard(toDateStr(cur), sett, today, logged);
      cur = new Date(cur.getTime() + 86400000);
    }

    list.innerHTML = html;

    if (_calObs) { _calObs.disconnect(); _calObs = null; }
    _calObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.dataset.loaded === 'false') calFillExList(e.target);
      });
    }, { rootMargin: '300px 0px' });
    list.querySelectorAll('.cal-ex-ph[data-loaded="false"]').forEach(ph => _calObs.observe(ph));

    const todayCard = document.getElementById('cal-card-' + today);
    if (todayCard) setTimeout(() => todayCard.scrollIntoView({ block: 'center' }), 80);
  }

