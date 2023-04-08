import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamPokemonData } from '@/services/teamService'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

interface TeamPokemonUpdateRequest extends NextApiRequest {
  body: TeamPokemonData[]
}

const addToTeam = async (req: TeamPokemonUpdateRequest) => {
  const { body } = req
  return await teamService.upsertManyTeamPokemons(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<TeamWithRelations | null>(req, res, { POST: addToTeam })
}
