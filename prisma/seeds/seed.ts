import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { types } from './types'

/**
 * Seeder function
 */
const seed = async () => {
  try {
    await Promise.all(
      types.map((t) =>
        prisma.type.upsert({
          where: {
            id: t.id,
          },
          update: {
            name: t.name,
          },
          create: {
            id: t.id,
            name: t.name,
          },
        })
      )
    ).then(() => {
      console.log('Pokémon types data seeder executed')
    })

    // await prisma.type.createMany({
    //   data: types,
    // })
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
