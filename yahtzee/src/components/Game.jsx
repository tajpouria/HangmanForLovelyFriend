import React, { Component } from 'react';
import uuid from 'uuid/v4';

import Dice from './Dice';
import Header from './Header';
import ScoreBoard from './ScoreBoard';

import {
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FourOfAKind,
  FullHouse,
  Straight,
  Chance,
  UpperScore,
  Yatzy,
} from '../helpers/rules';
import {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
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
    upperScores: [
      { type: ONE },
      { type: TWO },
      { type: THREE },
      { type: FOUR },
      { type: FIVE },
      { type: SIX },
    ],
    lowerScores: [
      { type: ONE_PAIR },
      { type: TWO_PAIR },
      { type: THREE_OF_A_KIND },
      { type: FOUR_OF_A_KIND },
      { type: SMALL_STRAIGHT },
      { type: LONG_STRAIGHT },
      { type: FULL_HOUSE },
      { type: CHANCE },
      { type: YATZY },
    ],
  };

  constructor(props) {
    super(props);
    const { NUMBER_OF_DIES } = this.props;
    this.state = {
      dies: Array(NUMBER_OF_DIES).fill({
        side: Math.ceil(Math.random() * 6),
        locked: false,
      }),
      scores: {},
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

    const upperScore = new UpperScore(newDies);
    const onePair = new OnePair(newDies);
    const twoPair = new TwoPair(newDies);
    const threeOfAKind = new ThreeOfAKind(newDies);
    const fourOfAKind = new FourOfAKind(newDies);
    const fullHouse = new FullHouse(newDies);
    const straight = new Straight(newDies);
    const chance = new Chance(newDies);
    const yatzy = new Yatzy(newDies);

    this.setState({
      dies: newDies,
      scores: {
        one: upperScore.one(newDies),
        two: upperScore.two(newDies),
        three: upperScore.three(newDies),
        four: upperScore.four(newDies),
        five: upperScore.five(newDies),
        six: upperScore.six(newDies),
        onePair: onePair.isPair(newDies),
        twoPair: twoPair.isPair(newDies),
        threeOfAKind: threeOfAKind.isKind(newDies),
        fourOfAKind: fourOfAKind.isKind(newDies),
        fullHouse: fullHouse.isFullHouse(),
        straight: straight.isStraight(newDies),
        chance: chance.isChance(),
        yatzy: yatzy.isYatzy(),
      },
    });
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
    const { dies, scores } = this.state;
    const { upperScores, lowerScores } = this.props;
    return (
      <div className="Game">
        <Header rollDices={this.rollDices}>
          <Dice lock={this.lock} dice={dies} />
        </Header>
        <ScoreBoard scores={scores} upperScores={upperScores} lowerScores={lowerScores} />
      </div>
    );
  }
}
