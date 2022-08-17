const { Router } = require('express');
const Restaurant = require('../models/Restaurant');
//const authenticate = require('../middleware/authenticate');
//const authorize = require('../middleware/authorize');

module.exports = Router()
  .get('/:restId', async (req, res) => {
    const restaurant = await Restaurant.getById(req.params.restId);
    console.log(restaurant);
    res.json(restaurant);
  })
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();
    res.json(restaurants);
  });


