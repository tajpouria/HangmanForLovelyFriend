import React, { Component } from 'react';

import { ThemeContext } from '../context/ThemeContext';

export default class Navbar extends Component {
  static contextType = ThemeContext;

  render() {
    const { isLightTheme, light, dark } = this.context;
    const { syntax, ui } = isLightTheme ? light : dark;
    return (
      <div
        style={{ color: syntax, backgroundColor: ui }}
        className="nav-link active"
      >
        Context Reading List
      </div>
    );
  }
}
