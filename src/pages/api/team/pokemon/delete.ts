import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamPokemonData } from '@/services/teamService'
import { RouteHandler } from '@/handlers/apiRouteHandler'

interface TeamPokemonDeleteRequest extends NextApiRequest {
  body: TeamPokemonData
}

const removeFromTeam = async (req: TeamPokemonDeleteRequest): Promise<boolean> => {
  const { body }: TeamPokemonDeleteRequest = req
  return await teamService.removePkmnFromTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { DELETE: removeFromTeam })
}
