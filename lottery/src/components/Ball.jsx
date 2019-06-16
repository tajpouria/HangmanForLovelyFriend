import React from 'react';
import PropTypes from 'prop-types';

export default function Ball({ number }) {
  return <div className="Ball">{number}</div>;
}

Ball.defaultProps = {
  number: 0,
};

Ball.propTypes = {
  number: PropTypes.number,
};
