function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li>${typeSlot.type.name}</li>`)
} 

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon" id="grass">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detalhes">
            <ol class="types">
                ${convertPokemonTypesToLi(pokemon.types).join('')}
            </ol>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="${pokemon.name}">
        </div>
    </li>
    `
}

const pokemonOl = document.getElementById('pokemonList')

pokeapi.getPokemons(0, 110).then((pokemonList) => {
    
    //map vai transformar todos os elementos da lista para um item de lista string

    //join vai juntar todos os elementos transformados pelo map numa variável apenas
    const newHtml = pokemonList.map(convertPokemonToLi).join('')
    pokemonOl.innerHTML = newHtml




    //Método antigo
    /* const newList = []
    for(let i = 0; i < pokemonList.length; i++){
        const pokemon = pokemonList[i]
        newList.push(convertPokemonToLi(pokemon))
    } */
})



/* fetch(url)
    //Interpretar a resposta
    .then((response) => response.json())//.json transforme a response em um json
    //then encadeado que pega o de cima
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => {
        
        for(let i = 0; i < pokemonList.length; i++){
            const pokemon = pokemonList[i]
            pokemonOl.innerHTML += convertPokemonToLi(pokemon)
        }

    })
    //Caso ocorra um fracasso na requisição
    .catch((error) => console.error(error))
    //Para rodar idependente do sucesso ou fracasso
    .finally(function(){
        console.log('Requisição concluída')
    }) */