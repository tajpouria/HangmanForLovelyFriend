import React from 'react';

export default function Die({ children, lock, id }) {
  const handleLock = () => lock(id);
  const renderDieClass = () => {
    switch (children) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      case 6:
        return 'six';
      default:
        return 'six';
    }
  };

  return <i onClick={handleLock} className={`Die fas fa-dice-${renderDieClass()}`} />;
}
