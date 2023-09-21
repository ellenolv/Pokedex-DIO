
const offset = 1;
const limit = 10;

const url = ` https://pokeapi.co/api/v2/pokemon?offset=${offset}&imit=${limit}`




function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
    <span class="number">#001</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
            <li class="type">grass</li>
            <li class="type">poison</li>
        </ol>

        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
    </div>
    
    </li>
    `
    
    
}



const pokemonList = document.getElementById('pokemonList')


//fecth é uma função que faz uma requisição http
//parametros da fetch é a url
//o fecth retorna uma promisse
fetch(url)

//arrow function normal mas com uma linha só
    .then((response) => response.json()) //transforma a resposta em json
    .then((jsonBody) => jsonBody.results) //pega o json e pega o results que é a lista de pokemons
    .then((pokemons) => {
        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i]; //pega 1 pokemon da lista
            
            pokemonList.innerHTML += convertPokemonToLi(pokemon)
            //isso vai adicionar um li dentro do ol com id pokemonList
            
           
        }
    }) //pega o json e mostra no console
    //catch trata o erro da requisição
    .catch((error) => console.log(error)) 
    
