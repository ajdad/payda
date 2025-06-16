const params = new URLSearchParams(window.location.search);
const storeId = params.get('store');

document.getElementById('review-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const order = document.getElementById('order').value;
  const rating = document.getElementById('rating').value;
  const text = document.getElementById('text').value;
  const res = await fetch(`/api/stores/${storeId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviewer: 'Anonymous', rating: Number(rating), text })
  });
  if (res.status === 201) {
    alert('Review submitted!');
    window.location = `store.html?id=${storeId}`;
  } else {
    alert('Error submitting review');
  }
});
