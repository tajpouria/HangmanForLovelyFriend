import React, { useState } from 'react';

import uuid from 'uuid/v4';

export default function SongList() {
  const [songs, setSongs] = useState([
    { id: uuid(), title: 'I become so numb' },
    { id: uuid(), title: 'On fire' },
  ]);

  const addSong = () => setSongs([...songs, { id: uuid(), title: 'newSong' }]);

  return (
    <div>
      <ul>
        {songs.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <button type="button" onClick={addSong}>
        Add song
      </button>
    </div>
  );
}
