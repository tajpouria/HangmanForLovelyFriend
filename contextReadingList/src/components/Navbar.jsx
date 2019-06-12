import React from 'react';

export default function Navbar() {
  return (
    <ul className="nav nav-tabs" id="navId">
      <li className="nav-item">
        <a href="#tab1Id" className="nav-link active">
          Context Reading List
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#tab2Id">
            Action
          </a>
          <a className="dropdown-item" href="#tab3Id">
            Another action
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="#tab4Id">
            Action
          </a>
        </div>
      </li>
      <li className="nav-item">
        <a href="#tab5Id" className="nav-link">
          Another link
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link disabled">
          Disabled
        </a>
      </li>
    </ul>
  );
}
