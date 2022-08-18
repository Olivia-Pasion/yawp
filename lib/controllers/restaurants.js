const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

module.exports = Router()
  .get('/:restId', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.restId);
      if (!restaurant) {
        next();
      }
      res.json(restaurant);
    } catch (e) {
      next (e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      const ids = restaurants.map((restaurant) => ({
        id: restaurant.id, name: restaurant.name, cuisine: restaurant.cuisine
      }));
      res.json(ids);
    } catch (e) {
      next (e);
    }
  })
  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try{
      const review = await Review.insert(req.body, req.user_id, req.params.restId);
      if (req.body.reviewId) {
        await Promise.all(req.body.reviewId.map((id) => review.addReviewById(id)));
      }
      res.json(review);
    } catch (e) {
      next (e);
    }
  });
  


