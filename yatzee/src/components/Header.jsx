import React from 'react';

export default function Header({ children, rollDices }) {
  const handleRollDices = () => rollDices();
  return (
    <div>
      <h1>yahtzee</h1>
      {children}
      <button onClick={handleRollDices} type="button">
        Roll it
      </button>
    </div>
  );
}
