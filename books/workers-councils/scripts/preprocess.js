const fs = require("fs");
const path = require("path");

function part(ppath) {
  return path.join(__dirname, "..", "parts", ppath);
}

const parts = fs.readdirSync(path.join(__dirname, "..", "parts"));

console.log(`${parts.length} parts found.`);

function processPart(partPath) {
  const absolutePath = part(partPath);
  const contents = fs.readFileSync(absolutePath).toString();
  console.log(`${partPath} : ${contents.length} characters`);
  const stripped = contents.replace(/(\r\n|\n|\r)/gm, "");
  fs.writeFileSync(path.join(__dirname, "..", "processed", partPath), stripped);
}

parts.forEach(processPart);
