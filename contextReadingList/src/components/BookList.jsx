import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { BookContext } from '../context/BookContext';

export default function BookList() {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const { books } = useContext(BookContext);

  const { syntax: color, bg: backgroundColor } = isLightTheme ? light : dark;

  return (
    <ul className="list-group">
      {books.map(({ title, id }) => (
        <li key={id} style={{ color, backgroundColor }} className="list-group-item">
          {title}
        </li>
      ))}
    </ul>
  );
}
