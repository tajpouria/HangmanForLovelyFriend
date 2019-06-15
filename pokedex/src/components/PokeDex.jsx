import React from 'react';

import PokeCard from './PokeCard';

export default function PokeDex({ pokemons, exp, isWinner }) {
  const winnerAndLoser = isWinner ? 'winner' : 'loser';
  return (
    <div className="PokeDex">
      <div>
        <h4 className="PokeDex-total">
Total Experience :
          {exp}
        </h4>
        <h4 className={`PokeDex-${winnerAndLoser}`}>{winnerAndLoser}</h4>
      </div>
      <div className="PokeDex-cardContainer">
        {pokemons.map(pokemon => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
