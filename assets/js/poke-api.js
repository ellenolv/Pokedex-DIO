
//saida funções de manipulacao da poke-api

const pokeApi ={}
pokeApi.getPokemonsDetail = (pokemon) =>{
    return  fetch(pokemon.url) //pega a lista de pokemons e faz uma requisição para cada um deles
                .then((response) => response.json()) //transforma a resposta em json   

}

//a linha abaixo está criando uma função dentro do objeto pokeApi que vai fazer uma requisição http e o tratamento da resposta
pokeApi.getPokemon = (offset = 0, limit = 5) => {

    const url = ` https://pokeapi.co/api/v2/pokemon?offset=${offset}&imit=${limit}`
    return fetch(url) 
     /**
    * fecth é uma função que faz uma requisição http
    * parametros da fetch é a url
    * o fecth retorna uma promisse
    */

//arrow function normal mas com uma linha só
    .then((response) => response.json()) //transforma a resposta em json
    .then((jsonBody) => jsonBody.results) //pega o jsonBody e pega o results que é a lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) //Estamos mapeando a lista de pokemons e transformando em uma lista de requisições de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) //pega a lista de requisições e transforma em uma promisse
    .then((pokemonsDetails)=> pokemonsDetails) //pega a lista de detalhes e retorna ela
}

