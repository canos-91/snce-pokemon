import { ApiClient, IApiClient } from '@/lib/apiClient'
import { getRandomInt } from '@/utils/number'
import { ApiPokemon } from '@/types/models'

class PokeApiService {
  apiBaseURL: string
  pokeApiClient: IApiClient

  constructor(pokeApiClient: IApiClient) {
    this.apiBaseURL = 'https://pokeapi.co/api/v2'
    this.pokeApiClient = pokeApiClient
  }

  /**
   * Retrieves a Pokémon by its name or ID
   * @param id - the Pokémon name or ID
   * @returns the found Pokémon or undefined
   */
  async getPokemon(id?: string | number): Promise<ApiPokemon | undefined> {
    const pokemon = id ?? getRandomInt(1, 500)

    try {
      return await this.pokeApiClient.get<ApiPokemon>(`${this.apiBaseURL}/pokemon/${pokemon}`)
    } catch (e) {
      console.error(`An error occurred while retrieving Pokémon '${pokemon}': ${e}`)
    }
  }

  /**
   * Gets the number of available Pokémons
   * @returns the total value
   */
  async getPokemonCount(): Promise<number | undefined> {
    try {
      const response = await this.pokeApiClient.get<{ count: number }>(`${this.apiBaseURL}/pokemon-species`)

      return response?.count
    } catch (e) {
      console.error(`An error occurred while retrieving Pokémon list: ${e}`)
    }
  }
}

export const pokeApiService = new PokeApiService(new ApiClient())
