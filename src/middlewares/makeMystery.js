import targetWord from './picker';
import { alphabet } from '../config/words.json';

const randAlphabet = [];
// TODO: level just hardCoded for now
const level = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

level.map(() => randAlphabet.push(alphabet[Math.floor(Math.random() * alphabet.length)].split('')[0]));

console.log(randAlphabet);

export default [...new Set(randAlphabet.concat(targetWord).sort())];
