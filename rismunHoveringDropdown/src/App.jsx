import React from 'react';
import DropDown from './components/DropDown';
import { file } from './menuItems.json';

import './App.css';

export default function App() {
  return (
    <>
      <div className="DropDownContainer">
        <DropDown menuItems={file}>File</DropDown>
      </div>
    </>
  );
}
