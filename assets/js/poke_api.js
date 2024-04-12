const pokeapi = {}

pokeapi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
                .then((response) => response.json())
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