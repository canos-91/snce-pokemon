// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
  ) {
  
  const user = await prisma.users.create({
    data: {
      username: 'Elsa Prisma',
    },
  })
  res.status(200).json({user})
}
