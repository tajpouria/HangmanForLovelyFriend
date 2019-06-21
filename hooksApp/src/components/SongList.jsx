import React, { useState } from 'react';
import uuid from 'uuid/v4';

import NewSongForm from './NewSongForm';

export default function SongList() {
  const [songs, setSongs] = useState([
    { id: uuid(), title: 'I become so numb' },
    { id: uuid(), title: 'On fire' },
  ]);

  const addSong = title => setSongs([...songs, { id: uuid(), title }]);

  return (
    <div>
      <ul>
        {songs.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <NewSongForm addSong={addSong} />
    </div>
  );
}
