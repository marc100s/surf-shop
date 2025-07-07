const express = require('express');
const router = express.Router({ mergeParams: true });

/**
 * GET /posts/:postId/reviews
 * List all reviews for a specific post
 */
router.get('/', (req, res) => {
  const { postId } = req.params;
  res.status(200).send(`List of reviews for post ID ${postId}`);
});

/**
 * GET /posts/:postId/reviews/new
 * Show form to create a new review
 */
router.get('/new', (req, res) => {
  const { postId } = req.params;
  res.status(200).send(`Form to create a new review for post ID ${postId}`);
});

/**
 * POST /posts/:postId/reviews
 * Create a new review for a post
 */
router.post('/', (req, res) => {
  const { postId } = req.params;
  res.status(201).send(`Created a new review for post ID ${postId}: ${JSON.stringify(req.body)}`);
});

/**
 * GET /posts/:postId/reviews/:review_id
 * Show a specific review
 */
router.get('/:review_id', (req, res) => {
  const { review_id, postId } = req.params;
  res.status(200).send(`Show review ID ${review_id} for post ID ${postId}`);
});

/**
 * GET /posts/:postId/reviews/:review_id/edit
 * Edit form for a specific review
 */
router.get('/:review_id/edit', (req, res) => {
  const { review_id, postId } = req.params;
  res.status(200).send(`Edit form for review ID ${review_id} for post ID ${postId}`);
});

/**
 * PUT /posts/:postId/reviews/:review_id
 * Update a specific review
 */
router.put('/:review_id', (req, res) => {
  const { review_id, postId } = req.params;
  res.status(200).send(`Updated review ID ${review_id} for post ID ${postId}: ${JSON.stringify(req.body)}`);
});

/**
 * DELETE /posts/:postId/reviews/:review_id
 * Delete a specific review
 */
router.delete('/:review_id', (req, res) => {
  const { review_id, postId } = req.params;
  res.status(200).send(`Deleted review ID ${review_id} for post ID ${postId}`);
});

module.exports = router;