import React, { Component } from 'react';

import Cell from './Cell';

export default class Board extends Component {
  static defaultProps = {
    nRow: 5,
    nCol: 5,
    lightsOnChance: 0.1,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.renderBoard.bind(this);
  }

  // getRandom(list) {
  //   const array = [];
  //   for (let i = 0; i < list.length; i++) {
  //     const item = list[i];
  //     const chance = item.chance / 10;
  //     for (let j = 0; j < chance; j++) {
  //       array.push(item.type);
  //     }
  //   }
  //   const idx = Math.floor(Math.random() * array.length);
  //   return array[idx];
  // }

  getRandom(resources) {
    const chanceTotal = resources.reduce((acc, val) => {
      acc += val.chance;
      return acc;
    }, 0);
    const randomVal = parseInt(Math.random() * chanceTotal);
    let chanceAcc = 0;
    let ans;
    resources.forEach((r) => {
      chanceAcc += r.chance;
      if (chanceAcc > randomVal && !ans) {
        ans = r;
      }
    });
    return ans;
  }

  renderBoard() {
    const { nRow, nCol, lightsOnChance } = this.props;

    let col = 0;
    let row = 0;

    return Array.from({ length: nRow }).map(() => {
      row = 0;
      col++;
      return (
        <tr key={`${col}-${row}`}>
          {Array.from({ length: nCol }).map(() => {
            row++;
            return (
              <td key={`${col}-${row}`}>
                <Cell
                  lightsOn={this.getRandom([
                    { type: true, chance: lightsOnChance },
                    { type: false, chance: 1 - lightsOnChance },
                  ])}
                  coords={`${col}-${row}`}
                />
              </td>
            );
          })}
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <tbody>{this.renderBoard()}</tbody>
      </table>
    );
  }
}
