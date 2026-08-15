/** YOGDPS Core — global shell, routes and small client helpers. */
(() => {
    'use strict';

    const navbarRoot = document.querySelector('#navbar-root');
    const ROUTES = {
        home: 'index.html',
        dashboard: 'pages/dashboard/index.html',
        builder: 'pages/builder/index.html',
        docs: 'pages/docs/index.html',
        auth: 'pages/auth/index.html',
        projects: 'pages/projects/index.html',
        settings: 'pages/settings/index.html',
        admin: 'pages/admin/index.html'
    };

    function projectRoot() {
        const path = window.location.pathname.replace(/\\/g, '/');
        const srcIndex = path.indexOf('/src/');
        return srcIndex >= 0 ? path.slice(0, srcIndex + 5) : '';
    }

    function routeUrl(route) {
        const target = ROUTES[route] || ROUTES.home;
        return `${projectRoot()}${target}`;
    }

    function loadComponent(root, path) {
        if (!root) return Promise.resolve();
        return fetch(`${projectRoot()}${path}`, { cache: 'no-cache' })
            .then((response) => {
                if (!response.ok) throw new Error(`Component request failed: ${response.status}`);
                return response.text();
            })
            .then((html) => {
                root.innerHTML = html;
                root.dispatchEvent(new CustomEvent('yogdps:component-loaded', { bubbles: true, detail: { path } }));
            })
            .catch((error) => console.error('[YOGDPS] Component error:', error));
    }

    function setupNavigation() {
        const navbar = document.querySelector('.site-navbar');
        const toggle = document.querySelector('[data-nav-toggle]');
        if (!navbar) return;
        document.querySelectorAll('[data-route]').forEach((link) => {
            link.href = routeUrl(link.dataset.route);
        });
        if (toggle) toggle.addEventListener('click', () => {
            const open = navbar.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
            navbar.classList.remove('is-open');
            toggle?.setAttribute('aria-expanded', 'false');
        }));
    }

    window.YOGDPS = Object.freeze({
        routes: ROUTES,
        routeUrl,
        getSession: () => JSON.parse(localStorage.getItem('yogdps_session') || 'null'),
        getProjects: () => JSON.parse(localStorage.getItem('yogdps_projects') || '[]'),
        saveProjects: (projects) => localStorage.setItem('yogdps_projects', JSON.stringify(projects))
    });

    navbarRoot?.addEventListener('yogdps:component-loaded', setupNavigation);
    loadComponent(navbarRoot, 'components/Navbar.html');
})();
