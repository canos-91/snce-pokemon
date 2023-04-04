// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pokeApiService } from '@/services'
import type { Pokemon } from '@/types/models/Pokemon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | undefined>
) {
  const { method, query }: NextApiRequest = req

  let pokemon: Pokemon | undefined

  switch (method) {
    case 'GET': {
      pokemon = await pokeApiService.getPokemon(query.name as string)
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} not allowed`)
  }
  console.log(pokemon)
  res.status(200).json(pokemon)
}
