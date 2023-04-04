import { prisma } from '@/lib/prismaClient'
import { Team } from '@/types/models/Team'

export interface TeamCreateData {
  trainerId: number
  name: string
}

export interface TeamAddPokemonData {
  teamId: number
  pokemonId: number
}

// export const getTeam = async (id: string): Promise<ClientUser> => {
//   const user = await prisma.user.findUnique({ where: { id } })
//   if (!user) throw new ApiError(`User with id: ${id} not found.`, 404)

//   return excludeFromUser(user)
// }

// export const updateUser = async (
//   id: string,
//   userUpdateData: UserUpdateServiceData
// ): Promise<ClientUser> => {
//   const { name, username, bio, password, files } = userUpdateData // email reconfirm...

//   // validate userId
//   const _user = await prisma.user.findUnique({ where: { id } })
//   if (!_user) throw new ApiError(`User with id: ${id} not found.`, 404)

//   // check if new username is available
//   if (username && username !== _user.username) {
//     const _user = await prisma.user.findFirst({
//       where: { username },
//     })
//     if (_user)
//       throw new ApiError(`Username: ${username} is already taken.`, 409)
//   }

//   const data = {
//     ...(name && { name }),
//     ...(username && { username }),
//     ...(bio && { bio }),
//     ...(files?.avatar?.length > 0 && { image: files.avatar[0].filename }),
//     ...(files?.header?.length > 0 && { headerImage: files.header[0].filename }),
//     ...(password && { password: await hash(password, 10) }),
//   }

//   const user = await prisma.user.update({
//     where: { id },
//     data,
//   })

//   if (!user) throw new ApiError('Update user failed.', 400)

//   return excludeFromUser(user)
// }

// export const deleteUser = async (id: string): Promise<ClientUser> => {
//   // validate id
//   const _user = await prisma.user.findUnique({ where: { id } })
//   if (!_user) throw new ApiError('User not found.', 404)

//   // delete posts too, cascade defined in schema
//   const user = await prisma.user.delete({ where: { id } })
//   if (!user) throw new ApiError('Delete user failed.', 400)

//   return excludeFromUser(user)
// }

export interface TeamServiceClient {
  addPkmnToTeam(teamAddData: TeamAddPokemonData): Promise<string>
  createTeam(teamData: TeamCreateData): Promise<Team | undefined>
  listTeams(trainerId: number): Promise<Team[]>
}

// export class PokeApiClient implements PokeApiClient {
export default class TeamService implements TeamServiceClient {
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
