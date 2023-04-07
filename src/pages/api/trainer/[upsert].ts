import type { NextApiRequest, NextApiResponse } from 'next'
import { trainerService } from '@/services'
import { RouteHandler } from '@/handlers/apiRouteHandler'
import { Trainer } from '@prisma/client'

interface TrainerCreateRequest extends NextApiRequest {
  body: { username: string }
}

const uspsertTrainer = async (req: TrainerCreateRequest): Promise<Trainer | undefined> => {
  const { body }: TrainerCreateRequest = req
  return await trainerService.uspsertTrainer(body.username)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await RouteHandler(req, res, { POST: uspsertTrainer })
}
