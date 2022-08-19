const pool = require('../utils/pool');

module.exports = class Review{
  id;
  stars;
  detail;
  user;
  restaurant_id;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.stars = row.stars;
    this.detail = row.detail;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
  }

  static async insert({ stars, detail, user_id, restaurant_id }) {
    const { rows } = await pool.query(
      `
      INSERT INTO reviews (stars, detail, user_id, restaurant_id) VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [stars, detail, user_id, restaurant_id]
    );
    console.log(rows);
    return new Review(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *;
      `, [id]
    );
    return new Review(rows[0]);
  } 
};

