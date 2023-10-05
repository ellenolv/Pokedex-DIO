
const pokeApi ={}


function convertPokeApiDetailToPokemon(pokeDetail){ //função que converte o detalhe do pokemon para o modelo de dados do pokemon que criamos 

    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight;
   
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) // mapeia a lista de tipos e pega o nome de cada um
    const [type] = types //pega o primeiro tipo do pokemon

    pokemon.types = types;
    pokemon.type = type;

    const stats = {};
    pokeDetail.stats.forEach((statSlot) => {
        stats[statSlot.stat.name] = {
            base_stat: statSlot.base_stat,
            effort: statSlot.effort,
            url: statSlot.stat.url
        };
    });

pokemon.stats = stats;
    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) =>{
    return  fetch(pokemon.url) //pega a lista de pokemons e faz uma requisição para cada um deles
                .then((response) => response.json()) //transforma a resposta em json
                .then(convertPokeApiDetailToPokemon) // pega o jsonBody e transforma em um pokemon

}

//a linha abaixo está criando uma função dentro do objeto pokeApi que vai fazer uma requisição http e o tratamento da resposta
pokeApi.getPokemon = (offset = 0, limit =5) => {

    const url = ` https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
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

pokeApi.getPokemonByNameOrNumber = (nameOrNumber) => {
    // Verifica se o argumento é um número para determinar a URL a ser usada
    const isNumber = !isNaN(nameOrNumber);
    const url = isNumber
        ? `https://pokeapi.co/api/v2/pokemon/${nameOrNumber}`
        : `https://pokeapi.co/api/v2/pokemon/${nameOrNumber.toLowerCase()}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

