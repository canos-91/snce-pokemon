import type { NextApiRequest, NextApiResponse } from 'next'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type HttpHandler<T> = (request: NextApiRequest, response: NextApiResponse<T>) => Promise<T | undefined>

interface ApiHandlerError {
  code: number
  error?: unknown
}

const apiErrorHandler = (e: ApiHandlerError, response: NextApiResponse): void => {
  let message: string

  switch (e.code) {
    case 404:
      message = `Method not allowed`
      break
    case 405:
      message = `Resource not found`
      break
    default:
      message = `Server error`
  }

  return response.status(e.code).json({ statusCode: e.code, message, error: e.error })
}

/**
 * Handles requests to API router
 * @param request
 * @param response
 * @param handlers - route method handlers
 * @returns
 */
export const routeHandler = async <T>(
  request: NextApiRequest,
  response: NextApiResponse<T>,
  handlers: {
    GET?: HttpHandler<T>
    POST?: HttpHandler<T>
    PUT?: HttpHandler<T>
    DELETE?: HttpHandler<T>
  }
): Promise<T | void> => {
  const method = request.method as HttpMethod
  const handler = handlers[method]

  if (!handler) {
    return apiErrorHandler(
      {
        code: 405,
      },
      response
    )
  }

  try {
    const resource = await handler(request, response)

    if (resource === undefined) {
      return apiErrorHandler(
        {
          code: 404,
        },
        response
      )
    }
    return response.status(200).json(resource)
  } catch (error) {
    return apiErrorHandler(
      {
        code: 500,
        error,
      },
      response
    )
  }
}
