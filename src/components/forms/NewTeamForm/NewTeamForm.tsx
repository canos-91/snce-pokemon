/* eslint-disable react-hooks/exhaustive-deps */
import styles from './NewTeamForm.module.scss'
import { useUser } from '@/context/UserContext'
import { useState, useMemo, FormEvent } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Button, Input } from '@/components/atoms'
import { TeamWithRelations } from '@/types/models'

export default function NewTeamForm() {
  const [teamName, setTeamName] = useState<string>('')
  const { user, setUserTeam } = useUser()

  const teamNames: string[] = useMemo(() => user?.teams?.map((t) => t.name.toLowerCase()) || [], [user?.teams])

  /**
   * Creates a new Team for current user
   */

  const createTeam = async (event: FormEvent) => {
    event.preventDefault()

    const team: TeamWithRelations | undefined = await axiosClient.post(`/api/team/create`, {
      name: teamName,
      trainerId: user?.id,
    })
    if (team) {
      // if (!teamNames.includes(created.username)) setTrainersList([...trainers, created])
      setUserTeam(team)
    }
  }

  return (
    <form onSubmit={createTeam} className={styles['new-team-form']}>
      <div>
        <h1 className={styles.title}>Create new team</h1>
      </div>
      <Input value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="Team name" />
      <Button
        action="Create team"
        color="accent"
        type="submit"
        disabled={!teamName || teamNames.includes(teamName.toLocaleLowerCase())}
      />
    </form>
  )
}
