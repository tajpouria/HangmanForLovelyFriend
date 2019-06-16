import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Die from './Die';

export default class RollDice extends Component {
  static defaultProps = {
    sides: ['one', 'two', 'three', 'four', 'five', 'six'],
  };

  constructor(props) {
    super(props);
    this.state = {
      sideOne: 'six',
      sideTwo: 'six',
      isRolling: false,
    };

    const { sides } = this.props;
    this.randomCustomizeNumber = () => Math.floor(Math.random() * sides.length);
    this.handleRolling = this.handleRolling.bind(this);
  }

  handleRolling() {
    const { sides } = this.props;

    this.setState({ isRolling: true });
    this.setState({ sideOne: sides[this.randomCustomizeNumber()] });
    this.setState({ sideTwo: sides[this.randomCustomizeNumber()] });

    setTimeout(() => this.setState({ isRolling: false }), 1000);
  }

  render() {
    const { sideOne, sideTwo, isRolling } = this.state;
    return (
      <div className="RollDice">
        <div>
          <Die side={sideOne} shaking={isRolling} />
          <Die side={sideTwo} shaking={isRolling} />
        </div>
        <button
          disabled={isRolling}
          onClick={this.handleRolling}
          type="button"
          className="btn-warning"
        >
          {isRolling ? 'Rolling...' : 'Roll'}
        </button>
      </div>
    );
  }
}

RollDice.propTypes = {
  sides: PropTypes.array,
};
