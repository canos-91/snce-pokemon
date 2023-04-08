import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamUpdateData } from '@/services/teamService'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { Team } from '@prisma/client'
import { TeamWithRelations } from '@/types/models'

interface TeamUpdateRequest extends NextApiRequest {
  body: TeamUpdateData
}

const updateTeam = async (req: TeamUpdateRequest) => {
  const { body }: TeamUpdateRequest = req
  return await teamService.updateTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<TeamWithRelations>(req, res, { PUT: updateTeam })
}
