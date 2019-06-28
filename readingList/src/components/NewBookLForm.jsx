import React, { useState, useContext } from 'react';

import { BooksContext } from '../context/BooksContext';

export default function NewBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const { addBook } = useContext(BooksContext);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    return addBook({ title, author });
  };

  return (
    <form onSubmit={handleFormSubmit} className="NewBookForm">
      <h1>Add new book </h1>
      <div>
        <label htmlFor="title">
          <input
            value={title}
            onChange={evt => setTitle(evt.target.value)}
            type="text"
            placeholder="Book Title"
          />
        </label>
        <label htmlFor="author">
          <input
            value={author}
            onChange={evt => setAuthor(evt.target.value)}
            type="text"
            placeholder="Author"
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
