import React from 'react';
import PropTypes from 'prop-types';

import Box from './Box';

export default function BoxContainer({ colors, boxN }) {
  return (
    <div className="BoxContainer">
      {Array.from({ length: boxN }).map(() => (
        <Box key={Math.random()} colors={colors} />
      ))}
    </div>
  );
}

BoxContainer.defaultProps = {
  boxN: 16,
  colors: [
    'red',
    'blue',
    'purple',
    'pink',
    'magenta',
    'orange',
    'yellow',
    'green',
    'maroon',
    'olive',
    'navy',
    'gray',
    'teal',
    'aqua',
    'lime',
    'violent',
    'kahfi',
  ],
};

BoxContainer.protTypes = {
  boxN: PropTypes.number,
  colors: PropTypes.array,
};
