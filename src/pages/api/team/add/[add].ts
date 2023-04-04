import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamAddPokemonData } from '@/services/teamService'
import { RouteHandler } from '@/handlers/apiRouteHandler'

interface TeamCreateRequest extends NextApiRequest {
  body: TeamAddPokemonData
}

const addPkmnToTeam = async (req: TeamCreateRequest): Promise<string> => {
  const { body }: TeamCreateRequest = req
  return await teamService.addPkmnToTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: addPkmnToTeam })
}
