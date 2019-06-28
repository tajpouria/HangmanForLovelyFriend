import React from 'react';
import './App.css';

import BooksContextProvider from './context/BooksContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import NewBookForm from './components/NewBookLForm';

export default function App() {
  return (
    <>
      <BooksContextProvider>
        <Navbar />
        <BookList />
        <NewBookForm />
      </BooksContextProvider>
    </>
  );
}
