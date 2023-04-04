import type { NextApiRequest, NextApiResponse } from 'next'
import { pokeApiService } from '@/services'
import type { Pokemon } from '@/types/models/Pokemon'
import { RouteHandler } from '@/handlers/apiRouteHandler'

const getPokemon = async (req: NextApiRequest): Promise<Pokemon | undefined> => {
  const { query }: NextApiRequest = req
  return await pokeApiService.getPokemon(query.name as string)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return await RouteHandler(req, res, { GET: getPokemon })
}
