import uuid from 'uuid/v4';

export default function bookReducer(state, { type, payload: { title, author, id } }) {
  switch (type) {
    case 'ADD_BOOK':
      return [...state, { title, author, id: uuid() }];
    case 'REMOVE_BOOK':
      return state.filter(book => book.id !== id);
    default:
      return state;
  }
}
