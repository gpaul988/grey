import('/_next/static/chunks/components_admin_RestoreButton.js').then(() => {
  // If the compiled module path isn't correct in dev, this loader gracefully falls back
}).catch(() => {});

// Simple client runtime to mount RestoreButton instances and handle DOM events
(async function(){
  function showToast(message){
    let t = document.getElementById('__admin_toast');
    if(!t){
      t = document.createElement('div');
      t.id = '__admin_toast';
      Object.assign(t.style, {position:'fixed',right:'20px',bottom:'20px',zIndex:9999});
      document.body.appendChild(t);
    }
    const item = document.createElement('div');
    Object.assign(item.style, {background:'#081f13',color:'#bbf7d0',padding:'8px 12px',borderRadius:'8px',marginTop:'8px',boxShadow:'0 6px 18px rgba(2,6,23,0.6)'});
    item.textContent = message;
    t.appendChild(item);
    setTimeout(()=>{ item.remove(); if(!t.hasChildNodes()) t.remove(); }, 3500);
  }

  window.addEventListener('toast', (ev) => {
    const msg = ev.detail?.message || 'Done';
    showToast(msg);
  });

  window.addEventListener('restored', (ev) => {
    const { entity, id } = ev.detail || {};
    if(entity && id){
      const row = document.getElementById(`row-${entity}-${id}`);
      if(row) row.remove();
    }
  });

  // Mount RestoreButton by creating a simple fetch-based button if React bundle isn't available
  function mountFallback(buttonEl){
    const entity = buttonEl.getAttribute('data-restore-entity');
    const id = Number(buttonEl.getAttribute('data-restore-id'));
    const btn = document.createElement('button');
    btn.className = 'rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950';
    btn.textContent = 'Restore';
    btn.addEventListener('click', async ()=>{
      if(!confirm('Restore this item?')) return;
      btn.disabled = true;
      try{
        const res = await fetch(`/api/admin/${entity}/${id}`, { method: 'POST', headers: {'Content-Type':'application/json'}, credentials:'same-origin', body: JSON.stringify({action:'restore'}) });
        const j = await res.json().catch(()=>({}));
        if(res.ok && j.ok){
          window.dispatchEvent(new CustomEvent('restored', { detail: { entity, id } }));
          window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'Restored.' } }));
        } else {
          alert(j?.error || 'Restore failed');
        }
      }catch(e){ console.error(e); alert('Restore failed'); }
      finally{ btn.disabled = false; }
    });
    buttonEl.appendChild(btn);
  }

  // Find mounts and attach fallback buttons
  document.querySelectorAll('.restore-mount').forEach(el => mountFallback(el));
})();
