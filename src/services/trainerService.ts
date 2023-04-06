import { prisma } from '@/lib/prismaClient'
import { TrainerWithTeams } from '@/types/models'
import { Trainer } from '@prisma/client'

export default class TrainerService {
  /**
   * Creates a new trainer with unique username
   *
   * @param username
   * @returns - the created trainer or undefined
   */
  createTrainer = async (username: string): Promise<Trainer | undefined> => {
    try {
      return await prisma.trainer.upsert({
        where: {
          username,
        },
        update: {},
        create: { username },
      })
    } catch (e) {
      console.log(`An error occurred while creating Trainer with '${username}' username: ${e}`)
      throw e
    }
  }

  /**
   * Lists all trainers
   * @returns - the trainers
   */
  listTrainers = async (): Promise<TrainerWithTeams[]> => {
    const trainers = await prisma.trainer.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        teams: true,
      },
    })

    if (!trainers.length) throw new Error(`An error occurred while listing trainer's trainers`)

    return trainers
  }
}
