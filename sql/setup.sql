-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash VARCHAR NOT NULL 
);

INSERT INTO users (user_name, email, password_hash ) VALUES
  ('test2', '123@abc', '$2b$10$Xg7k1p4xqI/LTEQxltkTG.XlF8lQCTlxls1mLImlpscebr3p8rBpi');

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  cuisine TEXT NOT NULL
);

INSERT INTO restaurants (name, cuisine) VALUES
  ('Deli-cio', 'Sandwiches'),
  ('AYOK', 'Korean'),
  ('Bad2 the Bone', 'BBQ');

CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  stars SMALLINT CONSTRAINT star_rating CHECK (stars >= 0 AND stars <= 5) NOT NULL,
  detail TEXT NOT NULL,
  user_id BIGINT,
  restaurant_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

INSERT INTO reviews (stars, detail) VALUES
  (5, 'this food is delicious!'),
  (5, 'would love to come back!'),
  (3, 'just ok'),
  (0, 'awful');




