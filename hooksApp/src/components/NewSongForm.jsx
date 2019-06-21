import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewSongForm({ addSong }) {
  const [title, setTitle] = useState('');

  const handleChange = evt => setTitle(evt.target.value);

  function handleSubmit(evt) {
    evt.preventDefault();
    addSong(title);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="song">
        Add Song :
        <input
          onChange={handleChange}
          value={title}
          placeholder="my awesome song"
          id="song"
        />
      </label>
      <button type="submit" value="Add">
        Add
      </button>
    </form>
  );
}

NewSongForm.propTypes = {
  addSong: PropTypes.func.isRequired,
};
