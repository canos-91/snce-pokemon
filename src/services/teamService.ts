import { prisma } from '@/lib/prismaClient'
import { TeamWithRelations } from '@/types/models'

export interface TeamCreateData {
  trainerId: number
  name: string
}

export interface TeamPokemonData {
  teamId: number
  pokemonId: number
}

const teamRelations = {
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
   * Adds a Pokémon to a team
   * @param teamAddData - teamId and pokemonId
   * @returns
   */
  addPkmnToTeam = async (teamAddData: TeamPokemonData): Promise<boolean> => {
    const created = await prisma.teamPokemons.create({
      data: teamAddData,
    })

    if (!created) throw new Error('An error occurred while adding Pokémon to team')

    return true
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
}
