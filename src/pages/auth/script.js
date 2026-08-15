(() => {
    'use strict';

    const form = document.querySelector('#auth-form');
    const tabs = document.querySelectorAll('.tab');
    const nameField = document.querySelector('#name-field');
    const submit = document.querySelector('#submit-button');
    const message = document.querySelector('#auth-message');
    let mode = 'login';

    function setMessage(text, error = false) {
        message.textContent = text;
        message.classList.toggle('error', error);
    }

    function getUsers() {
        try { return JSON.parse(localStorage.getItem('yogdps_users') || '[]'); }
        catch { return []; }
    }

    function saveUsers(users) {
        localStorage.setItem('yogdps_users', JSON.stringify(users));
    }

    function getProjects() {
        try { return JSON.parse(localStorage.getItem('yogdps_projects') || '[]'); }
        catch { return []; }
    }

    function saveProjects(projects) {
        localStorage.setItem('yogdps_projects', JSON.stringify(projects));
    }

    tabs.forEach(tab => tab.addEventListener('click', () => {
        mode = tab.dataset.tab;
        tabs.forEach(item => item.classList.toggle('active', item === tab));
        nameField.classList.toggle('hidden', mode !== 'register');
        submit.textContent = mode === 'login' ? 'Entrar →' : 'Criar conta →';
        setMessage('');
    }));

    form.addEventListener('submit', event => {
        event.preventDefault();

        const email = document.querySelector('#email').value.trim().toLowerCase();
        const password = document.querySelector('#password').value;
        const name = document.querySelector('#name').value.trim() || email.split('@')[0];

        submit.disabled = true;
        submit.textContent = mode === 'login' ? 'Entrando...' : 'Criando...';
        setMessage('');

        try {
            const users = getUsers();

            if (mode === 'register') {
                if (users.some(user => user.email === email)) {
                    throw new Error('Este email já está cadastrado.');
                }

                const user = {
                    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
                    email,
                    password,
                    name,
                    plan: 'free',
                    createdAt: new Date().toISOString()
                };

                users.push(user);
                saveUsers(users);

                const projects = getProjects();
                projects.push({
                    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
                    ownerId: user.id,
                    name: `${name}'s GDPS`,
                    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-gdps'}`,
                    plan: 'free',
                    createdAt: new Date().toISOString()
                });
                saveProjects(projects);

                localStorage.setItem('yogdps_session', JSON.stringify({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    plan: user.plan
                }));

                window.location.href = '../../pages/dashboard/index.html';
                return;
            }

            const user = users.find(item => item.email === email && item.password === password);
            if (!user) throw new Error('Email ou senha incorretos.');

            localStorage.setItem('yogdps_session', JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan || 'free'
            }));

            window.location.href = '../../pages/dashboard/index.html';
        } catch (error) {
            console.error('[YOGDPS Auth]', error);
            setMessage(error.message || 'Não foi possível concluir o acesso.', true);
        } finally {
            submit.disabled = false;
            submit.textContent = mode === 'login' ? 'Entrar →' : 'Criar conta →';
        }
    });
})();
