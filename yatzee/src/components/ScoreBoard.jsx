import React from 'react';

import Score from './Score';

export default function ScoreBoard({ upperScores, lowerScores, scores }) {
  // const passScore = () => score
  console.log(scores);
  return (
    <div>
      <h1>UPPER SCORES</h1>
      {upperScores.map(({ type }) => (
        <Score key={type}>{type}</Score>
      ))}
      <h1>LOWER SCORES</h1>
      {lowerScores.map(({ type }) => (
        <Score key={type}>{type}</Score>
      ))}
    </div>
  );
}
