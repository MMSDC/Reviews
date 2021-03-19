const { once } = require('events');
const fs = require('fs');
const readline = require('readline');

const validateImages = require('./validateImages.js');

async function processLineByLine(readFrom, validator, writeTo) {
  try {
    const rl = readline.createInterface({
      input: readFrom,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      validator(line, () => {
        writeTo.write(`${line} \n`);
      });
    });

    await once(rl, 'close');

    console.log('File processed.');
  } catch (err) {
    console.error(err);
  }
}

const imagesFileStream = fs.createReadStream('/Users/jacobwpeterson/Downloads/reviews_photos.csv');
const imagesWriteStream = fs.createWriteStream('/Users/jacobwpeterson/Downloads/reviews_photos_cleaned.csv', { flags: 'a' });

processLineByLine(imagesFileStream, validateImages, imagesWriteStream);
