import type { IApiClient } from '@/lib/apiClient'
import type { IPokemon } from '@/types/models/Pokemon'
import { getRandomInt } from '@/utils/number'

export interface PokeApiClient {
  getPokemon(pokemonName: string): Promise<IPokemon | undefined>
  list(): Promise<any>
}

// export class PokeApiClient implements PokeApiClient {
export default class PokemonService implements PokeApiClient {
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
  async getPokemon(id?: string | number): Promise<IPokemon | undefined> {
    const pokemon = id ?? getRandomInt(1, 500)

    try {
      const response = await this.pokeApiClient.get<any>(
        `${this.apiBaseURL}/pokemon/${pokemon}`
      )

      return response
        ? {
            name: response.name,
            types: response.types,
            sprite: response.sprites.front_default,
          }
        : undefined
    } catch (e) {
      console.error(
        `An error occurred while retrieving Pokémon '${pokemon}': ${e}`
      )
    }
  }

  async list(): Promise<any> {
    try {
      const response = await this.pokeApiClient.get<any>(
        `${this.apiBaseURL}/ability`
      )

      return response ?? undefined
    } catch (e) {
      console.error(`An error occurred while retrieving Pokémon list: ${e}`)
    }
  }
}

// export default class PokemonService {
//   pokeApiClient: PokeApiClient

//   constructor(pokeApiClient: PokeApiClient) {
//     this.pokeApiClient = pokeApiClient
//   }

//   async getPokemon(pokemonName: string): Promise<Pokemon | undefined> {
//     return this.pokeApiClient.getPokemon(pokemonName)
//   }
// }
