import React from "react";
import { Link } from "react-router-dom";

const getTypeColor = (type) => {
  switch (type) {
    case "grass":
      return "#78C850";
    case "water":
      return "#6890F0";
    case "fire":
      return "#F08030";
    case "poison":
      return "#A040A0";
    default:
      return "#A8A878";
  }
};

const PokemonCard = ({ pokemon }) => {
  return (
    <div
      key={pokemon.id}
      className="w-[210px] bg-white rounded-[15px] shadow-md text-center p-5 transition-transform duration-200 ease-in-out cursor-pointer hover:scale-105"
    >
      <Link
        to={`/pokemon/${pokemon.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-[150px] h-[150px] mx-auto block"
        />
        <h3 className="w-[150px] mx-auto ">{pokemon.name}</h3>
      </Link>
      <div style={{ margin: "15px 0" }}>
        {pokemon.pokemon_v2_pokemontypes.map((typeInfo, index) => (
          <span
            key={index}
            style={{
              padding: "8px 15px",
              borderRadius: "25px",
              backgroundColor: getTypeColor(
                typeInfo.pokemon_v2_type.name.toLowerCase()
              ),
              color: "white",
              fontSize: "15px",
              fontWeight: "800",
              margin: "5px",
            }}
          >
            {typeInfo.pokemon_v2_type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
