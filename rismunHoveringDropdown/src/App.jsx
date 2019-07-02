import React from 'react';
import DropDown from './components/DropDown';
import { file, edit } from './menuItems.json';

import './App.css';

export default function App() {
  return (
    <>
      <div className="DropDownContainer">
        <DropDown menuItems={file}>File</DropDown>
        <DropDown menuItems={edit}>Edit</DropDown>
        <DropDown menuItems={file}>File</DropDown>
        <DropDown menuItems={edit}>Edit</DropDown>
      </div>
    </>
  );
}
