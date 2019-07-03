import React from 'react';
import DropDownContainer from './components/DropDownContainer';
import { data } from './menuItems.json';

import './App.css';

export default function App() {
  return (
    <>
      <div className="DropDownContainer">
        <DropDownContainer data={data} />
      </div>
    </>
  );
}
