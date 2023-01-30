// DOM elements
const dataCardElement = document.querySelector('[data-card]');
const pokeNameElement = document.querySelector('[poke-name]');
const pokeImgElement = document.querySelector('[poke-img]');

// API

const requestURL = new URL('https://pokeapi.co/api/v2/');

async function getPokemonByName(name) {
    const pokemon = await fetchPokemon(name);
    return pokemon;
}

async function getPokemonByID(id) {
    const pokemon = await fetchPokemon(String(id));
    return pokemon
}

async function fetchPokemon(queryParams) {
    requestURL.pathname += `pokemon/${queryParams}`;
    let data = ''; 
    try {
        const promise = await fetch(requestURL);
        data = await promise.json();
        return(data);
    } catch(error) {
        console.log(error);
    } 
}

function displayPokemon(pokemon) {
    pokeNameElement.textContent = pokemon.forms[0].name;
    pokeImgElement.setAttribute('src', 
                                pokemon.sprites.other['official-artwork'].front_default);
    pokeImgElement.setAttribute('alt', pokemon.forms[0].name);
    pokeImgElement.setAttribute('title', pokemon.forms[0].name);
} 

// const result = getPokemonByName('pikachu');
const result = getPokemonByID('1');
result.then((pokemonData) => displayPokemon(pokemonData));


