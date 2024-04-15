function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detalhes">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')} 
            </ol>
            <img src="${pokemon.img}" alt="${pokemon.name}">
        </div>
    </li>
    `
}

const pokemonOl = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')

const maxRecords = 649
const limit = 14
let offset = 0

function loadPokeItens (offset, limit) {
            pokeapi.getPokemons(offset, limit).then((pokemonList) => {
            //map vai transformar todos os elementos da lista para um item de lista string

            //join vai juntar todos os elementos transformados pelo map numa variável apenas
            const newHtml = pokemonList.map(convertPokemonToLi).join('')
            pokemonOl.innerHTML += newHtml




            //Método antigo
            /* const newList = []
            for(let i = 0; i < pokemonList.length; i++){
                const pokemon = pokemonList[i]
                newList.push(convertPokemonToLi(pokemon))
            } */
        })
}

loadPokeItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit
    const qtdRecordWithNextPage = offset + limit

    if(qtdRecordWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokeItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    }else{
        loadPokeItens(offset, limit)
    }
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