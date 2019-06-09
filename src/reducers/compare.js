import { MATCH, NOT_MATCH } from '../actions/types';

const INITIAL_STATE = { letter: '' };

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case MATCH:
      return { letter: payload };
    case NOT_MATCH:
      return { letter: false };
    default:
      return state;
  }
}
