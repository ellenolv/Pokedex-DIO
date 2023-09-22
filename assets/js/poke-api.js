
//saida funções de manipulacao da poke-api

const pokeApi ={}

//a linha abaixo está criando uma função dentro do objeto pokeApi que vai fazer uma requisição http e o tratamento da resposta
pokeApi.getPokemon = (offset = 0, limit = 10) => {

    const url = ` https://pokeapi.co/api/v2/pokemon?offset=${offset}&imit=${limit}`
    return fetch(url) 
     /**
    * fecth é uma função que faz uma requisição http
    * parametros da fetch é a url
    * o fecth retorna uma promisse
    */

//arrow function normal mas com uma linha só
    .then((response) => response.json()) //transforma a resposta em json
    .then((jsonBody) => jsonBody.results) //pega o json e pega o results que é a lista de pokemons
    .catch((error) => console.log(error))
}