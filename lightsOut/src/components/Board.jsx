import React, { Component } from 'react';

import Cell from './Cell';

export default class Board extends Component {
  static defaultProps = {
    nCol: 5,
    nRow: 5,
    lightsOnChance: 0.1,
  };

  constructor(props) {
    super(props);

    this.state = {
      cells: [],
    };

    this.cellClicked = this.cellClicked.bind(this);
  }

  componentDidMount() {
    const { nCol, nRow, lightsOnChance } = this.props;

    const newArray = [];

    for (let i = 0; i < nCol; i++) {
      newArray.push([]);
      for (let j = 0; j < nRow; j++) {
        newArray[i].push(
          this.getRandom([
            { type: true, chance: lightsOnChance },
            { type: false, chance: 1 - lightsOnChance },
          ]),
        );
      }
    }

    this.setState(st => ({ cells: [...st.cells, ...newArray] }));
  }

  getRandom(list) {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const chance = item.chance / 10;
      for (let j = 0; j < chance; j++) {
        array.push(item.type);
      }
    }
    const idx = Math.floor(Math.random() * array.length);
    return array[idx];
  }

  cellClicked(coords) {
    let [row, col] = coords.split('-');
    row = parseInt(row);
    col = parseInt(col);

    const newCells = [...this.state.cells];
    newCells[row][col] = !newCells[row][col];
    newCells[row + 1][col] = !newCells[row + 1][col];
    newCells[row - 1][col] = !newCells[row - 1][col];
    newCells[row][col + 1] = !newCells[row][col + 1];
    newCells[row][col - 1] = !newCells[row][col - 1];

    console.log(newCells);

    this.setState({ cells: newCells });
  }

  renderBoard(row, idx) {
    const { cells } = this.state;

    const tableRow = [];

    for (let col = 0; col < cells[idx].length; col++) {
      tableRow.push(
        <td key={Math.random()}>
          <Cell cellClick={this.cellClicked} lightsOn={cells[idx][col]} coords={`${idx}-${col}`} />
        </td>,
      );
    }

    return tableRow;
  }

  render() {
    const { cells } = this.state;
    return (
      <table className="Board">
        <tbody>
          {cells.map((row, idx) => (
            <tr key={Math.random()}>{this.renderBoard(row, idx)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
}
