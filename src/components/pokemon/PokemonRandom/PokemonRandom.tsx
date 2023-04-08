import styles from './PokemonRandom.module.scss'
import type { ApiPokemon, PokemonWithRelations } from '@/types/models'
import { useMemo, useState } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { pokeApiService } from '@/services/pokeApiService'
import { getRandomInt } from '@/utils/number'
import { Button } from '@/components/atoms'
import { PokemonCard } from '@/components/pokemon'
import { TeamPokemonData } from '@/services/teamService'
import { useTeam } from '@/context/TeamContext'
// import useSWR, { Fetcher } from 'swr'

interface PokemonRandomProps {
  save?: boolean
}

const PokemonRandom = ({ save = false }: PokemonRandomProps) => {
  const { team, pokemons, setPokemons } = useTeam()
  const [rndPokemon, setRndPokemon] = useState<ApiPokemon>()

  // const [rndPkmnId, setRndPkmnId] = useState<number>()

  // const pkmnFetcher: Fetcher<void> = (url: string) => {
  //   if (rndPkmnId) {
  //     axiosClient.get<ApiPokemon>(url).then((pkmn) => {
  //       setPokemon(pkmn)
  //     })
  //   }
  // }

  // useSWR(() => `/api/pokemon/${rndPkmnId}`, pkmnFetcher)

  const teamPokemonIds: number[] = useMemo(() => pokemons?.map((p) => p.id) || [], [pokemons])

  /**
   * Fetches a random Pokémon from the api
   */
  const getRandomPokemon = async () => {
    const id = getRandomInt(1, 1010)
    const pkmn: ApiPokemon | undefined = await pokeApiService.getPokemon(id)
    setRndPokemon(pkmn)
  }

  /**
   * Adds the random Pokémon to the created team
   */
  const addToTeam = async () => {
    if (rndPokemon && team) {
      try {
        const pkmn = await axiosClient.post<ApiPokemon, PokemonWithRelations>(`/api/pokemon/create`, {
          ...rndPokemon,
        })

        if (pkmn) {
          let added: boolean | undefined = false

          if (save) {
            added = await axiosClient.post<TeamPokemonData[], boolean>(`/api/team/pokemon/add`, [
              {
                teamId: team.id,
                pokemonId: pkmn.id,
              },
            ])
          }

          if (added || !save) {
            setPokemons([...pokemons, pkmn])
            setRndPokemon(undefined)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className={styles['random-pkmn']}>
      <PokemonCard pkmn={rndPokemon} active={rndPokemon !== undefined} />

      {/* ACtions */}
      <div className={styles.btns}>
        <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" color="accent" />
        <Button
          onClick={addToTeam}
          action="Add to team"
          disabled={!rndPokemon || pokemons.length >= 6 || teamPokemonIds.includes(rndPokemon.id)}
        />
      </div>
    </div>
  )
}

export default PokemonRandom
