import React from 'react';
import PropTypes from 'prop-types';

export default function Key({ children }) {
  return (
    <button className="btn btn-dark" type="button">
      {children}
    </button>
  );
}

Key.propTypes = {
  children: PropTypes.string.isRequired,
};
