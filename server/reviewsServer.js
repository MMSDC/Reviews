var express = require('express')
var app = express()

const port = 3001;

app.use(express.json());

//Get all product reviews
app.get('/reviews', function (req, res) {
  const product_id = req.query.product_id;
  const page = req.query.page;
  const count = req.query.count;
  const sort = req.query.sort;

  //Execute db read/find based on product_id

  let productReviews = {
    product: product_id,
    page: page,
    count: count,
    reviews: [],
  }
  console.log('hello reviews', page, count, sort)
  res.status(200).send(`${page} page of reviews, ${count} each, sorted by ${sort} for ${product_id}; ${productReviews}`)
})


//Get product review metadata
app.get('/reviews/meta', function (req, res) {
  const product_id = req.query.product_id;

  //Execute db read/find based on product_id

  let reviewMetadata = {
    product_id: product_id,
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
    }
  }
  console.log('hello reviews meta', req.query.product_id)
  res.status(200).send(`reviews metadata for ${product_id}`)
})

//Post new reviews to the database
app.post('/reviews', function (req, res) {
  //parse req.query
  const product_id = req.query.product_id;
  const rating = req.query.rating;
  const summary = req.query.summary;
  const body = req.query.body;
  const recommend = req.query.recommend;
  const name = req.query.name;
  const email = req.query.email;
  const photos = req.query.photos;
  const characteristics = req.query.characteristics;

  //Execute db create for review

  //Execute db update for characteristics

  res.sendStatus(201)
})

//Mark a review as helpful or report it
app.put('/reviews/:q/:b', function (req, res) {
  const review_id = req.params.q;
  const markAs = req.params.b;
  // console.log(review_id)
  // console.log('mark as: ', markAs)

  //Execute db update based on 'markAs' variable for the given review_Id

  res.sendStatus(204);
})

app.listen(port)