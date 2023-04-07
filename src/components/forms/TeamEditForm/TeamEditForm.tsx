/* eslint-disable react-hooks/exhaustive-deps */
import styles from './TeamEditForm.module.scss'
import { useUser } from '@/context/UserContext'
import { useState, useMemo, FormEvent } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Button, Input } from '@/components/atoms'
import { TeamWithRelations } from '@/types/models'

export default function TeamEditForm() {
  const [teamName, setTeamName] = useState<string>('')
  const { trainer, setCurrentTeam, currentTeam } = useUser()

  const teamNames: string[] = useMemo(
    () => trainer?.teams?.map((t) => t.name.toLowerCase()).filter((name) => name !== currentTeam?.name) || [],
    [trainer?.teams]
  )

  /**
   * Creates a new Team for current trainer
   */

  const updateTeam = async (event: FormEvent) => {
    event.preventDefault()

    const team: TeamWithRelations | undefined = await axiosClient.post(`/api/team/create`, {
      name: teamName,
      trainerId: trainer?.id,
    })
    if (team) {
      // if (!teamNames.includes(created.username)) setCurrentTrainersList([...trainers, created])
      setCurrentTeam(team)
    }
  }

  return (
    <form onSubmit={updateTeam} className={styles['team-edit-form']}>
      <div className={styles.title}>
        <h4>Edit team info</h4>
      </div>
      <div className={styles.field}>
        <label htmlFor="team-name">Team name</label>
        <Input
          id="team-name"
          type="text"
          value={teamName}
          name="team-name"
          onChange={(event) => setTeamName(event.target.value)}
          placeholder={currentTeam?.name}
        />
      </div>
      <Button
        action="Save"
        color="accent"
        type="submit"
        disabled={!teamName || teamNames.includes(teamName.toLocaleLowerCase())}
      />
    </form>
  )
}
