import React from 'react';
import PropTypes from 'prop-types';

export default function PlaceHolder({ children }) {
  return (
    <div className="">
      <div className="btn">{children}</div>
    </div>
  );
}
