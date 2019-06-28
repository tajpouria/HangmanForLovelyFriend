import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    //     transform: translate(5px, 10px) rotate(45deg)
    const xPos = Math.random() * 40 - 10;
    const yPos = Math.random() * 40 - 10;
    const deg = Math.random() * 90 - 45;

    this.transform = `translate(${xPos}px, ${yPos}px) rotate(${deg}deg)`;
  }

  render() {
    const { name, image } = this.props;

    return <img className="Card" style={{ transform: this.transform }} src={image} alt={name} />;
  }
}
