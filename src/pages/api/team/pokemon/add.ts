import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamPokemonData } from '@/services/teamService'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

interface TeamPokemonUpdateRequest extends NextApiRequest {
  body: TeamPokemonData[]
}

const addToTeam = async (req: TeamPokemonUpdateRequest): Promise<TeamWithRelations | null> => {
  const { body }: TeamPokemonUpdateRequest = req
  return await teamService.upsertManyTeamPokemons(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: addToTeam })
}
