const pokeapi = {}

function convertPokeApiToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.id = pokeDetail.id
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.img = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeapi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
            .then(convertPokeApiToPokemon)
}

pokeapi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getDetails))
        .then((details) => Promise.all(details))
        .then((pokemonDetails) => pokemonDetails)
        .catch((function (error) {
            console.error(error)
        }))
}