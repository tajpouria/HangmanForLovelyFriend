import React from 'react';

export default function Score({
  children, scores, setScore, shouldRoll,
}) {
  const scoreState = scores[children.replace(/\s/g, '').toLowerCase()];

  const handleSetScore = () => (scoreState ? setScore(children, scoreState.score) : setScore(children, undefined));
  return (
    <div className="Score" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        type="button"
        onClick={handleSetScore}
        disabled={(scoreState && scoreState.used) || shouldRoll}
        className={`Score-${scoreState && scoreState.used && 'used'}`}
      >
        {children}
      </button>
      {scoreState && <div>{scoreState.score}</div>}
    </div>
  );
}
