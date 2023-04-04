import { prisma } from '@/lib/prismaClient'

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
  addPkmnToTeam(teamId: number, pokemonId: number): Promise<string>
  createTeam(name: string, trainerId: number): Promise<string>
}

// export class PokeApiClient implements PokeApiClient {
export default class TeamService implements TeamServiceClient {
  addPkmnToTeam = async (
    teamId: number,
    pokemonId: number
  ): Promise<string> => {
    const created = await prisma.teamPokemons.create({
      data: { pokemonId, teamId },
    })

    if (!created)
      throw new Error('An error occurred while adding pokemon to team')

    return 'OK'
  }

  createTeam = async (name: string, trainerId: number): Promise<string> => {
    // unique email
    // const _team = await prisma.team.findFirst({
    //   where: { email },
    // })
    // if (_user1)
    //   throw new ApiError(`User with email: ${email} already exists.`, 409)

    const team = await prisma.team.create({
      data: { name, trainerId },
    })

    if (!team) throw new Error('An error occurred while createng new team')

    return 'OK'
  }
}

// export const list = async (
//   usersGetData: UsersGetData = {}
// ): Promise<PaginatedResponse<ClientUser>> => {
//   const {
//     page = 1,
//     limit = defaultLimit,
//     searchTerm,
//     sortDirection = 'desc',
//   } = usersGetData

//   const search = filterSearchTerm(searchTerm, 'or')

//   const where = {
//     where: {
//       ...(search && {
//         OR: [
//           { name: { search } },
//           { username: { search } },
//           { email: { search } },
//         ],
//       }),
//     },
//   }

//   const totalCount = await prisma.user.count({ ...where })

//   const users = await prisma.user.findMany({
//     ...where,
//     skip: (page - 1) * limit,
//     take: limit,
//     orderBy: {
//       createdAt: sortDirection as SortDirection,
//     },
//   })

//   const result = {
//     items: users.map((user) => excludeFromUser(user)),
//     pagination: {
//       total: totalCount,
//       pagesCount: Math.ceil(totalCount / limit),
//       currentPage: page,
//       perPage: limit,
//       from: (page - 1) * limit + 1,
//       to: (page - 1) * limit + users.length,
//       hasMore: page < Math.ceil(totalCount / limit),
//     },
//   }

//   return result
// }
