// const fs = require('fs');

// fs.createReadStream('/Users/jacobwpeterson/Downloads/reviews_photos.csv')
//   .on('error', console.log)
//   .pipe(parser())
//   .on('data', async (row) => {

//   })
//   .on('end', () => {
//     console.log('file loaded');
//   });

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/jacobwpeterson/Downloads/reviews_photos.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
  }
}

processLineByLine();
