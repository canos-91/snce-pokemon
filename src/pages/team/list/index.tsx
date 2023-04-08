import Head from 'next/head'
import styles from './TeamsListPage.module.scss'
import classNames from 'classnames'
import { TeamRecap } from '@/components/team'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'
import { NewTeamForm } from '@/components/forms'
import { formatDate } from '@/utils/string'
import { ChangeEvent, useMemo, useState } from 'react'
import type { TeamWithRelations } from '@/types/models'
import type { ITeamRecap } from '@/components/team/TeamRecap/TeamRecap'
import { typeNames } from '@prisma/seeds/seedData'

export interface SaveTeam {
  saveTeam(): Promise<void>
}

const TeamsListPage = () => {
  useAuthGuard({})

  const { trainer } = useUser()
  const [typeFilter, setTypeFilter] = useState<string>('')

  /**
   * Set filter value on change
   * @param event
   */
  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(event.target.value)
  }

  /**
   * Get unique types strings from team's pokemons
   * @param team
   * @returns unique types array
   */
  const filterTypes = (team: TeamWithRelations): string[] => {
    return [...new Set(team.pokemons.map((p) => p.pokemon.types.map((t) => t.type.name)).flat(1))]
  }

  const parsedTeams: ITeamRecap[] = useMemo(
    () =>
      trainer?.teams
        ?.map((t) => ({
          name: t.name,
          createdAt: t.createdAt,
          pokemons: t.pokemons.map((p) => p.pokemon),
          baseXpSum: t.pokemons.reduce((sum, p) => sum + p.pokemon.baseXp, 0),
          types: filterTypes(t),
        }))
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt)) || [],
    [trainer?.teams]
  )

  // const parsedTypes: string[] = useMemo(() => parsedTeams.map((pt) => pt.types).flat(1) || [], [parsedTeams])

  return (
    <>
      <Head>
        <title>PT | Your teams</title>
        <meta name="description" content="Pokémon Trainer - Your teams" />
      </Head>
      <main className={classNames(styles['teams-list-page'])}>
        {!trainer?.teams ? (
          <section className={styles['create-new']}>
            <NewTeamForm />
          </section>
        ) : (
          <>
            <section className={styles.teams}>
              {/* Types filter */}
              <div className={styles.select}>
                <label htmlFor="types">Choose a type: </label>

                <select name="types" id="types" onChange={handleTypeChange}>
                  <option value="">All</option>
                  {typeNames.map((type, i) => (
                    <option className="capital" key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Teams */}
              {parsedTeams.map((team, index) => (
                <>
                  {((typeFilter && team.types.includes(typeFilter)) || !typeFilter) && (
                    <section className={styles.team} key={index}>
                      <div className={styles['section-title']}>
                        <h4>{`Team '${team.name}'`}</h4>
                        <strong>
                          {`Created on: `}
                          <span>{`${formatDate(team.createdAt)}`}</span>
                        </strong>
                      </div>
                      <TeamRecap team={team} />
                    </section>
                  )}
                </>
              ))}
            </section>
          </>
        )}
      </main>
    </>
  )
}

export default TeamsListPage
