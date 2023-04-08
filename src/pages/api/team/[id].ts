import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

const getTeam = async (req: NextApiRequest) => {
  const { body } = req
  return await teamService.readTeam(body)
}

const deleteTeam = async (req: NextApiRequest) => {
  const { query } = req
  return await teamService.deleteTeam(parseInt(query.id as string))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<boolean | TeamWithRelations | null>(req, res, { GET: getTeam, DELETE: deleteTeam })
}
