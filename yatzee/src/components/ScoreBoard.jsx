import React from 'react';

import Score from './Score';

export default function ScoreBoard({
  upperScores, lowerScores, scores, setScore, shouldRoll,
}) {
  return (
    <div className="ScoreBoard">
      <div className="ScoreBoard-scores">
        <h1>UpperScores</h1>
        {upperScores.map(({ type }) => (
          <Score setScore={setScore} scores={scores} key={type} shouldRoll={shouldRoll}>
            {type}
          </Score>
        ))}
      </div>
      <div className="ScoreBoard-scores">
        <h1>LowerScores</h1>
        {lowerScores.map(({ type }) => (
          <Score setScore={setScore} scores={scores} key={type} shouldRoll={shouldRoll}>
            {type}
          </Score>
        ))}
      </div>
    </div>
  );
}
