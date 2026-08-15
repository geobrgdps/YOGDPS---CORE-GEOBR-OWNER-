(() => {
    const form=document.querySelector('#auth-form'), tabs=document.querySelectorAll('.tab'), nameField=document.querySelector('#name-field'), submit=document.querySelector('#submit-button'), message=document.querySelector('#auth-message');
    let mode='login';
    tabs.forEach(tab=>tab.addEventListener('click',()=>{mode=tab.dataset.tab;tabs.forEach(t=>t.classList.toggle('active',t===tab));nameField.classList.toggle('hidden',mode!=='register');submit.textContent=mode==='login'?'Entrar →':'Criar conta →';message.textContent='';}));
    form.addEventListener('submit',e=>{e.preventDefault();const email=document.querySelector('#email').value.trim();const name=document.querySelector('#name').value.trim()||email.split('@')[0];localStorage.setItem('yogdps_session',JSON.stringify({email,name,createdAt:new Date().toISOString(),provider:'local-demo'}));message.textContent=mode==='login'?'Sessão local criada. Abrindo dashboard...':'Conta local criada. Abrindo dashboard...';setTimeout(()=>location.href='../../pages/dashboard/index.html',350);});
})();
