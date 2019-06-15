import React from 'react';
import PropTypes from 'prop-types';

const POKEMON_API = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

export default function PokeCard({
  pokemon: {
    id, name, type, base_experience,
  },
}) {
  const optimizeIdForPicture = pokemonId => (pokemonId <= 999 ? `00${pokemonId}`.slice(-3) : `${pokemonId}`);

  return (
    <div className="PokeCard">
      <div className="PokeCard-imgContainer">
        <img
          className="PokeCard-img"
          src={`${POKEMON_API}${optimizeIdForPicture(id)}.png`}
          alt=""
        />
      </div>
      <div>
        <h4 className="PokeCard-title">{name}</h4>
        <p className="PokeCard-text">
          Type:
          {type}
        </p>
        <p className="PokeCard-text ex">
          EX:
          {base_experience}
        </p>
      </div>
    </div>
  );
}

PokeCard.propTypes = {
  pokemon: PropTypes.object.isRequired,
};
