import React from 'react';

import targetWord from '../middlewares/picker';
import mysteryWord from '../middlewares/makeMystery';
import PlaceHolder from './misc/PlaceHolder';
import Key from './misc/Key';

export default function Game() {
  const renderPlaceholders = () => targetWord.map(() => <PlaceHolder key={Math.random()} />);

  const renderKeys = () => mysteryWord.map(letter => <Key key={Math.random()}>{letter}</Key>);

  return (
    <div className="container">
      <div className="placeholderContainer row container">{renderPlaceholders()}</div>
      <div className="keysContainer row container">{renderKeys()}</div>
    </div>
  );
}

/*
PHASE ONE
1. have an array of words system will pick once randomly
TODO:1 an separate array and a picker component
2. count numbers of words and make a box for each for
TODO:2 add word counter to picker component
  -needs to thinking about space between two words
3. CHALLENGE: system should throw a number of key words that contain correct words
TODO:3 make a key button and keys container and throw target word words as key
TODO:4 mix this words with some other words
  -the number of words that thrown should depend on the answer words count
*/
