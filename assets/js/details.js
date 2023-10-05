// Recupere os detalhes do Pokémon armazenados no localStorage
const storedPokemonDetails = localStorage.getItem('pokemonDetails');

if (storedPokemonDetails) {
    const pokemon = JSON.parse(storedPokemonDetails);
    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
    <p>Number: #${pokemon.number}</p>
    <p>Types: ${pokemon.types.join(', ')}</p>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <h3>Stats:</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Base Stat</th>
            <th>Progress</th>
        </tr>
        ${Object.keys(pokemon.stats).map((statName) => `
            <tr>
                <td>${statName}</td>
                <td>${pokemon.stats[statName].base_stat}</td>
                <td>
                    <progress value="${pokemon.stats[statName].base_stat}" max="150"></progress>
                </td>
            </tr>
        `).join('')}
    </table>
`;
console.log(pokemon);
} else {
    // Lidar com o caso em que os detalhes do Pokémon não estão disponíveis
    console.error('Detalhes do Pokémon não encontrados.');
}


function proximo(){
    if(pokemon.number < 1008){
        pokemon.number ++ ;
    }
    else{
        pokemon.number = 1;
    }
}

function anterior(){
    if(pokemon.number > 1){
        pokemon.number --;
    }
    else{
        pokemon.number = 1008;
    }
}

function convertHeightToMeters(){
    return this.pokemon.height / 10 + 'm';
  }

function convertWeightToKg(){
    return this.pokemon.weight / 10 + 'kg';
  }
 