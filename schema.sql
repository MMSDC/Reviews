CREATE TABLE reviews(
   id INTEGER NOT NULL PRIMARY KEY,
   product_id INTEGER NOT NULL,
   rating SMALLINT,
   date VARCHAR(10) NOT NULL,
   summary VARCHAR(150) NOT NULL,
   body TEXT NOT NULL,
   recommend BOOLEAN,
   reported BOOLEAN,
   reviewer_name VARCHAR(60) NOT NULL,
   reviewer_email VARCHAR(60) NOT NULL,
   response TEXT,
   helpfulness SMALLINT
);

CREATE INDEX product_reviews_not_reported ON reviews (product_id, reported);

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

COPY reviews FROM '/Users/jacobwpeterson/Downloads/reviews_cleaned.csv' WITH (FORMAT CSV);
COPY images FROM '/Users/jacobwpeterson/Downloads/reviews_photos_cleaned.csv' WITH (FORMAT CSV);
COPY characteristics (id, product_id, name) FROM '/Users/jacobwpeterson/Downloads/characteristics.csv' WITH (FORMAT CSV)v;
