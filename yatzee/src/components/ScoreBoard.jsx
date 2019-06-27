import React from 'react';

import Score from './Score';

export default function ScoreBoard({
  upperScores, lowerScores, scores, setScore, shouldRoll,
}) {
  return (
    <div>
      <h1>UPPER SCORES</h1>
      {upperScores.map(({ type }) => (
        <Score setScore={setScore} scores={scores} key={type} shouldRoll={shouldRoll}>
          {type}
        </Score>
      ))}
      <h1>LOWER SCORES</h1>
      {lowerScores.map(({ type }) => (
        <Score setScore={setScore} scores={scores} key={type} shouldRoll={shouldRoll}>
          {type}
        </Score>
      ))}
    </div>
  );
}
