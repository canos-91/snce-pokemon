import { prisma } from '@/lib/prismaClient'
import { TeamWithRelations } from '@/types/models'

export interface TeamCreateData {
  id?: number
  trainerId: number
  name: string
}

export interface TeamPokemonData {
  teamId: number
  pokemonId: number
}

export const teamRelations = {
  trainer: true,
  pokemons: {
    include: {
      pokemon: {
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
      },
    },
  },
}

export default class TeamService {
  /**
   * Creates a new team for a specific trainer
   * @param teamData - trainerId and name
   * @returns - the created team or undefined
   */
  createTeam = async (teamData: TeamCreateData): Promise<TeamWithRelations | undefined> => {
    const team = await prisma.team.create({
      data: {
        name: teamData.name,
        trainer: {
          connect: { id: teamData.trainerId },
        },
      },
      include: teamRelations,
    })

    if (!team) throw new Error('An error occurred while creating new team')

    return team
  }

  /**
   * Finds an Team by its ID
   * @param id
   * @returns the found Team or null
   */
  readTeam = async (id: number): Promise<TeamWithRelations | null> => {
    try {
      return await prisma.team.findUnique({
        where: {
          id,
        },
        include: teamRelations,
      })
    } catch (e) {
      console.log(`An error occurred while reading Team with id ${id}: ${e}`)
      throw e
    }
  }

  /**
   * Updates a team for a specific trainer
   * @param teamData - trainerId and name
   * @returns - the created team or undefined
   */
  updateTeam = async (teamData: TeamCreateData): Promise<TeamWithRelations | undefined> => {
    const team = await prisma.team.update({
      where: {
        id: teamData.id,
      },
      data: teamData,
      include: teamRelations,
    })

    if (!team) throw new Error('An error occurred while creating new team')

    return team
  }

  /**
   * Lists all teams for a specific trainer
   * @param trainerId - the trainer's ID
   * @returns - the trainer's teams
   */
  listTeams = async (trainerId: number): Promise<TeamWithRelations[]> => {
    const teams = await prisma.team.findMany({
      ...(trainerId && { where: { trainerId } }),
      orderBy: {
        createdAt: 'asc',
      },
      include: teamRelations,
    })

    if (!teams.length) throw new Error(`An error occurred while listing trainer's teams`)

    return teams
  }

  /**
   * Deletes a team by its ID
   * @param teamId - team ID
   * @returns
   */
  deleteTeam = async (teamId: number): Promise<boolean> => {
    const removed = await prisma.team.delete({
      where: {
        id: teamId,
      },
    })

    if (!removed) throw new Error('An error occurred while deleting team')
    return true
  }

  /* ==========================================================================
    TeamPokemon model
  ========================================================================== */

  /**
   * Adds a Pokémon to a team
   * @param teamAddData - teamId and pokemonId
   * @returns - the created record
   */
  upsertTeamPokemon = async (teamAddData: TeamPokemonData): Promise<TeamPokemonData | never> => {
    try {
      return await prisma.teamPokemons.upsert({
        where: {
          pokemonId_teamId: teamAddData,
        },
        update: {},
        create: teamAddData,
      })
    } catch (e) {
      console.log(
        `An error occurred while adding Pokémon with id '${teamAddData.pokemonId}' to team with id '${teamAddData.teamId}': ${e}`
      )
      throw e
    }
  }

  /**
   * Adds many Pokémons to a team
   * @param teamAddData - array of teamId and pokemonId
   * @returns
   */
  upsertManyTeamPokemons = async (teamAddData: TeamPokemonData[]): Promise<TeamWithRelations | null> => {
    const updated = await Promise.all(teamAddData.map((p) => this.upsertTeamPokemon(p)))

    if (!updated) throw new Error('An error occurred while adding Pokémons to team')

    return this.readTeam(teamAddData[0].teamId)
  }

  /**
   * Removes a Pokémon from a team
   * @param teamRemoveData - id, teamId and pokemonId
   * @returns
   */
  removePkmnFromTeam = async (teamRemoveData: TeamPokemonData): Promise<boolean> => {
    const removed = await prisma.teamPokemons.delete({
      where: {
        pokemonId_teamId: teamRemoveData,
      },
    })

    if (!removed) throw new Error('An error occurred while removing Pokémon from team')
    return true
  }
}
