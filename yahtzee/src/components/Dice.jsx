import React from 'react';

export default function Dice({ dice }) {
  return dice.map(({ side }) => <div>{side}</div>);
}
