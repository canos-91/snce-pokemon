import ApiClient from '@/lib/apiClient'
import PokemonService, { PokeApiClient } from '@/services/pokeApiService'

export const pokemonService = new PokemonService(
  new PokeApiClient(new ApiClient())
)
