import { prisma } from '@/lib/prismaClient'
import { Pokemon } from '@/types/models/Pokemon'

export interface PokemonServiceClient {
  createPokemon(pkmnData: Pokemon): Promise<number | undefined>
}

export default class PokemonService implements PokemonServiceClient {
  /**
   * Creates a new Pokemon if not already in DB
   * @param pkmnData - Pokemon data
   * @returns - the created Pokémopn id or undefined
   */
  createPokemon = async (pkmnData: Pokemon): Promise<number | undefined> => {
    const { id, name, baseXp } = pkmnData

    const pkmn = await prisma.pokemon.upsert({
      where: {
        id,
      },
      update: {
        name,
        baseXp,
      },
      create: { id, name, baseXp },
    })

    if (!pkmn) throw new Error('An error occurred while creating Pokémon')

    return pkmn.id
  }

  /**
   * Creates a new Ability if not already in DB
   * @param teamData - trainerId and name
   * @returns - the created team or undefined
   */
}
