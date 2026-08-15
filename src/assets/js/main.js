/** YOGDPS Core — navigation, Supabase session and shared helpers. */
(() => {
  'use strict';

  const ROUTES = {
    home: 'index.html', dashboard: 'pages/dashboard/index.html', builder: 'pages/builder/index.html',
    docs: 'pages/docs/index.html', auth: 'pages/auth/index.html', projects: 'pages/projects/index.html',
    settings: 'pages/settings/index.html', admin: 'pages/admin/index.html'
  };

  function projectRoot() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const src = path.indexOf('/src/');
    return src >= 0 ? path.slice(0, src + 5) : '';
  }

  function routeUrl(route) { return `${projectRoot()}${ROUTES[route] || ROUTES.home}`; }

  async function getSession() {
    try { return (await window.YOGDPS_AUTH.getClient().auth.getSession()).data.session; }
    catch { return null; }
  }

  async function requireSession() {
    const session = await getSession();
    if (!session) { window.location.replace(routeUrl('auth')); return null; }
    return session;
  }

  async function signOut() {
    try { await window.YOGDPS_AUTH.getClient().auth.signOut(); } finally { window.location.replace(routeUrl('auth')); }
  }

  window.YOGDPS = Object.freeze({ routes: ROUTES, routeUrl, getSession, requireSession, signOut });

  const navbarRoot = document.querySelector('#navbar-root');
  function setupNavigation() {
    const navbar = document.querySelector('.site-navbar');
    const toggle = document.querySelector('[data-nav-toggle]');
    document.querySelectorAll('[data-route]').forEach(link => { link.href = routeUrl(link.dataset.route); });
    if (!navbar) return;
    toggle?.addEventListener('click', () => {
      const open = navbar.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  function loadComponent(root, path) {
    if (!root) return;
    fetch(`${projectRoot()}${path}`, { cache: 'no-store' }).then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(html => { root.innerHTML = html; setupNavigation(); })
      .catch(error => console.error('[YOGDPS UI]', error));
  }
  loadComponent(navbarRoot, 'components/Navbar.html');
})();
