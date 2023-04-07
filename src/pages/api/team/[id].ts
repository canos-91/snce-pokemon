import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

const getTeam = async (req: NextApiRequest): Promise<TeamWithRelations | null> => {
  const { body } = req
  return await teamService.readTeam(body)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<TeamWithRelations | undefined | void> {
  return await RouteHandler(req, res, { GET: getTeam })
}
