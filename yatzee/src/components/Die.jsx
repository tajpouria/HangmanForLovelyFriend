import React from 'react';

export default function Die({ children, lock, id }) {
  const handleLock = () => lock(id);

  return <div onClick={handleLock}>{children}</div>;
}
