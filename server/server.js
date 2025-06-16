const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Mock data
const stores = [
  { id: 1, name: 'Store A', logo: '', rating: 4.5 },
  { id: 2, name: 'Store B', logo: '', rating: 3.8 }
];

const reviews = [
  { id: 1, storeId: 1, reviewer: 'Ahmed', rating: 5, text: 'Great store!', date: '2023-06-01' },
  { id: 2, storeId: 2, reviewer: 'Sara', rating: 4, text: 'Good service.', date: '2023-06-03' }
];

app.get('/api/stores', (req, res) => {
  const search = req.query.search;
  if (search) {
    return res.json(stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase())));
  }
  res.json(stores);
});

app.get('/api/stores/:id', (req, res) => {
  const store = stores.find(s => s.id === Number(req.params.id));
  if (!store) return res.status(404).json({ message: 'Store not found' });
  res.json(store);
});

app.get('/api/stores/:id/reviews', (req, res) => {
  const storeReviews = reviews.filter(r => r.storeId === Number(req.params.id));
  res.json(storeReviews);
});

app.post('/api/stores/:id/reviews', (req, res) => {
  const { reviewer, rating, text } = req.body;
  const review = {
    id: reviews.length + 1,
    storeId: Number(req.params.id),
    reviewer,
    rating,
    text,
    date: new Date().toISOString().split('T')[0]
  };
  reviews.push(review);
  res.status(201).json(review);
});

app.get('/api/reviews/recent', (req, res) => {
  res.json(reviews.slice(-5).reverse());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
