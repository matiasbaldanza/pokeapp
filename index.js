// DOM elements
const dataCardElement = document.querySelector('[data-card]');
const searchForm = document.querySelector('[search-form]');
const pokeNameElement = document.querySelector('[poke-name]');
const pokeImgElement = document.querySelector('[poke-img]');
const notificationsElement = document.querySelector('[data-notifications]');
const toastElement = document.querySelector('[data-toast]');


// API
const requestURL = new URL('https://pokeapi.co/');
const prefixURL = 'api/v2/';

// event listeners
searchForm.addEventListener('submit', handleFormSubmit );

async function handleFormSubmit(event) {
    event.preventDefault();
    clearResults();
    clearNotifications();

    const form = Object.fromEntries(new FormData(event.target));
    const pokemon = await getPokemonByName(form.pokemon);
    
    if (pokemon) {
        clearNotifications();
        displayPokemon(pokemon);    
    }
}


async function getPokemonByName(name) {
    notifyUser('Buscando...', 'toast-info');
    const pokemon = await fetchPokemon(name);
    return pokemon;
}

async function getPokemonByID(id) {
    const pokemon = await fetchPokemon(String(id));
    return pokemon
}

function displayPokemon(pokemon) {
    pokeNameElement.textContent = pokemon.forms[0].name;
    pokeImgElement.setAttribute('src', 
                                pokemon.sprites.other['official-artwork'].front_default);
    pokeImgElement.setAttribute('alt', pokemon.forms[0].name);
    pokeImgElement.setAttribute('title', pokemon.forms[0].name);

    dataCardElement.classList.remove('hidden');
} 

function clearResults(){
    dataCardElement.classList.add('hidden');
}

// ERROR HANDLING

class ResponseError extends Error {
    constructor(message, response) {
        super(message);
        this.response = response;
    }
}

// FETCH

async function myFetch(...options) {
    const response = await fetch(...options);
    if (!response.ok) {
        throw new ResponseError('Ocurrió un error', response);
    }
    return response;
}

async function fetchPokemon(queryParams) {
    requestURL.pathname = `${prefixURL}pokemon/${queryParams}`;
    let data = ''; 
    try {
        const response = await myFetch(requestURL);
        data = await response.json();
        return data;
    } catch(error) {
        switch (error.response.status) {
            case 404: 
                notifyUser(`${queryParams} no fue encontrado.`, 'toast-error'); 
                break;
            case 598: case 599: case 500: case 429:
                notifyUser(`Error de red. Intente más tarde.`, 'toast-error'); 
            break;
            default: notifyUser(`🔥 Error inesperado. Everything is fine... 🔥`, 'toast-error'); 
        }
    }
}

// NOTIFICATIONS

function notifyUser(message, typeClass) {
    notificationsElement.classList.add(typeClass);
    toastElement.textContent = message;
    notificationsElement.classList.remove('hidden');
}

function clearNotifications() {
    toastElement.textContent = '';
    notificationsElement.classList.remove('toast-info');
    notificationsElement.classList.remove('toast-error');
    notificationsElement.classList.add('hidden');
}




