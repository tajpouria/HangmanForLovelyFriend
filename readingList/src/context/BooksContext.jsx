import React, { createContext, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

export const BooksContext = createContext();

export default function BooksContextProvider({ children }) {
  const [books, setBooks] = useState([
    { title: 'Papa Hemingway ', author: 'ERNEST HEMINGWAY', id: uuid() },
    { title: "Joseph Conrad's Victory", author: 'JOAN DIDION', id: uuid() },
  ]);

  const addBook = ({ title, author }) => setBooks([...books, { title, author, id: uuid() }]);
  const removeBook = bookId => setBooks(books.filter(({ id }) => id !== bookId));

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook }}>{children}</BooksContext.Provider>
  );
}

BooksContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
