import { prisma } from '@/lib/prismaClient'
import { Ability, Pokemon, PokemonAbilities, PokemonTypes, Type } from '@prisma/client'
import { ApiPokemon, PokemonWithRelations } from '@/types/models'
import { getLastIntFromURL } from '@/utils/string'

export default class PokemonService {
  /* ==========================================================================
    Pokémon model
  ========================================================================== */

  /**
   * Creates a new Pokémon with abilities and types
   * @param pokemon - the Pokémon retrieved from PokéAPI
   */
  createPokemon = async (pokemon: ApiPokemon): Promise<PokemonWithRelations | undefined> => {
    const { id, base_experience, name, abilities, types, sprites } = pokemon

    // Remove unwanted duplicates for types and abilities returned from PokeApi
    const uniqueAbilities = abilities.filter(
      (a, idx) => abilities.findIndex((b) => a.ability.name === b.ability.name) === idx
    )
    const uniqueTypes = types.filter((a, idx) => types.findIndex((b) => a.type.name === b.type.name) === idx)

    try {
      let pkmn = await this.readPokemon(pokemon.id)

      if (!pkmn) {
        await Promise.all(
          uniqueAbilities.map((a) => this.upsertAbility({ id: getLastIntFromURL(a.ability.url), name: a.ability.name }))
        )
        await Promise.all(
          uniqueTypes.map((t) => this.upsertType({ id: getLastIntFromURL(t.type.url), name: t.type.name }))
        )

        const pokemonAbilities = uniqueAbilities.map((a: { ability: { name: string; url: string } }) => ({
          ability: {
            connect: {
              id: getLastIntFromURL(a.ability.url),
            },
          },
        }))

        const pokemonTypes = uniqueTypes.map((t: { type: { name: string; url: string } }) => ({
          type: {
            connect: {
              id: getLastIntFromURL(t.type.url),
            },
          },
        }))

        pkmn = await prisma.pokemon.create({
          data: {
            id,
            name,
            baseXp: base_experience || 0,
            spriteURL: sprites.front_default,
            abilities: {
              create: pokemonAbilities,
            },
            types: {
              create: pokemonTypes,
            },
          },
          include: {
            abilities: {
              select: {
                ability: true,
              },
            },
            types: {
              select: {
                type: true,
              },
            },
          },
        })
      }
      return pkmn
    } catch (e) {
      throw new Error(`An error occurred while creating Pokémon '${pokemon.name}': ${e}`)
    }
  }

  /**
   * Creates a new Pokemon if not already in DB
   * @param pkmnData - Pokemon data
   * @returns - the created Pokémon
   */
  upsertPokemon = async (pkmnData: Pokemon): Promise<Pokemon | never> => {
    try {
      return await prisma.pokemon.upsert({
        where: {
          id: pkmnData.id,
        },
        update: {},
        create: pkmnData,
      })
    } catch (e) {
      throw new Error(`An error occurred while creating '${pkmnData.name}' Pokémon with id ${pkmnData.id}: ${e}`)
    }
  }

  /**
   * Finds an Pokemon by its ID
   * @param id
   * @returns the found Pokemon or null
   */
  readPokemon = async (id: number): Promise<PokemonWithRelations | null> => {
    try {
      return await prisma.pokemon.findUnique({
        where: {
          id,
        },
        include: {
          abilities: {
            select: {
              ability: true,
            },
          },
          types: {
            select: {
              type: true,
            },
          },
        },
      })
    } catch (e) {
      throw new Error(`An error occurred while reading Pokémon with id ${id}: ${e}`)
    }
  }

  /* ==========================================================================
    Ability model
  ========================================================================== */

  /**
   * Creates a new Ability if not already in DB
   * @param abilityData - ID and name
   * @returns - the created ability
   */
  upsertAbility = async (abilityData: Ability): Promise<Ability | never> => {
    const { id, name } = abilityData

    console.log(abilityData)

    try {
      return await prisma.ability.upsert({
        where: {
          id,
        },
        update: {},
        create: { id, name },
      })
    } catch (e) {
      throw new Error(`An error occurred while creating '${name}' Ability: ${e}`)
    }
  }

  upsertPkmnAbility = async (pkmnAbilityData: PokemonAbilities): Promise<PokemonAbilities | never> => {
    const { pokemonId, abilityId } = pkmnAbilityData

    try {
      let pkmnAbility = await prisma.pokemonAbilities.findFirst({
        where: {
          pokemonId,
          abilityId,
        },
      })

      if (!pkmnAbility) {
        pkmnAbility = await prisma.pokemonAbilities.create({
          data: pkmnAbilityData,
        })
      }

      return pkmnAbility
    } catch (e) {
      throw new Error(`An error occurred while creating PokemonAbility: ${e}`)
    }
  }

  /**
   * Finds an Ability by its ID
   * @param id
   * @returns the found Ability or null
   */
  readAbility = async (id: number): Promise<Ability | null> => {
    try {
      return await prisma.ability.findUnique({
        where: {
          id,
        },
      })
    } catch (e) {
      throw new Error(`An error occurred while reading Ability with id ${id}: ${e}`)
    }
  }

  /* ==========================================================================
    Type model
  ========================================================================== */

  /**
   * Creates a new Type if not already in DB
   * @param typeData - ID and name
   * @returns - the created type
   */
  upsertType = async (typeData: Type): Promise<Type | never> => {
    const { id, name } = typeData

    try {
      return await prisma.type.upsert({
        where: {
          id,
        },
        update: {},
        create: { id, name },
      })
    } catch (e) {
      throw new Error(`An error occurred while creating '${name}' Type: ${e}`)
    }
  }

  upsertPkmnType = async (pkmnTypeData: PokemonTypes): Promise<PokemonTypes | never> => {
    const { pokemonId, typeId } = pkmnTypeData

    try {
      let pkmnType = await prisma.pokemonTypes.findFirst({
        where: {
          pokemonId,
          typeId,
        },
      })

      if (!pkmnType) {
        pkmnType = await prisma.pokemonTypes.create({
          data: pkmnTypeData,
        })
      }

      return pkmnType
    } catch (e) {
      throw new Error(`An error occurred while creating PokemonAbility: ${e}`)
    }
  }

  /**
   * Finds a Type by its ID
   * @param id
   * @returns the found Type or null
   */
  readType = async (id: number): Promise<Type | null> => {
    try {
      return await prisma.type.findUnique({
        where: {
          id,
        },
      })
    } catch (e) {
      throw new Error(`An error occurred while reading Type with id ${id}: ${e}`)
    }
  }
}
