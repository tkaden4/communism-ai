const fs = require("fs");
const path = require("path");

function part(ppath) {
  return path.join(__dirname, "..", "parts", ppath);
}

function processed(name) {
  return path.join(__dirname, "..", "processed", name);
}

const parts = fs.readdirSync(path.join(__dirname, "..", "parts"));

console.log(`${parts.length} parts found.`);

function processPart(partPath) {
  const absolutePath = part(partPath);
  const contents = fs.readFileSync(absolutePath).toString();
  console.log(`${partPath} : ${contents.length} characters`);
  const stripped = contents.replace(/(\r\n|\n|\r)/gm, "");
  return [stripped, partPath];
}

function writeProcessedPart(contents, part) {
  fs.writeFileSync(processed(part), contents);
}

const strippedParts = parts.map(processPart);
strippedParts.forEach(([contents, part]) => writeProcessedPart(contents, part));

const fullText = strippedParts.map(([c]) => c).join(" ");

fs.writeFileSync(processed("full.txt"), fullText);
