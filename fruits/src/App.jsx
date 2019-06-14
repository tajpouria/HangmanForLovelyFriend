import React from 'react';

import fruits from './fruits';
import { pick, remove } from './helper';

export default function App() {
  const fruit = pick(fruits);
  return (
    <div>
      <div id="display-3">
        Hi can i a
        {fruit}
        Please ??
      </div>
      <div id="display-3">
        Here your
        {fruit}
      </div>
      {remove(fruits, fruit)}
      <div id="display-3">Delicious can i have another please?</div>
      <div id="display-3">
        Sorry we out of it we got(
        {fruits.length}
) another sorts fruits
      </div>
    </div>
  );
}
