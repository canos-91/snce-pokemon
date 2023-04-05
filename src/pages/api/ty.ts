// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const typ = await prisma.type.findMany()
  res.status(200).json(typ)
}