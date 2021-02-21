const fs = require("fs");
const path = require("path");

function partPath(ppath) {
  return path.join(__dirname, "..", "parts", ppath);
}

function processedPath(name) {
  return path.join(__dirname, "..", "processed", name);
}

function processPart(ppath) {
  const absolutePath = partPath(ppath);
  const contents = fs.readFileSync(absolutePath).toString();
  console.log(`${ppath} : ${contents.length} characters`);
  const stripped = contents.replace(/(\r\n|\n|\r)/gm, "");
  return [stripped, ppath];
}

function writeProcessedPart(contents, part) {
  fs.writeFileSync(processedPath(part), contents);
}

exports.preprocess = () => {
  const parts = fs.readdirSync(path.join(__dirname, "..", "parts"));

  console.log(`${parts.length} parts found.`);

  const strippedParts = parts.map(processPart);
  strippedParts.forEach(([contents, part]) => writeProcessedPart(contents, part));

  const fullText = strippedParts.map(([c]) => c).join(" ");

  fs.writeFileSync(processedPath("full.txt"), fullText);
};

exports.preprocess();
