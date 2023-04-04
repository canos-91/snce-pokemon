import Head from 'next/head'
import styles from './CreateTeam.module.scss'
import { useState } from 'react'
import { PokemonTeam } from '@/components'
import { Button } from '@/components/atoms'
import type { Pokemon } from '@/types/models/Pokemon'
import { getRandomInt } from '@/utils/number'
import classNames from 'classnames'
import { PokemonCard } from '@/components'
import { axiosClient } from '@/lib/apiClient'

export default function CreateTeam() {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [team, setTeam] = useState<Pokemon[]>([])

  const getRandomPokemon = async () => {
    const id = getRandomInt(1, 500)

    await fetch(`/api/pokemon/${id}`, {
      method: 'GET',
    })
      .then((res: Response) => {
        return res.json()
      })
      .then((pokemon: Pokemon | undefined) => {
        if (pokemon) setPokemon(pokemon)
      })
      .catch((error) => console.log(error))
  }

  const addToTeam = async () => {
    await fetch(`/api/team/pippo`, {
      method: 'POST',
    }).catch((error) => console.log(error))
  }

  const createTeam = async () => {
    await axiosClient.post(`/api/team/create`, { trainerId: 1, name: 'Pippo' })
    // await fetch(`/api/team/create`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ trainerId: 1, name: 'Pippo' }),
    // }).catch((error) => console.log(error))
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
          <PokemonCard pkmn={pokemon} active={pokemon !== undefined} />
          <div className={styles.btns}>
            <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" />
            <Button onClick={addToTeam} action="Add to team" />
          </div>
        </section>
        <section className={styles.team}>
          <PokemonTeam team={team} />
        </section>
      </main>
    </>
  )
}
