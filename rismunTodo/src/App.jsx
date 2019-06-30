import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from './components/Board';

let CO_ID = 0;
let CA_ID = 0;

const initialCards = Array.from({ length: 9 }).map(() => ({
  id: ++CA_ID,
  title: `Card ${CA_ID}`,
}));

const initialColumns = ['TODO', 'In Progress yet..', 'Done'].map((title, i) => ({
  id: CO_ID++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map(card => card.id),
}));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: initialCards,
      columns: initialColumns,
    };
    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.addColumn = this.addColumn.bind(this);
  }

  addColumn(_title) {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++CO_ID,
      title,
      cardIds: [],
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn],
    }));
  }

  addCard(columnId, _title) {
    const title = _title.trim();
    if (!title) return;

    const newCard = { id: ++CA_ID, title };
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(column => (column.id === columnId ? { ...column, cardIds: [...column.cardIds, newCard.id] } : column)),
    }));
  }

  moveCard(cardId, destColumnId, index) {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          ids => (column.id === destColumnId
            ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
            : ids),
          ids => ids.filter(id => id !== cardId),
        )(column.cardIds),
      })),
    }));
  }

  render() {
    const { cards, columns } = this.state;
    return (
      <Board
        cards={cards}
        columns={columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
        addColumn={this.addColumn}
      />
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
