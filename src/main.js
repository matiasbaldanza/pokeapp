// import {  } from './store.js';
import { fetchPokemon } from './api.js';

// DOM elements
// 1. forms
const searchForm = document.querySelector('[search-form]');
const prevButton = document.querySelector('[btn-prev]');
const nextButton = document.querySelector('[btn-next]');

// 2. display 
const dataCardElement = document.querySelector('[data-card]');
const pokeNameElement = document.querySelector('[poke-name]');
const pokeImgElement = document.querySelector('[poke-img]');

// 3. notifications
const toastElement = document.querySelector('[data-toast]');
const notificationsElement = document.querySelector('[data-notifications]');

// EVENT LISTENERS
searchForm.addEventListener('submit', handleSearchPokemonSubmit)

async function handleSearchPokemonSubmit(event) {
    event.preventDefault();
    
    const pokemonName = formData['pokemon-name'].toLowerCase();

    // feedback al usuario 
    //          1. searching o un spinner... 
    //          2. deshabilitar el form para evitar multiples requests)
    
    const pokemon = await fetchPokemon(pokemonName);
    displayPokemon(pokemon);
}

function displayPokemon(pokemonData) {
    pokeNameElement.textContent = pokemonData.forms[0].name;
    pokeImgElement.setAttribute('src', pokemonData.sprites.other['official-artwork'].front_default)
    dataCardElement.classList.remove('hidden');
}

