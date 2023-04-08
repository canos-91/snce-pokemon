import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { ApiPokemon } from '@/types/models'
import { Pokemon } from '@prisma/client'

interface PokemonCreateRequest extends NextApiRequest {
  body: ApiPokemon
}

const createPokemon = async (req: PokemonCreateRequest) => {
  const { body } = req
  return await pokemonService.createPokemon(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<Pokemon>(req, res, { POST: createPokemon })
}
