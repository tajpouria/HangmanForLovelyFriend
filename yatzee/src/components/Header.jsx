import React from 'react';

export default function Header({ children, rollDices, rollCounter }) {
  const handleRollDices = () => rollDices();
  return (
    <div className="Header">
      <div className="box">
        <h1 className="content">YATZY</h1>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div>{children}</div>
      <button
        className="btn draw-border"
        disabled={rollCounter === 3}
        onClick={handleRollDices}
        type="button"
      >
        Roll it
      </button>
    </div>
  );
}
