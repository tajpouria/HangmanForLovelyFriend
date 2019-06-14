import React from 'react';

import Slot from './components/Slot';

export default function App() {
  const symbols = ['🍎', '🍉', '🍓'];

  const pickRandomly = () => symbols[Math.floor(Math.random() * symbols.length)];

  return <Slot s1={pickRandomly()} s2={pickRandomly()} s3={pickRandomly()} />;
}
