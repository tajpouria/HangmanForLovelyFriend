import React from 'react';

export default function Cell({ coords, lightsOn, cellClick }) {
  const handleClick = () => {
    cellClick(coords);
  };

  return <div onClick={handleClick} className={lightsOn ? 'Cell-lightsOn' : 'Cell'} />;
}
