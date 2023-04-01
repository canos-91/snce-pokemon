// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma'
import axios from 'axios'

type Pokemon = {
  [key: string]: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  const { method, query }: NextApiRequest = req

  let pokemon = {}

  switch (method) {
    case 'GET': {
      const fetchPokemon = async (name: string) => {
        const res = await axios.get<Pokemon>(
          'https://pokeapi.co/api/v2/pokemon/' + name
        )
        return {
          name: res.data.name,
          types: res.data.types,
          sprite: res.data.sprites.front_default,
        }
      }

      pokemon = await fetchPokemon(query.name as string)
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} not allowed`)
  }

  res.status(200).json({ ...pokemon })
}
