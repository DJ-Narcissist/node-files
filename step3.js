const fs = require('fs').promises;
const axios = require('axios');
const process = require('process');

async function readFromFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    throw new Error(`Error reading ${filePath}:\n  ${error.message}`);
  }
}

async function readFromURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching URL ${url}:\n  ${error.message}`);
  }
}

async function writeToOutputFile(outputPath, content) {
  try {
    await fs.writeFile(outputPath, content);
    console.log(`Data written to ${outputPath}`);
  } catch (error) {
    throw new Error(`Couldn't write to ${outputPath}:\n  ${error.message}`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node step3.js [--out output-filename.txt] <file-path or URL>');
    process.exit(1);
  }

  let outputPath = '';
  let inputPath = args[args.length - 1];

  if (args[0] === '--out' && args.length >= 3) {
    outputPath = args[1];
    inputPath = args[2];
  }

  if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
    const content = await readFromURL(inputPath);
    if (outputPath) {
      await writeToOutputFile(outputPath, content);
    } else {
      console.log(content);
    }
  } else {
    const content = await readFromFile(inputPath);
    if (outputPath) {
      await writeToOutputFile(outputPath, content);
    } else {
      console.log(content);
    }
  }
}

main();
