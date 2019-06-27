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
  SmallStraight,
  LongStraight,
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
      totalScore: 0,
      rollCounter: 0,
      shouldRoll: true,
    };

    this.rollDices = this.rollDices.bind(this);
    this.lock = this.lock.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  setScore(children, score) {
    const { NUMBER_OF_DIES } = this.props;

    if (score) {
      this.setState(st => ({ totalScore: st.totalScore + score, shouldRoll: true }));
      this.setState((st) => {
        st.scores[children.replace(/\s/g, '').toLowerCase()].used = true;
        return {
          scores: st.scores,
          rollCounter: 0,
          dies: Array(NUMBER_OF_DIES).fill({
            side: Math.ceil(Math.random() * 6),
            locked: false,
          }),
        };
      });
    }
  }

  rollDices() {
    const newDies = [];
    const { dies } = this.state;
    dies.map((die) => {
      if (die.locked) return newDies.push(die);
      const newDie = { ...die, id: uuid(), side: Math.ceil(Math.random() * 6) };
      newDies.push(newDie);
    });

    this.setState(st => ({
      rollCounter: st.rollCounter + 1,
      dies: newDies,
      shouldRoll: false,
    }));

    this.setState(
      ({
        scores: {
          one,
          two,
          three,
          four,
          five,
          six,
          onepair,
          twopair,
          threeofakind,
          fourofakind,
          fullhouse,
          smallstraight,
          longstraight,
          chance,
          yatzy,
        },
      }) =>
      // whenever a score clicked it and it's type
      // should not change till user press restart

      // for first roll this setState should invoked

        // for next rolls this setState or another setState should invoke if the
        // score property does not have used prop
        ({
          scores: {
            one: one && one.used ? one : new UpperScore(newDies).one(),
            two: two && two.used ? two : new UpperScore(newDies).two(),
            three: three && three.used ? three : new UpperScore(newDies).three(),
            four: four && four.used ? four : new UpperScore(newDies).four(),
            five: five && five.used ? five : new UpperScore(newDies).five(),
            six: six && six.used ? six : new UpperScore(newDies).six(),
            onepair: onepair && onepair.used ? onepair : new OnePair(newDies).isPair(),
            twopair: twopair && twopair.used ? twopair : new TwoPair(newDies).isPair(),
            threeofakind:
              threeofakind && threeofakind.used ? threeofakind : new ThreeOfAKind(newDies).isKind(),
            fourofakind:
              fourofakind && fourofakind.used ? fourofakind : new FourOfAKind(newDies).isKind(),
            fullhouse: fullhouse && fullhouse.used ? fullhouse : new FullHouse(newDies).isFullHouse(),
            smallstraight:
              smallstraight && smallstraight.used
                ? smallstraight
                : new SmallStraight(newDies).isStraight(),
            longstraight:
              longstraight && longstraight.user
                ? longstraight
                : new LongStraight(newDies).isStraight(),
            chance: chance && chance.used ? chance : new Chance(newDies).isChance(),
            yatzy: yatzy && yatzy.used ? yatzy : new Yatzy(newDies).isYatzy(),
          },
        }),
    );
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
    const {
      dies, scores, totalScore, rollCounter, shouldRoll,
    } = this.state;
    const { upperScores, lowerScores } = this.props;
    return (
      <div className="Game">
        <Header rollCounter={rollCounter} rollDices={this.rollDices}>
          <Dice lock={this.lock} dice={dies} />
        </Header>
        <ScoreBoard
          setScore={this.setScore}
          scores={scores}
          upperScores={upperScores}
          lowerScores={lowerScores}
          shouldRoll={shouldRoll}
        />
        <p>
          Total Score :
          {'  '}
          {totalScore}
        </p>
      </div>
    );
  }
}
