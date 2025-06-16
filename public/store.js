const params = new URLSearchParams(window.location.search);
const storeId = params.get('id');

async function loadStore() {
  const res = await fetch(`/api/stores/${storeId}`);
  if (res.status !== 200) return;
  const store = await res.json();
  document.getElementById('store-name').textContent = store.name;
  document.getElementById('store-rating').textContent = `Average rating: ${store.rating}`;
}

async function loadReviews() {
  const res = await fetch(`/api/stores/${storeId}/reviews`);
  const reviews = await res.json();
  const container = document.getElementById('store-reviews');
  container.innerHTML = '';
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `<strong>${r.reviewer}</strong> <span class="rating">${'★'.repeat(r.rating)}</span> <p>${r.text}</p>`;
    container.appendChild(div);
  });
}

function openReviewForm() {
  window.location = `review.html?store=${storeId}`;
}

loadStore();
loadReviews();
