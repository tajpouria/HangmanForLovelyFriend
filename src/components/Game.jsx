import React from 'react';

import targetWord from '../middlewares/picker';
import PlaceHolder from './misc/PlaceHolder';

export default function Game() {
  const renderPlaceholders = () => targetWord.split('').map(() => <PlaceHolder key={Math.random()} />);

  return <div className="placeholder container">{renderPlaceholders()}</div>;
}

/*
PHASE ONE
1. have an array of words system will pick once randomly
TODO:1 an separate array and a picker component
2. count numbers of words and make a box for each for
TODO:2 add word counter to picker component
  -needs to thinking about space between two words
3. CHALLENGE: system should throw a number of key words that contain correct words
  -the number of words that thrown should depend on the answer words count
*/
