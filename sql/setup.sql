-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`


DROP TABLE IF EXISTS restaurants_reviews;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS reviews;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash VARCHAR NOT NULL 
);

INSERT INTO users (user_name, email) VALUES
  ('test_1', 'abc@123'),
  ('test_2', '123@abc');

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
  detail TEXT NOT NULL
);

INSERT INTO reviews (stars, detail) VALUES
  (5, 'this food is delicious!'),
  (5, 'would love to come back!'),
  (3, 'just ok'),
  (0, 'awful');

CREATE TABLE restaurants_reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  restaurant_id BIGINT,
  review_id BIGINT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (review_id) REFERENCES reviews(id)
);

INSERT INTO restaurants_reviews (restaurant_id, review_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (3, 4);





