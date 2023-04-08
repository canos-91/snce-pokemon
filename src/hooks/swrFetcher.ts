import useSWR from 'swr'
import { axiosClient } from '@/lib/apiClient'
import { ApiPokemon } from '@/types/models'

const fetcher = (url: string) => axiosClient.get(url).then((res) => res)

export const usePokemon = (id: string | number | undefined): { pkmn: ApiPokemon } => {
  const { data } = useSWR(`/api/pokemon/${id}`, fetcher)

  return {
    pkmn: data as ApiPokemon,
  }
}
