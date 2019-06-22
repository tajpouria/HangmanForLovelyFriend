import React, { Component } from 'react';
import uuid from 'uuid/v4';

import Dice from './Dice';
import Header from './Header';

import {
  Pair, Kind, FullHouse, Straight,
} from '../helpers/rules';
import {
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  SMALL_STRAIGHT,
  LONG_STRAIGHT,
  CHANCE,
  YATZY,
} from '../helpers/scores';

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
    this.lock = this.lock.bind(this);
  }

  rollDices() {
    const newDies = [];
    const { dies } = this.state;
    dies.map((die) => {
      if (die.locked) return newDies.push(die);
      const newDie = { ...die, id: uuid(), side: Math.ceil(Math.random() * 6) };
      newDies.push(newDie);
    });

    this.setState(() => ({ dies: newDies }));
    const pair = new Pair(newDies);
    const kind = new Kind(newDies);
    const fullHouse = new FullHouse(newDies);
    const straight = new Straight(newDies);
    console.log(pair.isPair());
    console.log(kind.isKind());
    console.log(fullHouse.isFullHouse());
    console.log(straight.isStraight());
  }

  lock(id) {
    const newDies = [];
    const { dies } = this.state;
    dies.map((die) => {
      const newDie = die;
      if (die.id === id) newDie.locked = !newDie.locked;
      newDies.push(newDie);
    });

    this.setState({ dies: newDies });
  }

  render() {
    const { dies } = this.state;
    return (
      <Header rollDices={this.rollDices}>
        <Dice lock={this.lock} dice={dies} />
      </Header>
    );
  }
}
