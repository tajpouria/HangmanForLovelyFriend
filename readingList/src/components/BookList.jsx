import React, { useContext } from 'react';

import { BooksContext } from '../context/BooksContext';

export default function BookList() {
  const { books, removeBook } = useContext(BooksContext);
  return (
    <ul className="BookList">
      {books.length ? (
        books.map(({ title, id }) => (
          <li onClick={() => removeBook(id)} className="BookList-item" key={id}>
            {title}
          </li>
        ))
      ) : (
        <li className="BookList-item">There is no book to read , happy free time ;) !! </li>
      )}
    </ul>
  );
}
