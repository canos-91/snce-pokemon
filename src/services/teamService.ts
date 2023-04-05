import { prisma } from '@/lib/prismaClient'
import { Team } from '@prisma/client'

export interface TeamCreateData {
  trainerId: number
  name: string
}

export interface TeamAddPokemonData {
  teamId: number
  pokemonId: number
}

export default class TeamService {
  /**
   * Adds a Pokémon to a team
   * @param teamData - teamId and pokemonId
   * @returns
   */
  addPkmnToTeam = async (teamAddData: TeamAddPokemonData): Promise<string> => {
    const created = await prisma.teamPokemons.create({
      data: teamAddData,
    })

    if (!created) throw new Error('An error occurred while adding pokemon to team')

    return 'OK'
  }

  /**
   * Creates a new team for a specific trainer
   * @param teamData - trainerId and name
   * @returns - the created team or undefined
   */
  createTeam = async (teamData: TeamCreateData): Promise<Team | undefined> => {
    //   throw new ApiError(`User with email: ${email} already exists.`, 409)

    const team = await prisma.team.create({
      data: teamData,
    })

    if (!team) throw new Error('An error occurred while creating new team')

    return team
  }

  /**
   * Lists all teams for a specific trainer
   * @param trainerId - the trainer's ID
   * @returns - the trainer's teams
   */
  listTeams = async (trainerId: number): Promise<Team[]> => {
    const teams = await prisma.team.findMany({
      where: { trainerId },
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (!teams.length) throw new Error(`An error occurred while listing trainer's teams`)

    return teams
  }
}
