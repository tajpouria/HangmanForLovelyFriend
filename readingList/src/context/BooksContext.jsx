import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import bookReducer from '../reducers/bookReducer';

export const BooksContext = createContext();

export default function BooksContextProvider({ children }) {
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    const storedBooks = JSON.parse(localStorage.getItem('books'));

    return storedBooks || [];
  });
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  return <BooksContext.Provider value={{ books, dispatch }}>{children}</BooksContext.Provider>;
}

BooksContextProvider.propTypes = {
  children: PropTypes.array.isRequired,
};
