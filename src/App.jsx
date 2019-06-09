import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Game from './components/Game';
import rootReducer from './reducers';

export default function App() {
  return (
    <Provider store={createStore(rootReducer, {}, applyMiddleware(thunk))}>
      <Game />
    </Provider>
  );
}
