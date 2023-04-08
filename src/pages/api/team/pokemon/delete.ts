import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamPokemonData } from '@/services/teamService'
import { routeHandler } from '@/handlers/apiRouteHandler'

interface TeamPokemonDeleteRequest extends NextApiRequest {
  body: TeamPokemonData
}

const removeFromTeam = async (req: TeamPokemonDeleteRequest) => {
  const { body }: TeamPokemonDeleteRequest = req
  return await teamService.removePkmnFromTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<boolean>(req, res, { DELETE: removeFromTeam })
}
