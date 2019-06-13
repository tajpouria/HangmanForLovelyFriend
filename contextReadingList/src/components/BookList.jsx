import React from 'react';

import { ThemeContext } from '../context/ThemeContext';

export default function BookList() {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        const { isLightTheme, light, dark } = context;
        const { syntax: color, bg: backgroundColor } = isLightTheme ? light : dark;

        return (
          <ul className="list-group">
            <li style={{ color, backgroundColor }} className="list-group-item">
              Cras justo odio
            </li>
            <li style={{ color, backgroundColor }} className="list-group-item">
              Dapibus ac facilisis in
            </li>
            <li style={{ color, backgroundColor }} className="list-group-item">
              Morbi leo risus
            </li>
            <li style={{ color, backgroundColor }} className="list-group-item">
              Porta ac consectetur ac
            </li>
            <li style={{ color, backgroundColor }} className="list-group-item">
              Vestibulum at eros
            </li>
          </ul>
        );
      }}
    </ThemeContext.Consumer>
  );
}
