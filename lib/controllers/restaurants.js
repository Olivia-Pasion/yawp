const { Router } = require('express');
const Restaurant = require('../models/Restaurant');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

module.exports = Router()
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();
    res.json(restaurants);
  });


