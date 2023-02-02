// ERROR HANDLING
class ResponseError extends Error {
    constructor(message, response) {
        super(message);
        this.response = response;
    }
}

function handleError(error, queryParams) {
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

// DOM elements
const dataCardElement = document.querySelector('[data-card]');
const searchForm = document.querySelector('[search-form]');
const pokeNameElement = document.querySelector('[poke-name]');
const pokeImgElement = document.querySelector('[poke-img]');
const notificationsElement = document.querySelector('[data-notifications]');
const toastElement = document.querySelector('[data-toast]');

const prevButton = document.querySelector('[btn-prev]');
const nextButton = document.querySelector('[btn-next]');

// API
const requestURL = new URL('https://pokeapi.co/');
const prefixURL = 'api/v2/';

// GLOBALS
let currentPokemonOffset;

const lastPokemonIndex = async function() { } 

// event listeners
searchForm.addEventListener('submit', handleFormSubmit );
// prevButton.addEventListener('click', prevPokemon );
nextButton.addEventListener('click', nextPokemon );

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.target));
    getAndDisplayPokemon(form.pokemon.toLowerCase());
}

function setCurrentPokemon(pokemon) {
    currentPokemonIndex = pokemon.id;
}

async function nextPokemon() {
    // https://pokeapi.co/api/v2/pokemon/?offset=1007&limit=1
    // averiguar cual es la pagina donde sale este pokemon
    const currentPokemonPage = await fetchPage('pokemon', )
    
    // averiguar cual es la proxima pagina 
    // averiguar cuál es el próximo pokemon de la pagina del proximo

    
/*     const nextPage = await fetchPage('pokemon', currentPokemonIndex, 1);
    const nextPokemonName = nextPage.results[0].name;

    getAndDisplayPokemon(nextPokemonName); */
}

async function getAndDisplayPokemon(name) {
    notifyUser('Buscando...', 'toast-info');
    clearResults();
    clearNotifications();
    
    const pokemon = await fetchFromAPI('pokemon', name);
    setCurrentPokemon(pokemon);

    if (pokemon) {
        clearNotifications();
        displayPokemon(pokemon);    
    }
}

function displayPokemon(pokemon) {
    pokeNameElement.textContent = pokemon.forms[0].name;
    pokeImgElement.setAttribute('src', 
                                pokemon.sprites.other['official-artwork'].front_default);
    pokeImgElement.setAttribute('alt', pokemon.forms[0].name);
    pokeImgElement.setAttribute('title', pokemon.forms[0].name);

    dataCardElement.classList.remove('hidden');

    // buttons

    prevButton.disabled = false;
    nextButton.disabled = false;

    if (pokemon.id === 1) {
        prevButton.disabled = true;
    }
    if (pokemon.id === lastPokemonIndex) {
        nextButton.disabled = true;
    }
} 

function clearResults(){
    dataCardElement.classList.add('hidden');
}

// FETCH

async function myFetch(...options) {
    const response = await fetch(...options);
    if (!response.ok) {
        throw new ResponseError('Ocurrió un error', response);
    }
    return response;
}

async function fetchFromAPI(resource, queryParams) {
    requestURL.pathname = `${prefixURL}${resource}/${queryParams}`;
    let data = ''; 
    try {
        const response = await myFetch(requestURL);
        data = await response.json();
        return data;
    } catch(error) {
        handleError(error, queryParams);
    }
}

async function fetchPage(resource, offset, limit) {
    requestURL.pathname = `${prefixURL}${resource}`;
    requestURL.searchParams.append('offset', offset);
    requestURL.searchParams.append('limit', limit);
    let data = ''; 
    try {
        const response = await myFetch(requestURL);
        data = await response.json();
        return data;
    } catch(error) {
        handleError(error, '');
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




