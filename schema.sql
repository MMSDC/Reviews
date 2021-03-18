-- DROP DATABASE IF EXISTS reviews;

-- CREATE DATABASE reviews;

CREATE TABLE reviews(
   id SERIAL PRIMARY KEY,
   product_id INTEGER NOT NULL,
   rating SMALLINT,
   date VARCHAR(10) NOT NULL,
   summary VARCHAR(100) NOT NULL,
   body TEXT NOT NULL,
   recommend BOOLEAN,
   reported BOOLEAN,
   reviewer_name VARCHAR(60) NOT NULL,
   reviewer_email VARCHAR(60) NOT NULL,
   response TEXT,
   helpfulness SMALLINT
);

CREATE TABLE images(
  id SERIAL,
  review_id INTEGER NOT NULL REFERENCES reviews,
  url TEXT NOT NULL
);

CREATE TABLE characteristics(
  id SERIAL,
  product_id INTEGER NOT NULL,
  name VARCHAR(20) NOT NULL,
  total_from_reviews INTEGER,
  total_reviews INTEGER
);
