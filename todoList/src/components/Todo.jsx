import React from 'react';

export default function Todo({ children }) {
  return (
    <div>
      <p>
        {children}
        {' '}
      </p>
      <button type="button">edit</button>
      <button type="button">X</button>
    </div>
  );
}
