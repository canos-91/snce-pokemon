import { prisma } from '@/lib/prismaClient'
import { TeamWithRelations } from '@/types/models'

export interface TeamCreateData {
  trainerId: number
  name: string
}

export interface TeamUpdateData extends TeamCreateData {
  id: number
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
  /* ==========================================================================
    Team model
  ========================================================================== */

  /**
   * Creates a new team for a specific trainer
   * @param teamData - trainerId and name
   * @returns - the created team or undefined
   */
  createTeam = async (teamData: TeamCreateData): Promise<TeamWithRelations | undefined> => {
    try {
      return await prisma.team.create({
        data: {
          name: teamData.name,
          trainer: {
            connect: { id: teamData.trainerId },
          },
        },
        include: teamRelations,
      })
    } catch (e) {
      throw new Error('An error occurred while creating new team: ' + e)
    }
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
      throw new Error(`An error occurred while reading Team with id ${id}: ${e}`)
    }
  }

  /**
   * Updates a team for a specific trainer
   * @param teamData - id, trainerId and name
   * @returns - the created team or undefined
   */
  updateTeam = async (teamData: TeamUpdateData): Promise<TeamWithRelations | undefined> => {
    try {
      return await prisma.team.update({
        where: {
          id: teamData.id,
        },
        data: teamData,
        include: teamRelations,
      })
    } catch (e) {
      throw new Error('An error occurred while updating team')
    }
  }

  /**
   * Lists all teams for a specific trainer
   * @param trainerId - the trainer's ID
   * @returns - the trainer's teams
   */
  listTeams = async (trainerId: number): Promise<TeamWithRelations[]> => {
    try {
      return await prisma.team.findMany({
        ...(trainerId && { where: { trainerId } }),
        orderBy: {
          createdAt: 'asc',
        },
        include: teamRelations,
      })
    } catch {
      throw new Error(`An error occurred while listing trainer's teams`)
    }
  }

  /**
   * Deletes a team by its ID
   * @param teamId - team ID
   * @returns
   */
  deleteTeam = async (teamId: number): Promise<boolean> => {
    try {
      await prisma.team.delete({
        where: {
          id: teamId,
        },
      })
      return true
    } catch (e) {
      throw new Error('An error occurred while deleting team: ' + e)
    }
  }

  /* ==========================================================================
    TeamPokemon model
  ========================================================================== */

  /**
   * Adds a Pokémon to a team
   * @param teamAddData - teamId and pokemonId
   * @returns - the created record
   */
  upsertTeamPokemon = async (teamAddData: TeamPokemonData): Promise<TeamPokemonData> => {
    try {
      return await prisma.teamPokemons.upsert({
        where: {
          pokemonId_teamId: teamAddData,
        },
        update: {},
        create: teamAddData,
      })
    } catch (e) {
      throw new Error(
        `An error occurred while adding Pokémon with id '${teamAddData.pokemonId}' to team with id '${teamAddData.teamId}': ${e}`
      )
    }
  }

  /**
   * Adds many Pokémons to a team
   * @param teamAddData - array of teamId and pokemonId
   * @returns
   */
  upsertManyTeamPokemons = async (teamAddData: TeamPokemonData[]): Promise<TeamWithRelations | null> => {
    try {
      await Promise.all(teamAddData.map((p) => this.upsertTeamPokemon(p)))
      return await this.readTeam(teamAddData[0].teamId)
    } catch (e) {
      throw new Error('An error occurred while adding Pokémons to team:' + e)
    }
  }

  /**
   * Removes a Pokémon from a team
   * @param teamRemoveData - id, teamId and pokemonId
   * @returns
   */
  removePkmnFromTeam = async (teamRemoveData: TeamPokemonData): Promise<boolean> => {
    try {
      await prisma.teamPokemons.delete({
        where: {
          pokemonId_teamId: teamRemoveData,
        },
      })

      return true
    } catch (e) {
      throw new Error('An error occurred while removing Pokémon from team')
    }
  }
}
