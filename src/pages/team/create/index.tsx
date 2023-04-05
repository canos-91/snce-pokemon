import Head from 'next/head'
import styles from './CreateTeam.module.scss'
import { useState } from 'react'
import { PokemonTeam } from '@/components'
import { Button } from '@/components/atoms'
import { getRandomInt } from '@/utils/number'
import classNames from 'classnames'
import { PokemonCard } from '@/components'
import { axiosClient } from '@/lib/apiClient'
import { Pokemon } from '@prisma/client'
import { ApiPokemon } from '@/services/pokeApiService'

export default function CreateTeam() {
  const [rndPokemon, setPokemon] = useState<ApiPokemon>()
  const [team, setTeam] = useState<ApiPokemon[]>([])

  /**
   * Fetches a random Pokémon from the api
   */
  const getRandomPokemon = async () => {
    const id = getRandomInt(1, 1010)
    const pkmn: ApiPokemon | undefined = await axiosClient.get(`/api/pokemon/${id}`)
    if (pkmn) setPokemon(pkmn)
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
            setPokemon(undefined)
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
        <Button onClick={createTeam} action="Create new team" />
        <section className={styles['random-pkmn']}>
          <PokemonCard pkmn={rndPokemon} active={rndPokemon !== undefined} />
          <div className={styles.btns}>
            <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" />
            <Button onClick={addToTeam} action="Add to team" disabled={!rndPokemon || team.length >= 6} />
          </div>
        </section>
        <section className={styles.team}>
          <PokemonTeam team={team} />
        </section>
      </main>
    </>
  )
}
