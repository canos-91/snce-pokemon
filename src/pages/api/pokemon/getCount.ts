import type { NextApiRequest, NextApiResponse } from 'next'
import { pokeApiService } from '@/services/pokeApiService'
import { routeHandler } from '@/handlers/apiRouteHandler'

const getPokemonCount = async (): Promise<number | undefined> => {
  return await pokeApiService.getPokemonCount()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<number>(req, res, { GET: getPokemonCount })
}
