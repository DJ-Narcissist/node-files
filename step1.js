const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

if (process.argv.length !== 3) {
    console.error('Usage: node ')
}