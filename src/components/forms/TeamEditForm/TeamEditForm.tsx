import styles from './TeamEditForm.module.scss'
import { useUser } from '@/context/UserContext'
import { useState, useMemo, FormEvent } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Button, Input } from '@/components/atoms'
import type { TeamWithRelations, TrainerWithTeams } from '@/types/models'

const TeamEditForm = () => {
  const [teamName, setTeamName] = useState<string>('')
  const { trainer, trainers, setCurrentTeam, currentTeam, setCurrentTrainersList } = useUser()

  const teamNames: string[] = useMemo(() => trainer?.teams?.map((t) => t.name.toLowerCase()) || [], [trainer?.teams])

  /**
   * Update team name
   */
  const updateTeam = async (event: FormEvent) => {
    event.preventDefault()

    const updated: TeamWithRelations | undefined = await axiosClient.put(`/api/team/update`, {
      name: teamName,
      id: currentTeam?.id,
      trainerId: trainer?.id,
    })

    if (updated) {
      setCurrentTrainersList([...trainers.filter((t) => t.id !== trainer?.id), updated.trainer as TrainerWithTeams])
      setTeamName('')
      setCurrentTeam(updated)
    }
  }

  return (
    <form onSubmit={updateTeam} className={styles['team-edit-form']}>
      <div className={styles.title}>
        <h4>Edit team info</h4>
      </div>

      {/* Team name  */}
      <div className={styles.field}>
        <label htmlFor="team-name">Team name</label>
        <div>
          <Input
            id="team-name"
            type="text"
            value={teamName}
            name="team-name"
            onChange={(event) => setTeamName(event.target.value)}
            placeholder={currentTeam?.name}
          />
          {/* Update */}
          <Button
            action="Update"
            color="accent"
            type="submit"
            disabled={!teamName || teamNames.includes(teamName.toLocaleLowerCase())}
          />
        </div>
      </div>
    </form>
  )
}

export default TeamEditForm
