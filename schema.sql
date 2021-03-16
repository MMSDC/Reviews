DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews(
   review_id SERIAL PRIMARY KEY,
   rating SMALLINT,
   summary VARCHAR(100) NOT NULL,
   body TEXT NOT NULL,
   reviewer_name VARCHAR(25) NOT NULL,
   email VARCHAR(40) NOT NULL,
   response TEXT,
   recommend BOOLEAN,
   date TIMESTAMP,
   helpfulness SMALLINT,
   reported BOOLEAN,
);

CREATE TABLE images(
  review_id INTEGER NOT NULL REFERENCES reviews,
  id SERIAL,
  url TEXT NOT NULL,
);

CREATE TABLE product_reviews(
  product_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL REFERENCES reviews,
);

CREATE TABLE characteristics(
  characteristic_id SERIAL,
  characteristic VARCHAR(20) NOT NULL,
  total_from_reviews INTEGER,
  total_reviews INTEGER,
);

CREATE TABLE product_characteristics(
  product_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics,
);
