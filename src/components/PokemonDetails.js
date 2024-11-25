import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      name
      height
      weight
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

function PokemonDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-xl text-red-600">Error: {error.message}</p>
    );

  const pokemon = data.pokemon_v2_pokemon_by_pk;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
      <div className="text-center sm:text-left">
        <h1 className=" flex  items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 capitalize mb-6">
          {pokemon.name}
        </h1>
        <img
          className="mx-auto w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-cover rounded-full shadow-xl border-4"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemon.name}
        />
        <div className="flex items-center justify-center space-x-3 mt-4">
          {pokemon.pokemon_v2_pokemontypes.map((t) => (
            <span
              key={t.pokemon_v2_type.name}
              className={`flex  items-center justify-center px-4 py-2 rounded-full text-white font-semibold ${getTypeColorClass(
                t.pokemon_v2_type.name
              )}`}
            >
              {t.pokemon_v2_type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8 sm:space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 sm:p-8 rounded-2xl shadow-lg text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">
            Height & Weight
          </h3>
          <p className="text-lg sm:text-xl">
            Height: <span className="font-semibold">{pokemon.height} dm</span>
          </p>
          <p className="text-lg sm:text-xl">
            Weight: <span className="font-semibold">{pokemon.weight} hg</span>
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Abilities
          </h3>
          <ul className="space-y-2 text-lg sm:text-xl text-gray-700">
            {pokemon.pokemon_v2_pokemonabilities.map((a) => (
              <li key={a.pokemon_v2_ability.name} className="text-lg">
                <span className="font-semibold">
                  {a.pokemon_v2_ability.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Stats
          </h3>
          <ul className="space-y-2 text-lg sm:text-xl text-gray-700">
            {pokemon.pokemon_v2_pokemonstats.map((s) => (
              <li key={s.pokemon_v2_stat.name} className="text-lg">
                <span className="font-semibold">{s.pokemon_v2_stat.name}:</span>{" "}
                {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const getTypeColorClass = (type) => {
  switch (type) {
    case "grass":
      return "bg-green-500";
    case "water":
      return "bg-blue-500";
    case "fire":
      return "bg-red-500";
    case "poison":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

export default PokemonDetails;
