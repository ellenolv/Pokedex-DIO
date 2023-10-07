// Recupere os detalhes do Pokémon armazenados no localStorage
const storedPokemonDetails = localStorage.getItem('pokemonDetails');

if (storedPokemonDetails) {
    const pokemon = JSON.parse(storedPokemonDetails);
    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.innerHTML = `
    <h2 class="name">${pokemon.name}</h2>
    <p class="number"> #${pokemon.number}</p>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
    
    <div class="detail">
        <ol class="types "> 
            ${pokemon.types.map((type) => `<li  class="type ${type}">${type}</li>`).join(' ')}
        </ol>
        <p class="height">Height: ${convertHeightToMeters(pokemon.height)}</p>
    <p class="weight">Weight:${convertWeightToKg(pokemon.weight)}</p>
        <table class="progress-table">
            <tr>
                <th>Name</th>
                <th>Base Stat</th>
                <th>Progress</th>
            </tr>
                ${Object.keys(pokemon.stats).map((statName) => `
                <tr>
                    <td>${statName}</td>
                    <td>${pokemon.stats[statName].base_stat}</td>
                    <td class="progress">
                        <progress class=" progress-bar${pokemon.type}" value="${pokemon.stats[statName].base_stat}" max="150"></progress>
                    </td>
                </tr>
            `).join('')}
        </table>
    </div>`

console.log(pokemon);
} else {
    // Lidar com o caso em que os detalhes do Pokémon não estão disponíveis
    console.error('Detalhes do Pokémon não encontrados.');
}

// Função para converter a altura para metros (m)
function convertHeightToMeters(heightInDecimetres) {
    return (heightInDecimetres / 10).toFixed(2) + ' m';
}
// Função para converter o peso para quilogramas (kg)
function convertWeightToKg(weightInDecagrams) {
    return (weightInDecagrams / 10).toFixed(2) + ' kg';
}
 