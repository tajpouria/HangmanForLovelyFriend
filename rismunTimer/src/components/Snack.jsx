import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Snack({ toggleSnack }) {
  useEffect(() => {
    setTimeout(() => {
      toggleSnack();
    }, 3000);
  }, []);
  return (
    <div id="snackbar">
      <h1>HERE YOUR ARE 😃!</h1>
    </div>
  );
}

Snack.propTypes = {
  toggleSnack: PropTypes.func.isRequired,
};
