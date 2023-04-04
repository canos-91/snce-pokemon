// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { teamService } from '@/services'
import type { Pokemon } from '@/types/models/Pokemon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | undefined>
) {
  const { method, query }: NextApiRequest = req

  switch (method) {
    case 'POST': {
      // await teamService.addPkmnToTeam('TestTeam', 1)
      break
    }
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} not allowed`)
  }
  res.status(200)
}
