/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/connection.js');

const app = express();

const port = 3002;

const memcache = {};

app.use(express.json());

// Get all product reviews
app.get('/reviews', (req, res) => {
  const { product_id } = req.query;
  const { page } = req.query;
  const { count } = req.query;
  const { sort } = req.query;

  if (memcache[product_id]) {
    memcache[product_id].isNeeded = true;
  }

  const productReviews = {
    product: product_id,
    page,
    count,
    reviews: [],
  };

  const memModel = {
    isNeeded: true,
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

  // Execute db read/find based on product_id
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported = false`, (err, response) => {
    if (err) {
      res.status(404).send(err.stack);
    } else {
      productReviews.reviews.push(response.rows);
      response.rows.forEach((row) => {
        memModel.ratings[row.rating] += 1;
        if (row.recommend === false) {
          memModel.recommended[0] += 1;
        } else {
          memModel.recommended[1] += 1;
        }
      });
      memcache[product_id] = memModel;
      res.status(200).send(productReviews);
      // console.log(memcache);
    }
  });
  // delete memcache[product_id];
});

// Get product review metadata
app.get('/reviews/meta', (req, res) => {
  const { product_id } = req.query;

  const reviewMetadata = {
    product_id,
    ratings: memcache[product_id].ratings,
    recommended: memcache[product_id].recommended,
    characteristics: {},
  };

  // Execute db read/find based on product_id
  db.query(`SELECT * FROM characteristics WHERE product_id = ${product_id}`, (err, response) => {
    memcache[product_id].isNeeded = false;

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
  if (memcache[product_id].isNeeded === false) {
    delete memcache[product_id];
  }
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
  const fieldToUpdate = req.params.b;

  // Execute db update based on 'fieldToUpdate' variable for the given review_Id
  if (fieldToUpdate === 'report') {
    db.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`, (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.sendStatus(204);
      }
    });
  } else {
    db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`, (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.sendStatus(204);
      }
    });
  }
});

app.listen(port);
