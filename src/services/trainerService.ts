import { prisma } from '@/lib/prismaClient'
import { TrainerWithTeams } from '@/types/models'
import { Trainer } from '@prisma/client'
import { teamRelations } from '@/services/teamService'

export default class TrainerService {
  /**
   * Creates a new trainer with unique username
   *
   * @param username
   * @returns - the created trainer or undefined
   */
  createTrainer = async (username: string): Promise<Trainer | undefined> => {
    try {
      return await prisma.trainer.create({
        data: { username },
      })
    } catch (e) {
      throw new Error(`An error occurred while creating Trainer with '${username}' username: ${e}`)
    }
  }

  /**
   * Lists all trainers
   * @returns - the trainers
   */
  listTrainers = async (): Promise<TrainerWithTeams[]> => {
    try {
      return await prisma.trainer.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          teams: {
            include: teamRelations,
          },
        },
      })
    } catch (e) {
      throw new Error(`An error occurred while listing trainer's trainers: ` + e)
    }
  }
}
