/*
  --- OPTIONS AND IDEAS ---

  1. Lorem Ipsum / Nonsense Text
  2. Number of paragraphs
  3. Words only?
*/

const fakeWords = require('fake-words');
// const loremIpsum = require('lorem-ipsum');
var loremIpsum = require('lorem-ipsum');
const randomLorem = require('random-lorem');
const randomWords = require('random-words');
const casual = require('casual');

exports.sayHello = sayHello;
exports.getLoremIpsumParagraphs = getLoremIpsumParagraphs;
exports.getFakeWords = getFakeWords;


function getLoremIpsumParagraphs() {
 var output = loremIpsum({
    count: 5                   // Number of words, sentences, or paragraphs to generate.
  , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
  , sentenceLowerBound: 5         // Minimum words per sentence.
  , sentenceUpperBound: 15        // Maximum words per sentence.
  , paragraphLowerBound: 3        // Minimum sentences per paragraph.
  , paragraphUpperBound: 7        // Maximum sentences per paragraph.
  , format: 'html'               // Plain text or html
  // , words: ['ad', 'dolor', ... ]  // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
  , random: Math.random           // A PRNG function. Uses Math.random by default
  // , suffix: EOL                   // The character to insert between paragraphs. Defaults to default EOL for your OS.
});
  return output;
} 

function getFakeWords(count) {
  return fakeWords.paragraph(count);
}

function sayHello() {
  return 'Hello from Random Text JS file...';
}