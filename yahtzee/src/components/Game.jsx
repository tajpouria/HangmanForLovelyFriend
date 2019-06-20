import React, { Component } from 'react';

import Dice from './Dice';
import Header from './Header';

export default class Game extends Component {
  static defaultProps = {
    NUMBER_OF_DIES: 5,
  };

  constructor(props) {
    super(props);
    const { NUMBER_OF_DIES } = this.props;
    this.state = {
      dies: Array(NUMBER_OF_DIES).fill({
        side: Math.ceil(Math.random() * 6),
        locked: false,
      }),
    };

    this.rollDices = this.rollDices.bind(this);
  }

  rollDices() {
    const newDies = [];
    const { dies } = this.state;
    dies.map((die) => {
      const newDie = { ...die, side: Math.ceil(Math.random() * 6) };
      newDies.push(newDie);
    });

    this.setState(() => ({ dies: newDies }));
  }

  render() {
    const { dies } = this.state;
    return (
      <Header rollDices={this.rollDices}>
        <Dice dice={dies} />
      </Header>
    );
  }
}
