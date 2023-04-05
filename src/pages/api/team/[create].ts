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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: createTeam })

  // try {
  //   let team: Team | undefined
  //   switch (method) {
  //     case 'POST': {
  //       team = await teamService.createTeam(body)
  //       break
  //     }
  //     default:
  //       res.setHeader('Allow', ['POST'])
  //       res.status(405).end(`Method ${method} not allowed`)
  //   }
  //   if (team === undefined) {
  //     res.status(404).json(team)
  //   }
  //   res.status(200).json(team)
  // } catch (err) {
  //   res.status(500).json({ error: 'failed to load data' })
  // }
}
