// DOM elements
const dataCardElement = document.querySelector('[data-card]');
const pokeNameElement = document.querySelector('[poke-name]');
const pokeImgElement = document.querySelector('[poke-img]');
const searchForm = document.querySelector('[search-form]');


// API
const requestURL = new URL('https://pokeapi.co/');
const prefixURL = 'api/v2/';

// event listeners
searchForm.addEventListener('submit', handleFormSubmit );

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.target));
    
    const pokemon = await getPokemonByName(form.pokemon);
    
    if (pokemon) displayPokemon(pokemon);
}


async function getPokemonByName(name) {
    const pokemon = await fetchPokemon(name);
    return pokemon;
}

async function getPokemonByID(id) {
    const pokemon = await fetchPokemon(String(id));
    return pokemon
}

async function fetchPokemon(queryParams) {
    requestURL.pathname = `${prefixURL}pokemon/${queryParams}`;
    let data = ''; 
    try {
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error('');
        }

        data = await response.json();
        return data;
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



