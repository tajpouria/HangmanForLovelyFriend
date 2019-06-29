import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
    };

    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    const { jokes } = this.state;
    const { numberOfJokes } = this.props;

    while (jokes.length < numberOfJokes) {
      this.getData();
    }
  }

  async getData() {
    const { data } = await axios.get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    this.setState(st => ({ jokes: [...st.jokes, data] }));
  }

  render() {
    const { jokes } = this.state;
    return jokes.length ? jokes.map(({ joke, id }) => <div key={id}>{joke}</div>) : '';
  }
}
