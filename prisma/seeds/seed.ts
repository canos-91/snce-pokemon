import { PrismaClient } from '@prisma/client'
import { trainersData } from './seedData'

const prisma = new PrismaClient()

/**
 * Seeder function
 */
const seed = async () => {
  try {
    await prisma.trainer
      .createMany({
        data: trainersData,
      })
      .then(() => {
        console.log('Trainers seeder executed')
      })
  } catch (e) {
    console.error(`An error occured while seeding DB: ${e}`)
    await prisma.$disconnect()
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Run seeder
 */
seed()
