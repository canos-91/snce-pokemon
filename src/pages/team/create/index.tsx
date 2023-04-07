import Head from 'next/head'
import styles from './CreateTeam.module.scss'
import { useState } from 'react'
import { Button } from '@/components/atoms'
import { getRandomInt } from '@/utils/number'
import classNames from 'classnames'
import { PokemonCard, PokemonTeam } from '@/components/pokemon'
import { ApiPokemon, PokemonWithRelations } from '@/types/models'
import { axiosClient } from '@/lib/apiClient'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'
import { NewTeamForm } from '@/components/forms'
import { pokeApiService } from '@/services/pokeApiService'
// import useSWR, { Fetcher } from 'swr'

export default function CreateTeam() {
  useAuthGuard({ team: true })

  const { team } = useUser()
  const [rndPokemon, setRndPokemon] = useState<ApiPokemon>()
  const [pokemons, setPokemons] = useState<PokemonWithRelations[]>([])

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
    const pkmn: ApiPokemon | undefined = await pokeApiService.getPokemon(id)
    setRndPokemon(pkmn)
    // setRndPkmnId(id)
  }

  /**
   * Adds the random Pokémon to the created team
   */
  const addToTeam = async () => {
    if (rndPokemon) {
      try {
        const pkmn: PokemonWithRelations = await axiosClient.post(`/api/pokemon/create/${rndPokemon.id}`, {
          ...rndPokemon,
        })

        if (pkmn) {
          const added: boolean = await axiosClient.post(`/api/team/pokemon/${team?.id}`, {
            teamId: team?.id,
            pokemonId: pkmn.id,
          })

          if (added) {
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
    <>
      <Head>
        <title>PT | Create new team</title>
        <meta name="description" content="Pokémon Trainer - Create new team" />
      </Head>
      <main className={classNames(styles['create-team-page'])}>
        {!team ? (
          <section className={styles['create-new']}>
            <NewTeamForm />
          </section>
        ) : (
          <>
            <section className={styles['add-to-team']}>
              {/* Random Pkmn */}
              <div className={classNames(styles['random-pkmn'], 'container')}>
                <PokemonCard pkmn={rndPokemon} active={rndPokemon !== undefined} />
                <div className={styles.btns}>
                  <Button onClick={getRandomPokemon} action="Gotta catch 'em all!" color="accent" />
                  <Button onClick={addToTeam} action="Add to team" disabled={!rndPokemon || pokemons.length >= 6} />
                </div>
              </div>

              {/* Team Pokemons */}
              {pokemons.length !== 0 && <PokemonTeam setPokemons={setPokemons} pokemons={pokemons} />}
            </section>
          </>
        )}
      </main>
    </>
  )
}
