async function loadAdmin() {
  const res = await fetch('/api/stores');
  const stores = await res.json();
  const container = document.getElementById('admin-content');
  container.innerHTML = stores.map(s => `<div>${s.name}</div>`).join('');
}

loadAdmin();
