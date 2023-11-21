const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.id
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

function convertPokeApiDetailToPokemon2(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.id
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  pokemon.height = pokeDetail.height
  pokemon.weight = pokeDetail.weight
  pokemon.abilities0 = pokeDetail.abilities[0].ability.name
  pokemon.abilities1 = pokeDetail.abilities[1].ability.name

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon2)
    .then((pokemon) => {
      return pokemon
    })
}
