import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

export default function navBar() {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);
  const { isLightTheme, light, dark } = useContext(ThemeContext);

  const { syntax, ui } = isLightTheme ? light : dark;

  return (
    <div style={{ color: syntax, backgroundColor: ui }} className="nav-link active">
      <h1>Context Reading List</h1>
      <button onClick={toggleLogin} className="btn-link nav-link" type="button">
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}
