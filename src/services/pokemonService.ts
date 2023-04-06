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

    // const pokemonAbilities: PokemonAbilities[] = abilities.map(
    //   (a: { ability: { name: string; url: string } }) => ({
    //     abilityId: getLastIntFromURL(a.ability.url),
    //     pokemonId: id,
    //   })
    // )

    // const pokemonTypes: PokemonTypes[] = types.map((t: { type: { name: string; url: string } }) => ({
    //   typeId: getLastIntFromURL(t.type.url),
    //   pokemonId: id,
    // }))

    try {
      let pkmn = await this.readPokemon(pokemon.id)

      if (!pkmn) {
        await Promise.all(
          abilities.map((a) => this.upsertAbility({ id: getLastIntFromURL(a.ability.url), name: a.ability.name }))
        )
        await Promise.all(types.map((t) => this.upsertType({ id: getLastIntFromURL(t.type.url), name: t.type.name })))
        // pkmn = await this.upsertPokemon({
        //   id,
        //   name,
        //   baseXp: base_experience,
        //   spriteURL: sprites.front_default,
        // })
        // if (pkmn) {
        //   await Promise.all(pokemonAbilities.map((a) => this.upsertPkmnAbility(a)))
        //   await Promise.all(pokemonTypes.map((t) => this.upsertPkmnType(t)))
        // }

        const pokemonAbilities = abilities.map((a: { ability: { name: string; url: string } }) => ({
          ability: {
            connect: {
              id: getLastIntFromURL(a.ability.url),
            },
          },
        }))

        const pokemonTypes = types.map((t: { type: { name: string; url: string } }) => ({
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
      console.log(e)
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
      console.log(`An error occurred while creating '${pkmnData.name}' Pokémon with id ${pkmnData.id}: ${e}`)
      throw e
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
      console.log(`An error occurred while reading Pokémon with id ${id}: ${e}`)
      throw e
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

    try {
      return await prisma.ability.upsert({
        where: {
          id,
        },
        update: {},
        create: { id, name },
      })
    } catch (e) {
      console.log(`An error occurred while creating '${name}' Ability: ${e}`)
      throw e
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
      console.log(`An error occurred while creating PokemonAbility: ${e}`)
      throw e
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
      console.log(`An error occurred while reading Ability with id ${id}: ${e}`)
      throw e
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
      console.log(`An error occurred while creating '${name}' Type: ${e}`)
      throw e
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
      console.log(`An error occurred while creating PokemonAbility: ${e}`)
      throw e
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
      console.log(`An error occurred while reading Type with id ${id}: ${e}`)
      throw e
    }
  }
}
