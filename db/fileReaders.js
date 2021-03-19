const { once } = require('events');
const fs = require('fs');
const readline = require('readline');

const validateImages = require('./validateImages.js');

const fileStream = fs.createReadStream('/Users/jacobwpeterson/Downloads/reviews_photos.csv');
const writeStream = fs.createWriteStream('/Users/jacobwpeterson/Downloads/reviews_photos_cleaned.csv', { flags: 'a' });

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      validateImages(line, () => {
        writeStream.write(`${line} \n`);
      });
    });

    await once(rl, 'close');

    console.log('File processed.');
  } catch (err) {
    console.error(err);
  }
}());
