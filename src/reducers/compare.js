import { MATCH, NOT_MATCH } from '../actions/types';

const INITIAL_STATE = { letter: '', hangman: 0 };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case MATCH:
      return { letter: payload, hangman: state.hangman };
    case NOT_MATCH:
      return { letter: false, hangman: state.hangman + 1 };
    default:
      return state;
  }
}
