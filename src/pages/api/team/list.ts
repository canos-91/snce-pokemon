import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { TeamWithRelations } from '@/types/models'

const listTeams = async (req: NextApiRequest) => {
  const { query } = req
  const trainerId: number = parseInt(query.trainerId as string)
  return await teamService.listTeams(trainerId)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<TeamWithRelations[]>(req, res, { GET: listTeams })
}
