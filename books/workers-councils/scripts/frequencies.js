const util = require("./util");

const full = util.readFull();

const stripped = full
  .split(/[\ \.\,]/i)
  .map((word) =>
    word
      .split("")
      .filter((character) => /^[A-Za-z0-9\-\']+$/i.test(character))
      .join("")
      .toLocaleLowerCase()
  )
  .join(" ");

const englishWords = util.getWords();
const cities = util.getCities();

function isDictionary(word) {
  return cities.has(word) || englishWords.has(word);
}

/**
 *
 * @param {string} word
 */
function isWord(word) {
  if (!isDictionary(word)) {
    const hyphenated = word.split(/[-]+/);
    if (isDictionary(hyphenated.join(""))) {
      return true;
    }
    for (const token of hyphenated) {
      if (!isDictionary(token)) {
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
}

const wordSet = new Set(stripped.split(" ").filter(isWord));
const notIncluded = new Set(stripped.split(" ").filter((word) => !isWord(word)));
const words = Array.from(wordSet).sort();
const notWords = Array.from(notIncluded).sort();

util.writeProcessed("words.txt", words.join("\r\n"));
util.writeProcessed("not-words.txt", notWords.join("\r\n"));
