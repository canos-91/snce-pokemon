import styles from './NewTeamForm.module.scss'
import { useUser } from '@/context/UserContext'
import { useState, useMemo, FormEvent } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Button, Input } from '@/components/atoms'
import type { TeamWithRelations } from '@/types/models'
import { TeamCreateData } from '@/services/teamService'
import { useTeam } from '@/context/TeamContext'

interface NewTeamFormProps {
  setCreated: (value: boolean) => void
}

const NewTeamForm = ({ setCreated }: NewTeamFormProps) => {
  const [teamName, setTeamName] = useState<string>('')
  const { trainer, setCurrentTrainer } = useUser()
  const { setTeam } = useTeam()

  const teamNames: string[] = useMemo(() => trainer?.teams?.map((t) => t.name.toLowerCase()) || [], [trainer?.teams])

  /**
   * Creates a new Team for current trainer
   */
  const createTeam = async (event: FormEvent) => {
    event.preventDefault()

    const createdTeam =
      trainer &&
      (await axiosClient.post<TeamCreateData, TeamWithRelations>(`/api/team/create`, {
        name: teamName,
        trainerId: trainer?.id,
      }))

    if (createdTeam) {
      setTeam(createdTeam)
      setCurrentTrainer({ ...trainer, teams: [...trainer.teams, createdTeam] })
      setCreated(true)
    }
  }

  return (
    <form onSubmit={createTeam} className={styles['new-team-form']}>
      <div>
        <h1>Create new team</h1>
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

export default NewTeamForm
