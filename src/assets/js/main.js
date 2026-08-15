/**
 * YOGDPS Core
 * Global browser behavior for the platform shell.
 */

(() => {
    'use strict';

    const navbarRoot = document.querySelector('#navbar-root');

    /**
     * Loads reusable components without introducing a framework dependency.
     * This keeps the Core lightweight while allowing the platform to grow modularly.
     */
    async function loadComponent(root, path) {
        if (!root) return;

        try {
            const response = await fetch(path, { cache: 'no-cache' });

            if (!response.ok) {
                throw new Error(`Component request failed: ${response.status}`);
            }

            root.innerHTML = await response.text();
            root.dispatchEvent(new CustomEvent('yogdps:component-loaded', {
                bubbles: true,
                detail: { path }
            }));
        } catch (error) {
            console.error('[YOGDPS] Failed to load component:', error);
        }
    }

    function setupNavigation() {
        const navbar = document.querySelector('.site-navbar');
        const toggle = document.querySelector('[data-nav-toggle]');

        if (!navbar || !toggle) return;

        toggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                navbar.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    navbarRoot?.addEventListener('yogdps:component-loaded', setupNavigation);

    // Core currently uses a static component path. Routing will be introduced
    // later, once the platform shell and authentication modules are complete.
    loadComponent(navbarRoot, 'components/Navbar.html');
})();
