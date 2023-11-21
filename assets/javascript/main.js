const pokemonList = document.getElementById("pokemonList")
const loadMoreButton = document.getElementById("loadMore")
const sectionDetails = document.getElementById("details")

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItems(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons
        .map(
          (pokemon) => `
          <li class="pokemon ${pokemon.type}" data-pokemon-id="${
            pokemon.number
          }">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
              <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
              </ol>
              <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"
              />
            </div>
          </li>
         `
        )
        .join("")

      pokemonList.innerHTML += newHtml

      addClickEventToPokemonItems()
    })
    .catch((error) => console.error(error))
}

function addClickEventToPokemonItems() {
  const pokemonItems = document.querySelectorAll(".pokemon")
  let isDetailsActive = false // Controle de estado

  pokemonItems.forEach((pokemonItem) => {
    pokemonItem.addEventListener("click", (event) => {
      const details = document.querySelector(".details")
      const content = document.querySelector(".content")

      if (details) {
        if (!isDetailsActive) {
          details.classList.add("active")
          content.classList.add("active1")
          const pokemonId = pokemonItem.getAttribute("data-pokemon-id")
          loadPokemonDetails(pokemonId)
          isDetailsActive = true // Atualiza o controle de estado
        }
      }

      function clickAway(event) {
        if (!pokemonItem.contains(event.target)) {
          details.classList.remove("active")
          content.classList.remove("active1")
          isDetailsActive = false // Atualiza o controle de estado
          document.removeEventListener("click", clickAway)
        }
      }

      setTimeout(() => {
        document.addEventListener("click", clickAway)
      }, 0)
    })
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener("click", () => {
  offset += limit
  const qntRecordNextPage = offset + limit

  if (qntRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})

function loadPokemonDetails(pokemonId) {
  pokeApi.getPokemon(pokemonId).then((pokemon) => {
    const pokemonDetail = document.getElementById("pokemon-details")
    const newHtml = `
      <li class="pokemon ${pokemon.type}">
        <i class="fa-regular fa-circle-xmark butao"></i>
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            <li class="type ${pokemon.type}">${pokemon.type}</li>
          </ol>
        </div>
        <img src="${pokemon.photo}" alt="${pokemon.name}" />
      </li>
      <div class="stats-detail ">
          <span class="name">About</span>
          <span class="height">Height: ${pokemon.height}</span>
          <span class="weight">Weight: ${pokemon.weight}</span>
          <span class="weight">Abilities: ${pokemon.abilities0}, ${pokemon.abilities1}</span>
      </div>
      `

    pokemonDetail.innerHTML = newHtml

    const botao = document.querySelector(".butao")
    const details = document.querySelector(".details")
    const content = document.querySelector(".content")

    botao.addEventListener("click", () => {
      if (details && content) {
        details.classList.remove("active")
        content.classList.remove("active1")
      }
    })
  })
}
