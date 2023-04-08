import Axios, { AxiosInstance } from 'axios'

export type HttpHeaders = {
  [key: string]: string
}

export type ConfigData = {
  [key: string]: string | number
}

export type RequestConfig = {
  headers?: HttpHeaders
  data?: ConfigData
}
export class ApiConfiguration {
  accessToken?: string
  baseURL?: string
}

export interface IApiClient {
  post<TRequest, TResponse>(path: string, object: TRequest, config?: RequestConfig): Promise<TResponse | undefined>
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse | undefined>
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse | undefined>
  get<TResponse>(path: string): Promise<TResponse | undefined>
  delete<TResponse>(path: string, config?: RequestConfig): Promise<TResponse | undefined>
}

const handleError = (error: unknown) => {
  console.log(`API Client error: ${error}`)
  return undefined
}

/**
 * Axios reusable wrapper
 */
export class ApiClient implements IApiClient {
  private client: AxiosInstance

  protected createAxiosClient(apiConfig?: ApiConfiguration): AxiosInstance {
    return Axios.create({
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfig?.accessToken && {
          Authorization: `Token ${apiConfig.accessToken}`,
        }),
        ...(apiConfig?.baseURL && {
          baseURL: apiConfig.baseURL,
        }),
      },
      timeout: 10 * 1000,
    })
  }

  constructor(apiConfiguration?: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration)
  }

  async get<TResponse>(path: string): Promise<TResponse | undefined> {
    return await this.client
      .get<TResponse>(path)
      .then((res) => res.data)
      .catch((err) => handleError(err))
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<TResponse | undefined> {
    return await this.client
      .post<TResponse>(path, payload, config)
      .then((res) => res.data)
      .catch((err) => handleError(err))
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse | undefined> {
    return await this.client
      .patch<TResponse>(path, payload)
      .then((res) => res.data)
      .catch((err) => handleError(err))
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse | undefined> {
    return await this.client
      .put<TResponse>(path, payload)
      .then((res) => res.data)
      .catch((err) => handleError(err))
  }

  async delete<TResponse>(path: string, config?: RequestConfig): Promise<TResponse | undefined> {
    return await this.client
      .delete<TResponse>(path, config)
      .then((res) => res.data)
      .catch((err) => handleError(err))
  }
}

export const axiosClient = new ApiClient()
