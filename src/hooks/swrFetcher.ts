// import useSWR from 'swr'
// import { axiosClient } from '@/lib/apiClient'
// import { ApiPokemon } from '@/services/pokeApiService'

// const fetcher = (url: string) => axiosClient.get(url).then((res) => res)

// export function usePokemon(id: string | number | undefined): { pkmn: ApiPokemon } {
//   const { data } = useSWR(`/api/pokemon/${id}`, fetcher)

//   return {
//     pkmn: data as ApiPokemon,
//   }
// }
