import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamUpdateData } from '@/services/teamService'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { Team } from '@prisma/client'

interface TeamUpdateRequest extends NextApiRequest {
  body: TeamUpdateData
}

const updateTeam = async (req: TeamUpdateRequest): Promise<Team | undefined> => {
  const { body }: TeamUpdateRequest = req
  return await teamService.updateTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { PUT: updateTeam })
}
