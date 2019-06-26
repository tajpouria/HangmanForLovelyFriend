import React from 'react';
import './App.css';

import BooksContextProvider from './context/BooksContext';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <BooksContextProvider>
        <Navbar />
      </BooksContextProvider>
    </>
  );
}
