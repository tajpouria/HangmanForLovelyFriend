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
} from './scores';

class Rule {
  constructor(dice) {
    this.dice = dice.map(die => die.side).sort();
  }

  sum(dice) {
    return dice && dice.length >= 1 ? dice.reduce((prev, curr) => prev + curr) : dice;
  }

  isSame() {
    const sameDice = [];
    this.dice.map((die, i) => {
      (die === this.dice[i + 1] || die === this.dice[i - 1]) && sameDice.push(die);
    });
    return sameDice;
  }

  isSameToGive(die) {
    const sameToDie = [];
    this.dice.map(d => d === die && sameToDie.push(die));
    return sameToDie.length === 0 ? undefined : sameToDie;
  }
}

class OnePair extends Rule {
  constructor(args) {
    super(args);

    this.setSameDice = [...new Set(this.isSame())];

    this.scoreCalculator = function scoreCalculator() {
      const { setSameDice } = this;

      switch (this.setSameDice.length) {
        case 1:
          return this.sum([setSameDice[0], setSameDice[0]]);
        case 2:
          return this.sum([setSameDice[1], setSameDice[1]]);
        default:
          return undefined;
      }
    };
  }

  isPair() {
    return this.setSameDice.length >= 1 && { type: ONE_PAIR, score: this.scoreCalculator() };
  }
}

class TwoPair extends Rule {
  constructor(args) {
    super(args);
    this.sameDice = this.isSame();
    this.setSameDice = [...new Set(this.isSame())];

    this.scoreCalculator = function scoreCalculator() {
      const { setSameDice, sameDice } = this;

      if (setSameDice.length === 2) return this.sum([setSameDice[0], setSameDice[0], setSameDice[1], setSameDice[1]]);

      if (sameDice.length === 4 && setSameDice.length === 1) return { type: TWO_PAIR, score: this.sum(sameDice) };

      if (sameDice.length === 5 && setSameDice.length === 1) {
        sameDice.pop();
        return { type: TWO_PAIR, score: this.sum(sameDice) };
      }
      return undefined;
    };
  }

  isPair() {
    if (this.setSameDice.length >= 2) return { type: TWO_PAIR, score: this.scoreCalculator() };
  }
}

class ThreeOfAKind extends Rule {
  isKind() {
    const sameDice = this.isSame();

    if (sameDice.length >= 4 && [...new Set(sameDice)].length === 1) return { type: THREE_OF_A_KIND, score: this.sum(sameDice) };
  }
}
class FourOfAKind extends Rule {
  isKind() {
    const sameDice = this.isSame();

    if (sameDice.length >= 4 && [...new Set(sameDice)].length === 1) return { type: FOUR_OF_A_KIND, score: this.sum(sameDice) };
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
        sameDice[0] === 2 && sameDice[i] + 1 === sameDice[i + 1] && longStraightBool.push(true);
        sameDice[0] === 1 && sameDice[i] + 1 === sameDice[i + 1] && smallStraightBool.push(true);
      }
      return { longStraightBool, smallStraightBool };
    };
  }

  isStraight() {
    const { dice } = this;

    if (this.increasingStraight(dice).longStraightBool.length === 4) return { type: LONG_STRAIGHT, score: 20 };
    if (this.increasingStraight(dice).smallStraightBool.length === 4) return { type: SMALL_STRAIGHT, score: 15 };
  }
}

class Chance extends Rule {
  isChance() {
    return { type: CHANCE, score: this.sum(this.dice) };
  }
}

class Yatzy extends Rule {
  isYatzy() {
    const sameDice = this.isSame();

    if (sameDice.length === 5) return { type: YATZY, score: 50 };
  }
}

class UpperScore extends Rule {
  one() {
    const score = this.sum(this.isSameToGive(1));
    return { type: ONE, score };
  }

  two() {
    const score = this.sum(this.isSameToGive(2));
    return { type: TWO, score };
  }

  three() {
    const score = this.sum(this.isSameToGive(3));
    return { type: THREE, score };
  }

  four() {
    const score = this.sum(this.isSameToGive(4));
    return { type: FOUR, score };
  }

  five() {
    const score = this.sum(this.isSameToGive(5));
    return { type: FIVE, score };
  }

  six() {
    const score = this.sum(this.isSameToGive(6));
    return { type: SIX, score };
  }
}

export {
  UpperScore,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FourOfAKind,
  FullHouse,
  Straight,
  Chance,
  Yatzy,
};
