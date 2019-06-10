import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import targetWord from '../middlewares/picker';
import mysteryWord from '../middlewares/makeMystery';
import PlaceHolder from './misc/PlaceHolder';
import Key from './misc/Key';
import HangPicture from './HangPicture';

class Game extends Component {
  constructor(props) {
    super(props);

    this.answer = [];
  }

  componentWillMount() {
    targetWord.map(() => this.answer.push('?'));
  }

  componentWillReceiveProps({ letter }) {
    this.answer.includes('?')
      && targetWord.includes(letter)
      && targetWord.map((targetLetter, i) => {
        targetLetter === letter && (this.answer[i] = letter);
      });
  }

  componentDidUpdate() {
    !this.answer.includes('?') && setTimeout(() => alert('WINNER'), 100);
  }

  render() {
    const renderPlaceholders = () => this.answer.map(letter => <PlaceHolder key={Math.random()}>{letter}</PlaceHolder>);

    const renderKeys = () => mysteryWord.map(letter => <Key key={Math.random()}>{letter}</Key>);

    return (
      <div className="container">
        <HangPicture />
        <div className="placeholderContainer row container">{renderPlaceholders()}</div>
        <div className="keysContainer row container">{renderKeys()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ compare: { letter } }) => ({ letter });

Game.propTypes = {
  letter: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default connect(mapStateToProps)(Game);
/*
PHASE ONE
1. have an array of words system will pick once randomly
TODO:1 an separate array and a picker component
2. count numbers of words and make a box for each for
TODO:2 add word counter to picker component
  -needs to thinking about space between two words
3. CHALLENGE: system should throw a number of key words that contain correct words
TODO:3 make a key button and keys container and throw target word words as key
TODO:4 mix this words with some other words
  -the number of words that thrown should depend on the answer words count
PHASE TWO
1.user can click on each key if key is true place it it's place and it's not add false to an array
TODO:1 place each word at it's place and appear that if same word is clicked
PHASE THREE
1. winner and loser
TODO:1.loser is who's have 6 incorrect guess winner is who's guess the targetWord in less than 6 false guess
-picture will be more complete whenever user have incorrect guess
*/
