import type { NextApiRequest, NextApiResponse } from 'next'
import { pokeApiService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'

const geIPokemonCount = async (): Promise<number | undefined> => {
  return await pokeApiService.getPokemonCount()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return await RouteHandler(req, res, { GET: geIPokemonCount })
}
