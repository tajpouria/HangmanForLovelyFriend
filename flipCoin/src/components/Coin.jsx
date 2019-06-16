import React from 'react';

export default function Coin({ side }) {
  return <img className="Coin" src={`src/assets/${side}.png`} alt={side} />;
}
