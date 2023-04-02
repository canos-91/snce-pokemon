import ApiClient from '@/lib/apiClient'
import PokemonService from '@/services/pokeApiService'

export const pokemonService = new PokemonService(new ApiClient())
