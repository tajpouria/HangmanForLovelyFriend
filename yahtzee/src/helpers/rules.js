class Rule {
  sum(dice) {
    dice.reduce((prev, curr) => prev + curr);
  }
}

export class Chance extends Rule {
  constructor(dice) {
    this.dice = dice;
  }

  calChance() {
    return this.sum(this.dice);
  }
}
