import type { NextApiRequest, NextApiResponse } from 'next'
import { pokeApiService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { ApiPokemon } from '@/services/pokeApiService'

const getPokemon = async (req: NextApiRequest): Promise<ApiPokemon | undefined> => {
  const { query }: NextApiRequest = req
  return await pokeApiService.getPokemon(query.name as string)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return await RouteHandler(req, res, { GET: getPokemon })
}
