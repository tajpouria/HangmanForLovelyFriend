import { levelOne as levelOneWords } from '../config/words.json';
// TODO: should change to some another more stable db source
module.exports = levelOneWords[Math.floor(Math.random() * levelOneWords.length)];
