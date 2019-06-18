import React from 'react';

import ThemeContextProvider from './context/ThemeContext';
import AuthContextProvider from './context/AuthContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import ToggleThemeButton from './components/ToggleThemeButton';

export default function App() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Navbar />
        <BookList />
        <ToggleThemeButton />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}
