import useSWR from 'swr'
import { axiosClient } from '@/lib/apiClient'
import { ApiPokemon } from '@/types/models'

const pkmnFetcher = (url: string) => axiosClient.get<ApiPokemon>(url).then((res) => res)

export const usePokemon = (id: string | number | undefined): ApiPokemon | undefined => {
  return useSWR(`/api/pokemon/${id}`, pkmnFetcher).data
}
