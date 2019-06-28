import React, { Component } from 'react';

import Card from './Card';

const API_URL_BASE = 'https://deckofcardsapi.com/api/deck';

export default class Deck extends Component {
  constructor() {
    super();
    this.state = {
      cards: null,
      drawnCards: [],
    };
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  componentDidMount() {
    fetch(`${API_URL_BASE}/new/shuffle/`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(body => this.setState({ cards: body }))
      .catch(({ message }) => new Error(message));
  }

  handleAddCard() {
    const {
      cards: { deck_id },
    } = this.state;

    fetch(`${API_URL_BASE}/${deck_id}/draw/?count=1`, { method: 'GET' })
      .then(res => res.json())
      .then(({ cards }) => this.setState(st => ({
        drawnCards: [
          ...st.drawnCards,
          { name: `${cards[0].value}-${cards[0].code}`, image: cards[0].image },
        ],
      })));
  }

  render() {
    const { drawnCards } = this.state;
    return (
      <div className="Deck">
        <h1 className="Deck-title">card dealer</h1>
        <h2 className="Deck-subtitle">a demo used react</h2>
        <div>
          <button onClick={this.handleAddCard} type="button">
            Gimme a card
          </button>
        </div>
        {drawnCards.length
          ? drawnCards.map(({ name, image }) => <Card key={name} name={name} image={image} />)
          : ''}
      </div>
    );
  }
}
