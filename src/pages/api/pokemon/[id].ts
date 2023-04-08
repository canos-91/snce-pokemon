import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { PokemonWithRelations } from '@/types/models'

const getPokemon = async (req: NextApiRequest) => {
  const { query } = req
  return await pokemonService.readPokemon(parseInt(query.id as string))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<PokemonWithRelations | null>(req, res, { GET: getPokemon })
}
