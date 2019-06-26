import React, { useContext } from 'react';

import { BooksContext } from '../context/BooksContext';

export default function Navbar() {
  const { books } = useContext(BooksContext);
  return (
    <div className="Navbar">
      <h1 className="Navbar-header">Ninja Reading List</h1>
      <h4 className="Navbar-counter">
        There is
        {'  '}
        {books.length}
        {' '}
books to go through
      </h4>
    </div>
  );
}
