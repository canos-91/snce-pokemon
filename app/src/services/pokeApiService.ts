import type { IApiClient } from '@/lib/apiClient'
import type { IPokemon } from '@/types/models/Pokemon'

export interface PokeApiClient {
  getPokemonByName(pokemonName: string): Promise<IPokemon | undefined>
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
   * @param pokemonName - the Pokémon name
   * @returns the found Pokémon or undefined
   */
  async getPokemonByName(pokemonName: string): Promise<IPokemon | undefined> {
    try {
      const response = await this.pokeApiClient.get<any>(
        `${this.apiBaseURL}/pokemon/${pokemonName}`
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
        `An error occurred while retrieving Pokémon '${pokemonName}': ${e}`
      )
    }
  }
}

// export default class PokemonService {
//   pokeApiClient: PokeApiClient

//   constructor(pokeApiClient: PokeApiClient) {
//     this.pokeApiClient = pokeApiClient
//   }

//   async getPokemonByName(pokemonName: string): Promise<Pokemon | undefined> {
//     return this.pokeApiClient.getPokemonByName(pokemonName)
//   }
// }
