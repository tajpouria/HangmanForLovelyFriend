import React from 'react';

import ThemeContextProvider from './context/ThemeContext';
import AuthContextProvider from './context/AuthContext';
import BookContextProvider from './context/BookContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import ToggleThemeButton from './components/ToggleThemeButton';

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Navbar />
        <BookContextProvider>
          <BookList />
        </BookContextProvider>
        <ToggleThemeButton />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}
