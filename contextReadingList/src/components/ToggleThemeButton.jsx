import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

export default function ToggleThemeButton() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => toggleTheme()} type="button" className="btn btn-primary">
      Toggle Theme
    </button>
  );
}
