import React from 'react';

export default function Score({ children, scores, setScore }) {
  const scoreState = scores[children.replace(/\s/g, '').toLowerCase()];

  const handleSetScore = () => (scoreState ? setScore(children, scoreState.score) : setScore(children, undefined));
  return (
    <div className="Score" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        onClick={handleSetScore}
        disabled={scoreState && scoreState.used}
        className={`Score-${scoreState && scoreState.used && 'used'}`}
      >
        {children}
      </button>
      {scoreState && <div>{scoreState.score}</div>}
    </div>
  );
}
