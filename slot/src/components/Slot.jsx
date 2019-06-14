import React from 'react';

export default function Slot({ s1, s2, s3 }) {
  const winner = s1 === s2 && s1 === s3;
  return (
    <div className="container">
      <h1>SLOT MACHINE</h1>
      <p>
        {s1}
        {s2}
        {s3}
      </p>
      <div className={winner ? 'win' : 'lose'}>{winner ? 'YOU WIN' : 'YOU LOSE'}</div>
    </div>
  );
}
