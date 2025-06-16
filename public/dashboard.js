async function loadDashboard() {
  const res = await fetch('/api/stores');
  const stores = await res.json();
  const overview = document.getElementById('overview');
  overview.innerHTML = `<p>Total stores: ${stores.length}</p>`;
}

loadDashboard();
