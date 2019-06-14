import React from 'react';

import { ThemeContext } from '../context/ThemeContext';

export default function ToggleThemeButton() {
  return (
    <ThemeContext.Consumer>
      {context => (
        <button onClick={() => context.toggleTheme()} type="button" className="btn btn-primary">
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
