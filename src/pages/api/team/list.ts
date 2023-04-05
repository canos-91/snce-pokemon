import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { Team } from '@prisma/client'

const listTeams = async (req: NextApiRequest): Promise<Team[]> => {
  const { query }: NextApiRequest = req
  const trainerId: number = parseInt(query.trainerId as string)
  return await teamService.listTeams(trainerId)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return await RouteHandler(req, res, { GET: listTeams })
}
