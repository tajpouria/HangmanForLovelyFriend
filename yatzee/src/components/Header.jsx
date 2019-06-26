import React from 'react';

export default function Header({ children, rollDices, rollCounter }) {
  const handleRollDices = () => rollDices();
  return (
    <div>
      <h1>yahtzee</h1>
      {children}
      <button disabled={rollCounter === 3} onClick={handleRollDices} type="button">
        Roll it
      </button>
    </div>
  );
}
