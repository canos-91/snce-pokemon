import type { NextApiRequest, NextApiResponse } from 'next'
import { pokemonService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { ApiPokemon } from '@/services/pokeApiService'
import { Pokemon } from '@prisma/client'

interface PokemonCreateRequest extends NextApiRequest {
  body: ApiPokemon
}

const createPokemon = async (req: PokemonCreateRequest): Promise<Pokemon | undefined> => {
  const { body }: PokemonCreateRequest = req
  return await pokemonService.createPokemon(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: createPokemon })
}
