import styles from './TeamsList.module.scss'
import { useUser } from '@/context/UserContext'
import { GlassBadge } from '@/components/glass'
import { useRouter } from 'next/router'
import type { TeamWithRelations } from '@/types/models'
import classNames from 'classnames'
import { useTeam } from '@/context/TeamContext'

const TeamsList = () => {
  const router = useRouter()
  const { trainer } = useUser()
  const { setTeam } = useTeam()

  /**
   * Sets selected team and redirects to edit page
   * @param team
   */
  const setTeamAndPush = (team: TeamWithRelations) => {
    setTeam(team)
    router.push(`/team/${team.id}/edit`)
  }

  return (
    <ul className={classNames('container', styles['teams-list'])}>
      {trainer?.teams?.map((team, i) => (
        <li key={i}>
          <GlassBadge
            type="team"
            attributes={{ title: team.name, subtitle: `${team.pokemons?.length} Pokémons` }}
            onClick={() => setTeamAndPush(team)}
          />
        </li>
      ))}
    </ul>
  )
}

export default TeamsList
