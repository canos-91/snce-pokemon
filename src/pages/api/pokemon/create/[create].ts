import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import type { Pokemon } from '@/types/models/Pokemon'
import { RouteHandler } from '@/handlers/apiRouteHandler'

interface PokemonCreateRequest extends NextApiRequest {
  body: Pokemon
}

const createPokemon = async (req: PokemonCreateRequest): Promise<number | undefined> => {
  const { body }: PokemonCreateRequest = req
  return await pokemonService.createPokemon(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: createPokemon })
}
