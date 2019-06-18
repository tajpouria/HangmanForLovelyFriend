import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      isWinner: false,
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
    row = parseInt(row, 10);
    col = parseInt(col, 10);

    const { cells } = this.state;
    const newCells = [...cells];

    newCells[row][col] = !newCells[row][col];
    if (row > 0) newCells[row - 1][col] = !newCells[row - 1][col];
    if (col > 0) newCells[row][col - 1] = !newCells[row][col - 1];
    if (row < newCells.length - 1) newCells[row + 1][col] = !newCells[row + 1][col];
    if (col < newCells[row].length - 1) newCells[row][col + 1] = !newCells[row][col + 1];

    this.setState({ cells: newCells });

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        if (cells[i][j]) return;
      }
    }

    this.setState({ isWinner: true });
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
    const { cells, isWinner } = this.state;

    return isWinner ? (
      <div className="Board-title">
        <h2 className="Board-neon">YOU</h2>
        <h2 className="Board-flux">WIN!</h2>
      </div>
    ) : (
      <div className="Board">
        <div className="Board-title">
          <h2 className="Board-neon">LIGHTS</h2>
          <h2 className="Board-flux">OUT</h2>
        </div>
        <table className="Board-table">
          <tbody>
            {cells.map((row, idx) => (
              <tr key={Math.random()}>{this.renderBoard(row, idx)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Board.propTypes = {
  nCol: PropTypes.number,
  nRow: PropTypes.number,
  lightsOnChance: PropTypes.number,
};
