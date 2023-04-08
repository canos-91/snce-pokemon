import type { NextApiRequest, NextApiResponse } from 'next'
import { trainerService } from '@/services'
import { routeHandler } from '@/handlers/apiRouteHandler'
import type { Trainer } from '@prisma/client'

interface TrainerCreateRequest extends NextApiRequest {
  body: { username: string }
}

const createTrainer = async (req: TrainerCreateRequest) => {
  const { body } = req
  return await trainerService.createTrainer(body.username)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await routeHandler<Trainer>(req, res, { POST: createTrainer })
}
