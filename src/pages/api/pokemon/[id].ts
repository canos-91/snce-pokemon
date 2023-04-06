import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { PokemonWithRelations } from '@/types/models'

const getPokemon = async (req: NextApiRequest): Promise<PokemonWithRelations | null> => {
  const { query } = req
  return await pokemonService.readPokemon(parseInt(query.id as string))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<PokemonWithRelations | undefined | void> {
  return await RouteHandler<PokemonWithRelations>(req, res, { GET: getPokemon })
}
