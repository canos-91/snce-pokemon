import { ApiClient } from '@/lib/apiClient'
import PokeApiService from '@/services/pokeApiService'
import TeamService from '@/services/teamService'
import PokemonService from '@/services/pokemonService'
import TrainerService from '@/services/trainerService'

export const pokeApiService = new PokeApiService(new ApiClient())
export const teamService = new TeamService()
export const pokemonService = new PokemonService()
export const trainerService = new TrainerService()
