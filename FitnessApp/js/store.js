  /* ═══════════════════════════════════════════════════════════════════
     STORE — single data-access layer

     The ONLY module that should touch localStorage directly. Every other
     file reads/writes through readJSON / writeJSON and the KEYS map below,
     so storage keys and (de)serialisation live in exactly one place.

     Loaded first in index.html, so its top-level declarations are visible
     to every later script via the shared global lexical scope.
  ═══════════════════════════════════════════════════════════════════ */

  /* Bump when the on-disk shape of any tt_* blob changes, and add a
     matching branch in migrate(). Stamped into exports as __schemaVersion. */
  const STORE_SCHEMA_VERSION = 1;

  /* Canonical storage keys — the single source of truth for every tt_* key. */
  const KEYS = {
    settings:  'tt_settings',
    gym:       'tt_gym_sessions',
    mob:       'tt_mob_sessions',
    rehab:     'tt_rehab_sessions',
    gymDraft:  'tt_gym_draft',
    exTargets: 'tt_ex_targets',
    mobProg:   'tt_mob_prog',
    rehabProg: 'tt_rehab_prog',
    hr:        'tt_resting_hr',
    benchData: 'tt_bench_data',
    benchHist: 'tt_bench_history',
    schemaVer: 'tt_schema_version',
  };

  /* Per-date session-start timestamp lives under a dynamic key. */
  function gymStartKey(dateStr) { return 'tt_gym_start_' + dateStr; }

  /* ─── Core read / write ─────────────────────────────────────────── */
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  }

  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  function removeKey(key) {
    try { localStorage.removeItem(key); } catch {}
  }

  /* ─── Backup / restore ──────────────────────────────────────────── */
  /* Snapshot every tt_* key as a plain object, stamped with the schema
     version so a future import can migrate it forward. */
  function exportAll() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith('tt_')) continue;
      try { data[k] = JSON.parse(localStorage.getItem(k)); }
      catch { data[k] = localStorage.getItem(k); }
    }
    data.__schemaVersion = STORE_SCHEMA_VERSION;
    return data;
  }

  /* Restore a previously-exported blob, migrating it forward first.
     Returns true on success. */
  function importAll(blob) {
    if (!blob || typeof blob !== 'object') return false;
    const fromVersion = blob.__schemaVersion || 1;
    const migrated = migrate(blob, fromVersion);
    Object.entries(migrated).forEach(([k, v]) => {
      if (k === '__schemaVersion') return;
      localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
    });
    writeJSON(KEYS.schemaVer, STORE_SCHEMA_VERSION);
    return true;
  }

  /* No-op for now. Future schema bumps slot in here, e.g.:
       if (fromVersion < 2) { ...transform data in place... }
     Always returns data migrated up to STORE_SCHEMA_VERSION. */
  function migrate(data, fromVersion) {
    return data;
  }

  /* Record the current schema version on first run so it travels with the data. */
  if (readJSON(KEYS.schemaVer, null) == null) writeJSON(KEYS.schemaVer, STORE_SCHEMA_VERSION);
