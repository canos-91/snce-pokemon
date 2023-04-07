import styles from './TeamsList.module.scss'
import { useUser } from '@/context/UserContext'
import { GlassBadge } from '@/components/glass'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TeamWithRelations } from '@/types/models'

export default function TeamsList() {
  const router = useRouter()
  const { setCurrentTeam, trainer } = useUser()

  const setTeamAndPush = (team: TeamWithRelations) => {
    setCurrentTeam(team)
    router.push(`/team/${team.id}/edit`)
  }

  return (
    <ul className={styles['teams-list']}>
      <ul className="container">
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
    </ul>
  )
}
