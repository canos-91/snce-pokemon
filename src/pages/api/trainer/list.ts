import type { NextApiRequest, NextApiResponse } from 'next'
import { trainerService } from '@/services'
import { routeHandler } from '@/handlers/apiRouteHandler'
import { Trainer } from '@prisma/client'

const listTrainers = async () => {
  return await trainerService.listTrainers()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<Trainer[]>(req, res, { GET: listTrainers })
}
