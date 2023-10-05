const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


let offset = 0;
const limit = 5;
const maxRecords = 151;

const url = ` https://pokeapi.co/api/v2/pokemon?offset=${offset}&imit=${limit}` 

function loadPokemonItens(offset, limit) {
    
    pokeApi.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}"   data-number="${pokemon.number}" onclick="getPokemonDetails(this)">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types ">
                        ${pokemon.types.map((type) => `<li  class="type ${type}">${type}</li>`).join(' ')} 
                    </ol>
        
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            
            </li>
            `
             ).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit 

    if (qtdRecordsWithNexPage >= maxRecords) { 
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function getPokemonDetails(element) {
    const pokemonNumber = element.getAttribute('data-number');

    pokeApi.getPokemonByNameOrNumber(pokemonNumber)
        .then((pokemon) => {
            // Armazene os detalhes do Pokémon no localStorage
            localStorage.setItem('pokemonDetails', JSON.stringify(pokemon));

            // Abra a página details.html em uma nova janela ou guia
            const detailsPage = window.open('details.html', '_blank');
        })
        .catch((error) => {
            console.error(error);
        });
        
}
pokemonList.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        getPokemonDetails(clickedPokemon);
    }
});


