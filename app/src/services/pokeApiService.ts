import type { IApiClient } from '@/lib/apiClient'
import type { IPokemon } from '@/types/models/Pokemon'

export interface IPokeApiClient {
  getPokemonByName(pokemonName: string): Promise<IPokemon | undefined>
}

export class PokeApiClient implements IPokeApiClient {
  apiBase: string
  pokeApiClient: IApiClient

  constructor(pokeApiClient: IApiClient) {
    this.apiBase = 'https://pokeapi.co/api/v2'
    this.pokeApiClient = pokeApiClient
  }

  async getPokemonByName(pokemonName: string): Promise<IPokemon | undefined> {
    try {
      const response = await this.pokeApiClient.get<any>(
        `${this.apiBase}/pokemon/${pokemonName}`
      )

      return response
        ? {
            name: response.name,
            types: response.types,
            sprite: response.sprites.front_default,
          }
        : undefined
    } catch (e) {
      console.error(e)
    }
  }
}

export default class PokemonService {
  pokeApiClient: IPokeApiClient

  constructor(pokeApiClient: IPokeApiClient) {
    this.pokeApiClient = pokeApiClient
  }

  async getPokemonByName(pokemonName: string): Promise<IPokemon | undefined> {
    return this.pokeApiClient.getPokemonByName(pokemonName)
  }
}
