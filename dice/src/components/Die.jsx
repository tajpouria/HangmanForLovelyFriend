import React from 'react';
import PropTypes from 'prop-types';

export default function Die({ side, shaking }) {
  return <i className={`Die fas fa-dice-${side} ${shaking && 'shaking'}`} />;
}

Die.propTypes = {
  side: PropTypes.string.isRequired,
  shaking: PropTypes.bool.isRequired,
};
