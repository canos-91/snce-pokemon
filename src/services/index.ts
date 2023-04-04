import ApiClient from '@/lib/apiClient'
import PokeApiService from '@/services/pokeApiService'
import TeamService from '@/services/teamService'

export const pokeApiService = new PokeApiService(new ApiClient())
export const teamService = new TeamService()
