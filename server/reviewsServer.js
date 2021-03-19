/* eslint-disable camelcase */
const express = require('express');
const db = require('../db/connection.js');

const app = express();

const port = 3002;

app.use(express.json());

// Get all product reviews
app.get('/reviews', (req, res) => {
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
      res.status(200).send(productReviews);
    }
  });
});

// Get product review metadata
app.get('/reviews/meta', (req, res) => {
  const { product_id } = req.query;

  // Execute db read/find based on product_id

  const reviewMetadata = {
    product_id,
    ratings: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
    },
    recommended: {
      0: null,
      1: null,
    },
    characteristics: {
      characteristic: { characteristic_id: null },
    },
  };
  console.log('hello reviews meta', req.query.product_id);
  res.status(200).send(`reviews metadata for ${product_id}`);
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
