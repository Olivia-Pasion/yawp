const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  cuisine;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cuisine = row.cuisine;
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
};


