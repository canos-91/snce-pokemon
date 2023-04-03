import ApiClient from '@/lib/apiClient'
import PokemonService from '@/services/pokemonService'

export const pokemonService = new PokemonService(new ApiClient())
