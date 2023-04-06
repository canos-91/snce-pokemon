import Head from 'next/head'
import styles from './CreateTeam.module.scss'
import { useState } from 'react'
import { Button } from '@/components/atoms'
import { getRandomInt } from '@/utils/number'
import classNames from 'classnames'
import { PokemonCard } from '@/components'
import { Pokemon } from '@prisma/client'
import { ApiPokemon } from '@/services/pokeApiService'
// import useSWR, { Fetcher } from 'swr'
import { axiosClient } from '@/lib/apiClient'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'

export default function CreateTeam() {
  useAuthGuard()

  const { user } = useUser()
  const [rndPokemon, setPokemon] = useState<ApiPokemon>()
  const [team, setTeam] = useState<ApiPokemon[]>([])

  // const [rndPkmnId, setRndPkmnId] = useState<number>()

  // const pkmnFetcher: Fetcher<void> = (url: string) => {
  //   if (rndPkmnId) {
  //     axiosClient.get<ApiPokemon>(url).then((pkmn) => {
  //       setPokemon(pkmn)
  //     })
  //   }
  // }

  // useSWR(() => `/api/pokemon/${rndPkmnId}`, pkmnFetcher)

  /**
   * Fetches a random Pokémon from the api
   */
  const getRandomPokemon = async () => {
    const id = getRandomInt(1, 1010)
    const pkmn: ApiPokemon | undefined = await axiosClient.get(`/api/pokemon/${id}`)
    setPokemon(pkmn)
    // setRndPkmnId(id)
  }

  /**
   * Adds the random Pokémon to the created team
   */
  const addToTeam = async () => {
    if (rndPokemon) {
      try {
        const pkmn: Pokemon = await axiosClient.post(`/api/pokemon/create/${rndPokemon?.id}`, { ...rndPokemon })

        if (pkmn) {
          const added = await axiosClient.post(`/api/team/add/${1}`, { teamId: 1, pokemonId: pkmn.id })

          if (added) {
            setTeam([...team, rndPokemon])
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  /**
   * Creates a new team for tehe current trainer
   */
  const createTeam = async () => {
    await axiosClient.post(`/api/team/create`, { trainerId: 1, name: 'Pippo' })
  }
  return (
    <>
      <Head>
        <title>PT | Create new team</title>
        <meta name="description" content="Pokémon Trainer - Create new team" />
      </Head>
      <main className={classNames(styles['create-team-page'])}>
        <section className={classNames(styles['random-pkmn'], 'container')}>
          <PokemonCard pkmn={rndPokemon} active={rndPokemon !== undefined} />
          <div className={styles.btns}>
            <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" color="accent" />
            <Button onClick={addToTeam} action="Add to team" disabled={!rndPokemon || team.length >= 6} />
            <Button onClick={createTeam} action="Create new team" />
          </div>
        </section>
        <section className={classNames(styles.team, 'container')}>
          {team.map((pokemon, index) => (
            <PokemonCard key={index} pkmn={pokemon} />
          ))}
        </section>
      </main>
    </>
  )
}
