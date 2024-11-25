import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import PokemonCard from "./PokemonCard";
import Header from "./Header";

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

function PokemonList() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const offset = (page - 1) * pageSize;
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: pageSize, offset },
  });
  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Error: {error.message}
      </p>
    );
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  const filteredPokemons = data.pokemon_v2_pokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      !selectedType ||
      pokemon.pokemon_v2_pokemontypes.some(
        (type) => type.pokemon_v2_type.name === selectedType
      );
    return matchesSearch && matchesType;
  });

  const sortedPokemons = filteredPokemons.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortOrder === "") {
      return filteredPokemons;
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <>
      <div className="flex flex-col items-center py-6 ">
        <div className="flex gap-4 mb-6 w-full max-w-3xl justify-center">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/4 p-3 rounded-md border border-gray-500 focus:outline-none"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="sm:w-1/4 p-3 rounded-md border border-gray-500"
          >
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="grass">Grass</option>
            <option value="poison">Poison</option>
            <option value="water">Water</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sm:w-1/4 p-3 rounded-md border border-gray-500"
          >
            <option value="">Sort </option>
            <option value="asc">Sort by Name (A-Z)</option>
            <option value="desc">Sort by Name (Z-A)</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-5 max-w-[900px] mx-auto justify-center">
          {sortedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex mt-6 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
