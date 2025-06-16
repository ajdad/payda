async function loadRecentReviews() {
  const res = await fetch('/api/reviews/recent');
  const reviews = await res.json();
  const feed = document.getElementById('reviews-feed');
  feed.innerHTML = '';
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `<strong>${r.reviewer}</strong> <span class="rating">${'★'.repeat(r.rating)}</span> <p>${r.text}</p>`;
    feed.appendChild(div);
  });
}

document.getElementById('search').addEventListener('change', async (e) => {
  const value = e.target.value;
  if (!value) return;
  const res = await fetch(`/api/stores?search=${encodeURIComponent(value)}`);
  const stores = await res.json();
  if (stores.length > 0) {
    window.location = `store.html?id=${stores[0].id}`;
  } else {
    alert('Store not found');
  }
});

loadRecentReviews();
