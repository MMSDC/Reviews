const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

let productReviewsSchema = mongoose.Schema({
  product: {type: Number, unique: true},
  count: Number,
  results: [
    {
      review_id: {type: Number, unique: true},
      rating: { type: Number, min: 0, max: 5 },
      summary: { type: String, required: true, trim: true, maxLength: 100 },
      recommend: Boolean,
      body: { type: String, required: true, trim: true, },
      response: String,
      date: { type: Date, default: Date.now },
      reviewer_name: { type: String, required: true, trim: true, maxLength: 60 },
      email: { type: String, required: true, trim: true, maxLength: 60 },
      helpfulness: Number,
      reported: Boolean,
      photos: [{
          id: {type: Number, unique: true},
          url: { type: String, required: true, trim: true, },
        },
      ],
    },
  ]
});

let ProductReviews = mongoose.model('ProductReviews', productReviewsSchema);

let characteristicsSchema = mongoose.Schema({
  characteristic_id: {
    characteristic: String,
    total_value: Number,
    total_reviews: Number,
  }
});

let Characteristics = mongoose.model('characteristicsDb', characteristicsSchema);