// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { Team, TeamCreateData } from '@/types/models/Team'
import { RouteHandler } from '@/handlers/apiRouteHandler'

interface TeamCreateRequest extends NextApiRequest {
  body: TeamCreateData
}

const createTeam = async (req: TeamCreateRequest, res: NextApiResponse<Team | undefined>) => {
  const { body }: TeamCreateRequest = req
  const team: Team | undefined = await teamService.createTeam(body)
  console.log(team)
  res.status(200).json(team)
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
