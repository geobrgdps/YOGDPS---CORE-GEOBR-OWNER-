(() => {
  'use strict';
  const list = document.querySelector('#project-list');
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  (async () => {
    const session = await window.YOGDPS.requireSession();
    if (!session) return;
    try {
      const client = window.YOGDPS_AUTH.getClient();
      const [{ data: account, error: accountError }, { data: gdps, error: gdpsError }] = await Promise.all([
        client.from('accounts').select('username,display_name,plan_id,plans(name,description)').eq('id', session.user.id).maybeSingle(),
        client.from('gdps').select('id,name,slug,description,created_at').eq('owner_id', session.user.id).order('created_at', { ascending: true })
      ]);
      if (accountError) throw accountError;
      if (gdpsError) throw gdpsError;
      document.querySelector('#user-name').textContent = account?.display_name || account?.username || session.user.email.split('@')[0];
      document.querySelector('#plan-name').textContent = account?.plans?.name || 'Free';
      document.querySelector('#plan-description').textContent = account?.plans?.description || 'Plano atual';
      document.querySelector('#project-count').textContent = String(gdps?.length || 0);
      if (!gdps?.length) {
        list.innerHTML = '<div class="empty-state">Você ainda não possui um GDPS.<br><a href="../builder/index.html" style="color:var(--primary-light)">Crie seu primeiro projeto →</a></div>';
        return;
      }
      list.innerHTML = gdps.map(p => `<article class="project-card"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.slug || '')}</p><span class="status">● Conectado</span></article>`).join('');
    } catch (error) {
      console.error('[YOGDPS Dashboard]', error);
      list.innerHTML = '<div class="empty-state">Não foi possível carregar seus dados. Recarregue a página.</div>';
    }
    document.querySelector('#logout').addEventListener('click', () => window.YOGDPS.signOut());
  })();
})();
