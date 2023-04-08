import styles from './PokemonRandom.module.scss'
import classNames from 'classnames'
import type { ApiPokemon, PokemonWithRelations } from '@/types/models'
import { useMemo, useState } from 'react'
import { useUser } from '@/context/UserContext'
import { axiosClient } from '@/lib/apiClient'
import { pokeApiService } from '@/services/pokeApiService'
import { getRandomInt } from '@/utils/number'
import { Button } from '@/components/atoms'
import { PokemonCard } from '@/components/pokemon'
// import useSWR, { Fetcher } from 'swr'

interface PokemonRandomProps {
  save?: boolean
}

const PokemonRandom = ({ save = false }: PokemonRandomProps) => {
  const { currentTeam, teamPokemons, setTeamPokemons } = useUser()
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

  const teamPokemonIds: number[] = useMemo(() => teamPokemons?.map((p) => p.id) || [], [teamPokemons])

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
    if (rndPokemon && currentTeam) {
      try {
        const pkmn: PokemonWithRelations = await axiosClient.post(`/api/pokemon/create`, {
          ...rndPokemon,
        })

        if (pkmn.id) {
          let added = false

          if (save) {
            added = await axiosClient.post(`/api/team/pokemon/add`, [
              {
                teamId: currentTeam.id,
                pokemonId: pkmn.id,
              },
            ])
          }

          if (added || !save) {
            setTeamPokemons([...teamPokemons, pkmn])
            setRndPokemon(undefined)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return (
    <div className={classNames(styles['random-pkmn'], 'container')}>
      <PokemonCard pkmn={rndPokemon} active={rndPokemon !== undefined} />

      {/* ACtions */}
      <div className={styles.btns}>
        <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" color="accent" />
        <Button
          onClick={addToTeam}
          action="Add to team"
          disabled={!rndPokemon || teamPokemons.length >= 6 || teamPokemonIds.includes(rndPokemon.id)}
        />
      </div>
    </div>
  )
}

export default PokemonRandom
