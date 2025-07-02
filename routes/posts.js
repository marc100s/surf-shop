const express = require('express');
const router = express.Router();

/**
 * GET /posts
 * Return a list of posts
 */
router.get('/', (req, res) => {
  res.status(200).send('List of posts');
});

/**
 * GET /posts/new
 * Show form to create a new post
 */
router.get('/new', (req, res) => {
  res.status(200).send('Form to create a new post');
});

/**
 * GET /posts/:id/edit
 * Show form to edit an existing post
 */
router.get('/:id/edit', (req, res) => {
  res.status(200).send(`Edit post with ID ${req.params.id}`);
});

/**
 * GET /posts/:id
 * Show a specific post
 */
router.get('/:id', (req, res) => {
  res.status(200).send(`Show post with ID ${req.params.id}`);
});

/**
 * POST /posts
 * Create a new post
 */
router.post('/', (req, res) => {
  res.status(201).send(`Created a new post: ${JSON.stringify(req.body)}`);
});

/**
 * PUT /posts/:id
 * Update an existing post
 */
router.put('/:id', (req, res) => {
  res.status(200).send(`Updated post with ID ${req.params.id}: ${JSON.stringify(req.body)}`);
});

/**
 * DELETE /posts/:id
 * Delete a post
 */
router.delete('/:id', (req, res) => {
  res.status(200).send(`Deleted post with ID ${req.params.id}`);
});

module.exports = router;