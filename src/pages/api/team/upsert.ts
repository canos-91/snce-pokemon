import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { TeamCreateData } from '@/services/teamService'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { Team } from '@prisma/client'

interface TeamCreateRequest extends NextApiRequest {
  body: TeamCreateData
}

const createTeam = async (req: TeamCreateRequest): Promise<Team | undefined> => {
  const { body }: TeamCreateRequest = req
  return await teamService.createTeam(body)
}

const updateTeam = async (req: TeamCreateRequest): Promise<Team | undefined> => {
  const { body }: TeamCreateRequest = req
  return await teamService.updateTeam(body)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: createTeam, PUT: updateTeam })
}
