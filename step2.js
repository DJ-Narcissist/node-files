const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching URL ${url}:\n  ${error.message}`);
    process.exit(1);
  }
}

// Check if a command line argument is provided
if (process.argv.length !== 3) {
  console.error('Usage: node step2.js <file-path or URL>');
  process.exit(1);
}

// Get the command line argument (file path or URL)
const arg = process.argv[2];

// Determine if it's a file path or URL and call the appropriate function
if (arg.startsWith('http://') || arg.startsWith('https://')) {
  webCat(arg);
} else {
  cat(arg);
}
