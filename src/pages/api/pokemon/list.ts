// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import type { IPokemon } from '@/types/models/Pokemon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPokemon | undefined>
) {
  const { method, query }: NextApiRequest = req

  let list: any

  switch (method) {
    case 'GET': {
      list = await pokemonService.list()
      break
    }
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} not allowed`)
  }

  res.status(200).json(list)
}
