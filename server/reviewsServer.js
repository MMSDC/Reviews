/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/connection.js');

const app = express();

const port = 3002;

let memcache = {
  ratings: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  recommended: {
    0: 0,
    1: 0,
  },
};

const clearMemcache = () => {
  memcache = {
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    recommended: {
      0: 0,
      1: 0,
    },
  };
};

app.use(express.json());

// Get all product reviews
app.get('/reviews', (req, res) => {
  clearMemcache();

  const { product_id } = req.query;
  const { page } = req.query;
  const { count } = req.query;
  const { sort } = req.query;

  const productReviews = {
    product: product_id,
    page,
    count,
    reviews: [],
  };

  // Execute db read/find based on product_id
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported = false`, (err, response) => {
    if (err) {
      // console.log(err.stack);
      res.status(404).send(err.stack);
    } else {
      productReviews.reviews.push(response.rows);
      response.rows.forEach((row) => {
        memcache.ratings[row.rating] += 1;
        if (row.recommend === false) {
          memcache.recommended[0] += 1;
        } else {
          memcache.recommended[1] += 1;
        }
      });
      res.status(200).send(productReviews);
    }
  });
});

// Get product review metadata
app.get('/reviews/meta', (req, res) => {
  const { product_id } = req.query;

  const reviewMetadata = {
    product_id,
    ratings: memcache.ratings,
    recommended: memcache.recommended,
    characteristics: {},
  };

  // Execute db read/find based on product_id
  db.query(`SELECT * FROM characteristics WHERE product_id = ${product_id}`, (err, response) => {
    if (err) {
      res.status(404).send(err.stack);
    } else {
      const characteristics = [];
      const characteristicIds = [];
      response.rows.forEach((row) => {
        characteristics.push(row.name);
        characteristicIds.push(row.id);
      });

      const query = `SELECT characteristic_id, AVG(value)::NUMERIC(10,4) AS total FROM characteristic_reviews WHERE characteristic_id = ANY(Array[${characteristicIds}]) GROUP BY characteristic_id ORDER BY characteristic_id`;
      db.query(query, (error, resp) => {
        if (error) {
          res.status(404).send(error.stack);
        } else {
          let index = 0;
          resp.rows.forEach((row) => {
            reviewMetadata.characteristics[characteristics[index]] = {
              id: row.characteristic_id,
              value: row.total,
            };
            index += 1;
          });
          res.status(200).send(reviewMetadata);
        }
      });
    }
  });
  clearMemcache();
});

// Post new reviews to the database
app.post('/reviews', (req, res) => {
  // parse req.query
  const { product_id } = req.query;
  const { rating } = req.query;
  const { summary } = req.query;
  const { body } = req.query;
  const { recommend } = req.query;
  const { name } = req.query;
  const { email } = req.query;
  const { photos } = req.query;
  const { characteristics } = req.query;

  // Execute db create for review

  // Execute db update for characteristics

  res.sendStatus(201);
});

// Mark a review as helpful or report it
app.put('/reviews/:q/:b', (req, res) => {
  const review_id = req.params.q;
  const markAs = req.params.b;
  // console.log(review_id)
  // console.log('mark as: ', markAs)

  // Execute db update based on 'markAs' variable for the given review_Id

  res.sendStatus(204);
});

app.listen(port);
