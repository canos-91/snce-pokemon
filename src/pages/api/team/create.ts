import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamCreateData } from '@/services/teamService'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

interface TeamCreateRequest extends NextApiRequest {
  body: TeamCreateData
}

const createTeam = async (req: TeamCreateRequest) => {
  const { body } = req
  return await teamService.createTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<TeamWithRelations>(req, res, { POST: createTeam })
}
