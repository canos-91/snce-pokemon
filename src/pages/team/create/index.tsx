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

  /**
   * Fetches a random Pokémon from the api
   */
  const getRandomPokemon = async () => {
    const id = getRandomInt(1, 1010)
    const pkmn: Pokemon | undefined = await axiosClient.get(`/api/pokemon/${id}`)
    if (pkmn) setPokemon(pkmn)
  }

  /**
   * Adds the random Pokémon to the created team
   */
  const addToTeam = async () => {
    if (pokemon) {
      try {
        const createdPkmnId = await axiosClient.post(`/api/pokemon/create/${pokemon?.id}`, { ...pokemon })

        console.log('addes', createdPkmnId)
        if (createdPkmnId) {
          const added = await axiosClient.post(`/api/team/add/${1}`, { teamId: 1, pokemonId: createdPkmnId })

          console.log('addes', added)

          if (added) {
            setTeam([...team, pokemon])
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
          <PokemonCard pkmn={pokemon} active={pokemon !== undefined} />
          <div className={styles.btns}>
            <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" />
            <Button onClick={addToTeam} action="Add to team" disabled={!pokemon || team.length >= 6} />
          </div>
        </section>
        <section className={styles.team}>
          <PokemonTeam team={team} />
        </section>
      </main>
    </>
  )
}
