import type { NextApiRequest, NextApiResponse } from 'next'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type HttpHandler = (request: NextApiRequest, response: NextApiResponse) => Promise<any>

export interface RouteHandlers {
  GET?: HttpHandler
  POST?: HttpHandler
  PUT?: HttpHandler
  DELETE?: HttpHandler
}

export async function RouteHandler(request: NextApiRequest, response: NextApiResponse, handlers: RouteHandlers) {
  const method = request.method as HttpMethod
  const handler: HttpHandler | undefined = handlers[method]

  if (!handler) {
    return response.status(405).send('Method not allowed')
  }

  try {
    const resource = await handler(request, response)

    if (resource === undefined) {
      return response.status(404).json({ message: 'Resource not found' })
    }
    return response.status(200).json(resource)
  } catch (err) {
    console.log(err)
    return response.status(500).json({ error: 'Failed to load data' })
  }
}
