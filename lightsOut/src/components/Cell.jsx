import React from 'react';

export default function Cell({ coords, lightsOn }) {
  const handleClick = () => {
    console.log(coords);
  };
  return <div onClick={handleClick} className={lightsOn ? 'Cell-lightsOn' : 'Cell'} />;
}
