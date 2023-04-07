import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

const getTeam = async (req: NextApiRequest): Promise<TeamWithRelations | null> => {
  const { body } = req
  return await teamService.readTeam(body)
}

const deleteTeam = async (req: NextApiRequest): Promise<boolean> => {
  const { query } = req
  return await teamService.deleteTeam(parseInt(query.id as string))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<TeamWithRelations | undefined | void> {
  return await RouteHandler(req, res, { GET: getTeam, DELETE: deleteTeam })
}
