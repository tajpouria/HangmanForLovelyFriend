import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Coin from './Coin';

export default class Flipper extends Component {
  static defaultProps = {
    coins: ['heads', 'tails'],
  };

  constructor(props) {
    super(props);

    this.state = {
      flippedC: 0,
      headsC: 0,
      tailsC: 0,
      side: null,
    };

    this.handleFlip = this.handleFlip.bind(this);
  }

  handleFlip() {
    const { coins } = this.props;
    this.setState(st => ({ ...st, side: coins[Math.floor(Math.random() * coins.length)] }));

    const { side } = this.state;

    this.setState(st => (side === 'heads'
      ? { ...st, flippedC: st.flippedC + 1, headsC: st.headsC + 1 }
      : { ...st, flippedC: st.flippedC + 1, tailsC: st.tailsC + 1 }));
  }

  render() {
    const {
      flippedC, headsC, tailsC, side,
    } = this.state;
    return (
      <div className="Flipper">
        <h1>Lets flip a coin!</h1>
        <p>
          Your flipped Count :
          {' '}
          {flippedC}
          {' '}
coin, heads count :
          {' '}
          {headsC}
          {' '}
tails count :
          {' '}
          {tailsC}
          {' '}
.
        </p>
        <button onClick={this.handleFlip} type="button">
          FLIP
        </button>
        {side && <Coin side={side} />}
      </div>
    );
  }
}

Flipper.propTypes = {
  coins: PropTypes.array,
};
