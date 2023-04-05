// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const pokemons = await prisma.pokemon.findMany({
    include: {
      abilities: {
        select: {
          ability: {
            select: { name: true },
          },
        },
      },
      types: {
        select: {
          type: {
            select: { name: true },
          },
        },
      },
    },
  })
  res.status(200).json(pokemons)
}
