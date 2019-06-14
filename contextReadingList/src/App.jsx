import React from 'react';

import ThemeContextProvider from './context/ThemeContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import ToggleThemeButton from './components/ToggleThemeButton';

export default function App() {
  return (
    <ThemeContextProvider>
      <Navbar />
      <BookList />
      <ToggleThemeButton />
    </ThemeContextProvider>
  );
}
