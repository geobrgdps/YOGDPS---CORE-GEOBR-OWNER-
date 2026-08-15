(() => {
  'use strict';

  const SUPABASE_URL = 'https://pibewpluayuszrlgdnyu.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_JPZ-2fQdcW3R3Aoyn3mRh7Q_c1CImGEY';

  function getClient() {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      throw new Error('AUTH_CLIENT_NOT_READY');
    }
    if (!window.YOGDPS_SUPABASE) {
      window.YOGDPS_SUPABASE = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
    }
    return window.YOGDPS_SUPABASE;
  }

  window.YOGDPS_AUTH = Object.freeze({ getClient });
})();
