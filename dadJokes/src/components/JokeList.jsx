import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import axios from 'axios';

export default class JokeList extends Component {
  static propTypes = {
    numberOfJokes: PropTypes.number,
  };

  static defaultProps = {
    numberOfJokes: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    const { joke } = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Access: 'application/json',
      },
    });
    // this.setState(st => ({ jokes: [...st.jokes, jokes] }));
  }

  render() {
    const { jokes } = this.state;
    return jokes.length ? jokes.map(({ joke, id }) => <div key={id}>{joke}</div>) : '';
  }
}
