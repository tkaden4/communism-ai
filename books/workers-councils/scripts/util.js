const fs = require("fs");
const path = require("path");

exports.readFull = () => fs.readFileSync(path.join(__dirname, "..", "processed", "full.txt")).toLocaleString();

exports.writeProcessed = (file, contents) => fs.writeFileSync(path.join(__dirname, "..", "processed", file), contents);

exports.getWords = () =>
  new Set(
    fs
      .readFileSync(path.join(__dirname, "..", "..", "..", "english-dict.txt"))
      .toLocaleString()
      .split("\n")
      .map((x) => x.trim().toLowerCase())
  );

exports.getCities = () =>
  new Set(
    fs
      .readFileSync(path.join(__dirname, "..", "..", "..", "cities.txt"))
      .toLocaleString()
      .split("\n")
      .map((x) => x.trim().toLowerCase())
  );
