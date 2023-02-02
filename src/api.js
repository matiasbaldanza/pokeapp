const API_BASE_URL = 'https://pokeapi.co/api/v2/';
const API_POKEMON = `${API_BASE_URL}pokemon`;

async function myFetch(url) {
    // query the API and return the results in json format
    const response = await fetch(url);
    return await response.json();
}

export async function fetchPokemon(name) {
    try {
        return await myFetch(`${API_POKEMON}/${name}`);
    } catch(error) {
        return null;
    }
}

export async function fetchAllPokemons(url) {
    // returns an array with all pokemons
}