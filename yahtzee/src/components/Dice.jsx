import React from 'react';

import Die from './Die';

export default function Dice({ dice, lock }) {
  const handleLock = id => lock(id);

  return dice.map(({ side, id }) => (
    <Die id={id} lock={handleLock}>
      {side}
    </Die>
  ));
}
