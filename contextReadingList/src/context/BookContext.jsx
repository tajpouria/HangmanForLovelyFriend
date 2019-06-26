import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const BookContext = createContext();

export default function BookContextProvider({ children }) {
  const [books, setBooks] = useState([
    { title: 'Dapibus ac facilisis', id: 1 },
    { title: 'Morbi leo risus', id: 2 },
    { title: 'Porta ac consectetur ac', id: 3 },
    { title: 'Vestibulum at eros', id: 4 },
  ]);

  return <BookContext.Provider value={{ books }}>{children}</BookContext.Provider>;
}

BookContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
