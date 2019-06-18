import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from './Box';

export default class BoxList extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handleRemove(id) {
    const { removeBox } = this.props;
    removeBox(id);
  }

  render() {
    const { boxes } = this.props;

    return boxes.map(({
      width, height, backgroundColor, id,
    }) => (
      <div key={id}>
        <Box width={`${width}em`} height={`${height}em`} backgroundColor={backgroundColor} />
        <button onClick={this.handleRemove.bind(this, id)} type="button">
          X
        </button>
      </div>
    ));
  }
}

BoxList.propTypes = {
  boxes: PropTypes.array.isRequired,
  removeBox: PropTypes.func.isRequired,
};
