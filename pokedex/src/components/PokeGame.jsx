import React from 'react';

import PokeDex from './PokeDex';

export default function PokeGame({ pokemons }) {
  const handOne = [];
  const handTwo = [...pokemons];

  while (handTwo.length > handOne.length) {
    const rndNumber = Math.floor(Math.random() * handTwo.length);
    handOne.push(handTwo[rndNumber]);
    handTwo.splice(rndNumber, 1);
  }

  const expReducer = pokes => pokes.reduce((a, b) => a + b.base_experience, 0);
  const OneIsWinner = expReducer(handOne) > expReducer(handTwo);

  return (
    <div className="PokeGame">
      <PokeDex exp={expReducer(handOne)} pokemons={handOne} isWinner={OneIsWinner} />
      <PokeDex exp={expReducer(handTwo)} pokemons={handTwo} isWinner={!OneIsWinner} />
    </div>
  );
}

PokeGame.defaultProps = {
  pokemons: [
    {
      id: 4,
      name: 'Charmander',
      type: 'fire',
      base_experience: 62,
    },
    {
      id: 7,
      name: 'Squirtle',
      type: 'water',
      base_experience: 63,
    },
    {
      id: 11,
      name: 'Metapod',
      type: 'bug',
      base_experience: 72,
    },
    {
      id: 12,
      name: 'Butterfree',
      type: 'flying',
      base_experience: 178,
    },
    {
      id: 25,
      name: 'Pikachu',
      type: 'electric',
      base_experience: 112,
    },
    {
      id: 39,
      name: 'Jigglypuff',
      type: 'normal',
      base_experience: 95,
    },
    {
      id: 94,
      name: 'Gengar',
      type: 'poison',
      base_experience: 225,
    },
    {
      id: 133,
      name: 'Eevee',
      type: 'normal',
      base_experience: 65,
    },
  ],
};
