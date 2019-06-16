import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Ball from './Ball';

export default class Lott extends Component {
  static defaultProps = {
    title: 'LOTTO',
    numberOfBall: 6,
    limit: 40,
  };

  constructor(props) {
    super(props);

    const { numberOfBall } = this.props;
    this.state = {
      numberOfBall: Array.from({ length: numberOfBall }),
    };

    this.generate = this.generate.bind(this);
  }

  generate() {
    const { numberOfBall } = this.state;
    const { limit } = this.props;
    const newNumberOfBall = [];
    numberOfBall.map(() => newNumberOfBall.push(Math.floor(Math.random() * limit) + 1));

    this.setState(() => ({ numberOfBall: newNumberOfBall }));
  }

  render() {
    const { title } = this.props;
    const { numberOfBall } = this.state;

    return (
      <section className="Loot">
        <h2>{title}</h2>
        <div>
          {numberOfBall.map(n => (
            <Ball key={Math.random()} number={n} />
          ))}
        </div>
        <button onClick={this.generate} type="button" className="btn-primary">
          Generate Numbers
        </button>
      </section>
    );
  }
}

Lott.propTypes = {
  title: PropTypes.string,
  numberOfBall: PropTypes.number,
  limit: PropTypes.number,
};
