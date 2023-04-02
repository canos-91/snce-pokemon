import Axios, { AxiosInstance } from 'axios'
// import { handleError } from './ApiServiceErrors';

export type HttpHeaders = {
  [key: string]: string
}

export type RequestConfig = {
  headers: HttpHeaders
}
export class ApiConfiguration {
  accessToken?: string
  baseURL?: string
}

export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>
  get<TResponse>(path: string): Promise<TResponse>
}

const handleError = (error: unknown) => {
  console.log(error)
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance

  protected createAxiosClient(apiConfig?: ApiConfiguration): AxiosInstance {
    return Axios.create({
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfig &&
          apiConfig.accessToken && {
            Authorization: `Token ${apiConfig.accessToken}`,
          }),
      },
      timeout: 10 * 1000,
    })
  }

  constructor(apiConfiguration?: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration)
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<TResponse> {
    try {
      const response = config
        ? await this.client.post<TResponse>(path, payload, config)
        : await this.client.post<TResponse>(path, payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
    return {} as TResponse
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
    return {} as TResponse
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload)
      return response.data
    } catch (error) {
      handleError(error)
    }
    return {} as TResponse
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path)
      return response.data
    } catch (error) {
      handleError(error)
    }
    return {} as TResponse
  }
}
