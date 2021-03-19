const validateImages = (line, cb) => {
  const columns = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

  const isUrl = (url) => {
    if (url.slice(1, 9) === 'https://') {
      return true;
    } return false;
  };

  if (isUrl(columns[2])) {
    cb(line);
  }
};

module.exports = validateImages;
