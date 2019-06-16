import React from 'react';

import './App.css';
import Lott from './components/Lott';

export default function App() {
  return (
    <div>
      <Lott />
      <Lott title="Friday Bonus" numberOfBall={4} />
    </div>
  );
}
