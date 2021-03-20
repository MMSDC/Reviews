const validateReviews = (line, cb) => {
  const columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  const rating = columns[2];
  const reviewerEmail = columns[9];

  const isValidRating = (number) => {
    if (number >= 1 && number <= 5) {
      return true;
    } return false;
  };

  const isValidEmail = (email) => {
    if (email.match(/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/)) {
      return true;
    } return false;
  };

  if (isValidRating(Number(rating))
  && isValidEmail(reviewerEmail.slice(1, reviewerEmail.length - 1))) {
    cb(line);
  }
};

module.exports = validateReviews;
