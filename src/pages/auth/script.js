(() => {
    'use strict';
    const SUPABASE_URL = 'https://pibewpluayuszrlgdnyu.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_JPZ-2fQdcW3R3Aoyn3mRh7Q_c1CImGEY';
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const form = document.querySelector('#auth-form');
    const tabs = document.querySelectorAll('.tab');
    const nameField = document.querySelector('#name-field');
    const submit = document.querySelector('#submit-button');
    const message = document.querySelector('#auth-message');
    let mode = 'login';
    function setMessage(text, error = false) { message.textContent = text; message.classList.toggle('error', error); }
    tabs.forEach(tab => tab.addEventListener('click', () => {
        mode = tab.dataset.tab;
        tabs.forEach(item => item.classList.toggle('active', item === tab));
        nameField.classList.toggle('hidden', mode !== 'register');
        submit.textContent = mode === 'login' ? 'Entrar →' : 'Criar conta →';
        setMessage('');
    }));
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value;
        const name = document.querySelector('#name').value.trim() || email.split('@')[0];
        submit.disabled = true;
        submit.textContent = mode === 'login' ? 'Entrando...' : 'Criando...';
        setMessage('');
        try {
            if (mode === 'register') {
                const { data, error } = await client.auth.signUp({ email, password, options: { data: { username: name } } });
                if (error) throw error;
                if (data.session) { window.location.href = '../../pages/dashboard/index.html'; return; }
                setMessage('Conta criada! Verifique seu email para confirmar o cadastro.');
            } else {
                const { error } = await client.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = '../../pages/dashboard/index.html';
            }
        } catch (error) {
            console.error('[YOGDPS Auth]', error);
            setMessage(error.message || 'Não foi possível concluir a autenticação.', true);
        } finally {
            submit.disabled = false;
            submit.textContent = mode === 'login' ? 'Entrar →' : 'Criar conta →';
        }
    });
})();
