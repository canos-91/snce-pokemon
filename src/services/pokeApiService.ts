import type { IApiClient } from '@/lib/apiClient'
import type { Pokemon } from '@/types/models/Pokemon'
import { getRandomInt } from '@/utils/number'

export interface ApiPokemon {
  id: number
  name: string
  abilities: { slot: number; ability: { name: string } }[]
  types: {
    slot: number
    type: {
      name: string
    }
  }[]
  sprites: { front_default: string }
  base_experience: number
}

export interface PokeApiClient {
  getPokemon(pokemonName: string): Promise<Pokemon | undefined>
  getPokemonCount(): Promise<number | undefined>
}

// export class PokeApiClient implements PokeApiClient {
export default class PokeApiService implements PokeApiClient {
  apiBaseURL: string
  pokeApiClient: IApiClient

  constructor(pokeApiClient: IApiClient) {
    this.apiBaseURL = 'https://pokeapi.co/api/v2'
    this.pokeApiClient = pokeApiClient
  }

  /**
   * Retrieves a Pokémon by its name
   * @param id - the Pokémon name or ID
   * @returns the found Pokémon or undefined
   */
  async getPokemon(id?: string | number): Promise<Pokemon | undefined> {
    const pokemon = id ?? getRandomInt(1, 500)

    try {
      const response = await this.pokeApiClient.get<ApiPokemon | Record<string, never>>(
        `${this.apiBaseURL}/pokemon/${pokemon}`
      )

      const { id, base_experience, name, abilities, types, sprites } = response

      return Object.keys(response).length
        ? {
            id,
            name,
            abilities: abilities.map((a: { ability: { name: string } }) => a.ability.name) || [],
            types: types.map((t: { type: { name: string } }) => t.type.name) || [],
            sprite: sprites.front_default,
            baseXp: base_experience,
          }
        : undefined
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

      return response !== undefined ? response.count : undefined
    } catch (e) {
      console.error(`An error occurred while retrieving Pokémon list: ${e}`)
    }
  }
}
