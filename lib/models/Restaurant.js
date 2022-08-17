const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  cuisine;
  reviews;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
    this.reviews = row.reviews;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT restaurants.id, restaurants.name
      FROM restaurants
      `
    );
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT restaurants.*,
	      COALESCE(
          json_agg(json_build_object('id', reviews.id, 'stars', reviews.stars, 'detail', reviews.detail))
          FILTER (WHERE reviews.id IS NOT NULL), '[]'
          ) as reviews from restaurants
        LEFT JOIN restaurants_reviews
    	    ON restaurants.id = restaurants_reviews.restaurant_id
        LEFT JOIN reviews
    	    ON restaurants_reviews.review_id = reviews.id
        WHERE restaurants.id = $1
        GROUP BY restaurants.id
      `,
      [id]
    );
    console.log(rows);
    return new Restaurant(rows[0]);
  }
};


