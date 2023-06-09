import React, { useState, useEffect } from "react";

const Autocomplete = ({ setSelectedPokemon }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [newPokemon, setNewPokemon] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      const data = await response.json();
      const pokemon = data.results.map((result) => result.name);
      setFilteredPokemon(pokemon);
    }
    fetchPokemon();
  }, [inputValue]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setInputValue(inputValue);
    const filtered = inputValue
      ? filteredPokemon.filter((pokemon) =>
          pokemon.toLowerCase().startsWith(inputValue)
        )
      : [];
    setNewPokemon(filtered);
  };

  const handlePokemonClick = (event) => {
    setSelectedPokemon(event.target.textContent);
    // setTypeOneMultiplier([]);
    setInputValue("");
  };

  return (
    <div className='max-h-[300px] mt-4 overflow-y-scroll no-scrollbar'>
      <p>search for a pokemon</p>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className='border border-white outline-none px-2'
      />
      <ul>
        {inputValue.length > 2 &&
          newPokemon.map((pokemon) => (
            <li onClick={handlePokemonClick} key={pokemon}>
              {pokemon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
