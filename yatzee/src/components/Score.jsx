import React from 'react';

export default function Score({ children, scores }) {
  const scoreState = scores[children.replace(' ', '').toLowerCase()];
  return (
    <div className="Score" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{children}</div>
      {scoreState && <div className="Score-score">{scoreState.score}</div>}
    </div>
  );
}
