// DOM elements
const dataCardElement = document.querySelector('[data-card]');
const pokeNameElement = document.querySelector('[poke-name]');
const pokeImgElement = document.querySelector('[poke-img]');

// API

const requestURL = new URL('https://pokeapi.co/api/v2/');

async function getPokemon(name) {
    requestURL.pathname += `pokemon/${name}`;
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
} 

const result = getPokemon('pikachu');
result.then((pokemonData) => displayPokemon(pokemonData));


