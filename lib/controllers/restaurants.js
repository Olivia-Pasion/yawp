const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
//const authorize = require('../middleware/authorize');

module.exports = Router()
  .get('/:restId', async (req, res) => {
    const restaurant = await Restaurant.getById(req.params.restId);
    res.json(restaurant);
  })
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();
    res.json(restaurants);
  })
  .post('/:restId/reviews', authenticate, async (req, res, next) => {
    try{
      console.log('IN CONTROLLER', req.body);
      const review = await Review.insert(req.body, req.user_id, req.params.restId);
      if (req.body.reviewId) {
        await Promise.all(req.body.reviewId.map((id) => review.addReviewById(id)));
      }
      res.json(review);
    } catch (e) {
      next (e);
    }
  });


