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
} from './scores';

class Rule {
  constructor(dice) {
    this.dice = dice.map(die => die.side).sort();
  }

  sum(dice) {
    return dice.reduce((prev, curr) => prev + curr);
  }

  isSame() {
    const sameDice = [];
    this.dice.map((die, i) => {
      (die === this.dice[i + 1] || die === this.dice[i - 1]) && sameDice.push(die);
    });
    return sameDice;
  }
}

class Pair extends Rule {
  isPair() {
    const sameDice = this.isSame();

    if (sameDice.length === 2) return { type: ONE_PAIR, score: this.sum(sameDice) };
    if (sameDice.length === 4) return { type: TWO_PAIR, score: this.sum(sameDice) };
  }
}

class Kind extends Rule {
  isKind() {
    const sameDice = this.isSame();

    if (sameDice.length === 3) return { type: THREE_OF_A_KIND, score: this.sum(sameDice) };
    if (sameDice.length === 4) return { type: FOUR_OF_A_KIND, score: this.sum(sameDice) };
  }
}

class FullHouse extends Rule {
  isFullHouse() {
    const sameDice = this.isSame();

    if (sameDice.length === 5) return { type: FULL_HOUSE, score: this.sum(sameDice) };
  }
}

class Straight extends Rule {
  constructor(dies) {
    super(dies);
    this.increasingStraight = function increasingStraight(sameDice) {
      const smallStraightBool = [];
      const longStraightBool = [];
      for (let i = 0; i <= sameDice.length - 1; i++) {
        sameDice[i] === i + 2 ? longStraightBool.push(true) : longStraightBool.push(false);
        sameDice[i] === i + 1 ? smallStraightBool.push(true) : smallStraightBool.push(false);
      }
      return { longStraightBool, smallStraightBool };
    };
  }

  isStraight() {
    const { dice } = this;

    if (
      this.increasingStraight(dice).longStraightBool.length === 4
      && !this.increasingStraight(dice).longStraightBool.indexOf(false)
    ) return { type: LONG_STRAIGHT, score: 20 };
    if (
      this.increasingStraight(dice).smallStraightBool.length === 4
      && !this.increasingStraight(dice).longStraightBool.indexOf(false)
    ) return { type: SMALL_STRAIGHT, score: 15 };
  }
}

export {
  Pair, Kind, FullHouse, Straight,
};
