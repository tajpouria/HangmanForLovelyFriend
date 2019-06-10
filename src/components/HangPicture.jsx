import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function HangPicture({ hangman }) {
  useEffect(() => {
    hangman === 6 && setTimeout(() => alert('LOSER'), 100);
  }, [hangman]);

  return <img src={`../../assets/${hangman}.jpg`} alt="" className="img-thumbnail" />;
}

const mapStateToProps = ({ compare: { hangman } }) => ({ hangman });

HangPicture.propTypes = {
  hangman: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(HangPicture);
