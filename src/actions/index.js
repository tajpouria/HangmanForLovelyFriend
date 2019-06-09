import { MATCH, NOT_MATCH } from './types';
import targetWord from '../middlewares/picker';

export const compareLetter = letter => dispatch => (targetWord.includes(letter)
  ? dispatch({ type: MATCH, payload: letter })
  : dispatch({ type: NOT_MATCH }));
