import type { NextApiRequest, NextApiResponse } from 'next'
import { trainerService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { Trainer } from '@prisma/client'

const listTrainers = async (): Promise<Trainer[]> => {
  return await trainerService.listTrainers()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return await RouteHandler(req, res, { GET: listTrainers })
}
