const express = require('express');
const router = express.Router({mergeParams: true});

/**
 * GET /posts/:postId/reviews
 * Retrieve all reviews for a specific post
 */
router.get('/', (req, res) => {
  const { id } = req.params;
  res.status(200).send(`List of reviews for post ID ${id}`);
});

/**
 * GET /posts/:postId/reviews/new
 * Show form to create a new review for a specific post
 */
router.get('/posts/:postId/reviews/new', (req, res) => {
  const { postId } = req.params;
  res.status(200).send(`Form to create a new review for post ID ${postId}`);
});

/**
 * GET /reviews/:id/edit
 * Show form to edit an existing review
 */
router.get('/reviews/:id/edit', (req, res) => {
  res.status(200).send(`Edit review with ID ${req.params.id}`);
});

/**
 * GET /reviews/:id
 * Show a specific review
 */
router.get('/reviews/:id', (req, res) => {
  res.status(200).send(`Show review with ID ${req.params.id}`);
});

/**
 * POST /posts/:postId/reviews
 * Create a new review for a specific post
 */
router.post('/posts/:postId/reviews', (req, res) => {
  const { postId } = req.params;
  res.status(201).send(`Created a new review for post ID ${postId}: ${JSON.stringify(req.body)}`);
});

/**
 * PUT /reviews/:id
 * Update an existing review
 */
router.put('/reviews/:id', (req, res) => {
  res.status(200).send(`Updated review with ID ${req.params.id}: ${JSON.stringify(req.body)}`);
});

/**
 * DELETE /reviews/:id
 * Delete a review
 */
router.delete('/reviews/:id', (req, res) => {
  res.status(200).send(`Deleted review with ID ${req.params.id}`);
});

module.exports = router;