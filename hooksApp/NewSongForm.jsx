import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewSongList({ addSong }) {
  const [title, setTitle] = useState('');

  const handleChange = evt => setTitle(evt.target.value);

  function handleSubmit(evt) {
    evt.preventDefault();
    addSong(title);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="song">
        Add Song
        <input
          onChange={handleChange}
          value={title}
          placeholder="my awesome song"
          id="song"
        />
      </label>
      <button type="button" value="Add" />
    </form>
  );
}

NewSongList.propTypes = {
  addSong: PropTypes.func.isRequired,
};
