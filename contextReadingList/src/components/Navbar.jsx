import React from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

export default function navBar() {
  return (
    <AuthContext.Consumer>
      {(authContext) => {
        const { isLoggedIn, toggleLogin } = authContext;

        return (
          <ThemeContext.Consumer>
            {(themeContext) => {
              const { isLightTheme, light, dark } = themeContext;
              const { syntax, ui } = isLightTheme ? light : dark;

              return (
                <div style={{ color: syntax, backgroundColor: ui }} className="nav-link active">
                  <h1>Context Reading List</h1>
                  <button onClick={toggleLogin} className="btn-link nav-link" type="button">
                    {isLoggedIn ? 'Logout' : 'Login'}
                  </button>
                </div>
              );
            }}
          </ThemeContext.Consumer>
        );
      }}
    </AuthContext.Consumer>
  );
}
