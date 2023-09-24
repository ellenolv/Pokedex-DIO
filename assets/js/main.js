
const offset = 0;
const limit = 5;

const url = ` https://pokeapi.co/api/v2/pokemon?offset=${offset}&imit=${limit}`


function convertPokemonTypesToli(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToLi(pokemon = []) {
    return `
    <li class="pokemon">
    <span class="number">#${pokemon.order}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
            ${convertPokemonTypesToli(pokemon.types).join(' ')}
        </ol>

        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
    </div>
    
    </li>
    `
    
    
}



const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemon().then((pokemons) => {
/**
 * .MAP
 * O Value é o item da lista 
 * transforma a lista de pokemons em uma lista de nomes 
 */

    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('') 
                

    }) 
    //catch trata o erro da requisição
    .catch((error) => console.log(error)) 
    
