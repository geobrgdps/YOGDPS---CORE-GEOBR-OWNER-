(() => {
  'use strict';

  const form = document.querySelector('#auth-form');
  const tabs = document.querySelectorAll('.tab');
  const nameField = document.querySelector('#name-field');
  const nameInput = document.querySelector('#name');
  const submit = document.querySelector('#submit-button');
  const message = document.querySelector('#auth-message');
  let mode = 'login';

  const setMessage = (text, error = false) => {
    message.textContent = text;
    message.classList.toggle('error', error);
  };

  const redirect = () => { window.location.replace('../../pages/dashboard/index.html'); };

  const friendlyError = (error) => {
    const code = String(error?.code || '').toLowerCase();
    const msg = String(error?.message || '').toLowerCase();
    if (code.includes('invalid_credentials') || msg.includes('invalid login credentials')) return 'Email ou senha incorretos.';
    if (code.includes('email_exists') || msg.includes('already registered')) return 'Este email já está cadastrado. Tente entrar.';
    if (code.includes('weak_password') || msg.includes('password')) return 'A senha precisa ter pelo menos 6 caracteres.';
    if (msg.includes('email not confirmed')) return 'Confirme seu email antes de entrar.';
    if (msg.includes('failed to fetch') || msg.includes('network')) return 'Não foi possível conectar ao serviço. Tente novamente.';
    return 'Não foi possível concluir a operação. Tente novamente.';
  };

  tabs.forEach(tab => tab.addEventListener('click', () => {
    mode = tab.dataset.tab;
    tabs.forEach(item => item.classList.toggle('active', item === tab));
    nameField.classList.toggle('hidden', mode !== 'register');
    submit.textContent = mode === 'login' ? 'Entrar →' : 'Criar conta →';
    setMessage('');
  }));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim().toLowerCase();
    const password = document.querySelector('#password').value;
    const username = nameInput.value.trim();

    if (!email || !password || (mode === 'register' && username.length < 2)) {
      setMessage(mode === 'register' ? 'Preencha email, senha e nome de usuário.' : 'Preencha email e senha.', true);
      return;
    }

    submit.disabled = true;
    submit.textContent = mode === 'login' ? 'Entrando...' : 'Criando...';
    setMessage('');

    try {
      const client = window.YOGDPS_AUTH.getClient();
      if (mode === 'register') {
        const { data, error } = await client.auth.signUp({
          email,
          password,
          options: { data: { username } }
        });
        if (error) throw error;
        if (data.session) {
          redirect();
        } else {
          setMessage('Conta criada. Confira seu email para confirmar o cadastro.');
        }
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        redirect();
      }
    } catch (error) {
      console.error('[YOGDPS Auth]', error);
      setMessage(friendlyError(error), true);
    } finally {
      submit.disabled = false;
      submit.textContent = mode === 'login' ? 'Entrar →' : 'Criar conta →';
    }
  });
})();
