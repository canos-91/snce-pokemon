import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamPokemonData } from '@/services/teamService'
import { RouteHandler } from '@/handlers/apiRouteHandler'

interface TeamPokemonUpdateRequest extends NextApiRequest {
  body: TeamPokemonData
}

const addToTeam = async (req: TeamPokemonUpdateRequest): Promise<boolean> => {
  const { body }: TeamPokemonUpdateRequest = req
  return await teamService.addPkmnToTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: addToTeam })
}
