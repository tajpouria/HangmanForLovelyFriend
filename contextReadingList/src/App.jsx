import React from 'react';

import ThemeContext from './context/ThemeContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';

export default function App() {
  return (
    <ThemeContext>
      <Navbar />
      <BookList />
    </ThemeContext>
  );
}
