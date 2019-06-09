import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions';

function Key({ children, compareLetter }) {
  return (
    <button onClick={() => compareLetter(children)} className="btn btn-dark" type="button">
      {children}
    </button>
  );
}

Key.propTypes = {
  children: PropTypes.string.isRequired,
};

export default connect(
  null,
  actions,
)(Key);
