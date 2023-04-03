// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import type { IPokemon } from '@/types/models/Pokemon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPokemon | undefined>
) {
  const { method, query }: NextApiRequest = req

  let pokemon: IPokemon | undefined

  switch (method) {
    case 'GET': {
      pokemon = await pokemonService.getPokemon(query.name as string)
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} not allowed`)
  }

  res.status(200).json(pokemon)
}
