import React from 'react';

export default function Score({
  children, scores, setScore, shouldRoll,
}) {
  const scoreState = scores[children.replace(/\s/g, '').toLowerCase()];

  const handleSetScore = () => setScore(children, children);
  return (
    <div className="Score" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        type="button"
        onClick={handleSetScore}
        disabled={(scoreState && scoreState.used) || shouldRoll}
        className={`Score ${scoreState && scoreState.used && 'used'}`}
      >
        {children}
      </button>
      <div>
        {scoreState && (
          <span className="fa-stack fa-lg">
            <i className={`fa ${scoreState.score === 0 ? 'fa-zero' : 'fa-tag'} fa-stack-2x`} />
            <i className="fa fa-stack-1x fa-inverse">{scoreState.score}</i>
          </span>
        )}
      </div>
    </div>
  );
}
