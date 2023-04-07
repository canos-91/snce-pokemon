/* eslint-disable react-hooks/exhaustive-deps */
import styles from './TeamEditForm.module.scss'
import { useUser } from '@/context/UserContext'
import { useState, useMemo, FormEvent } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Button, Input } from '@/components/atoms'
import { TeamWithRelations, TrainerWithTeams } from '@/types/models'
import { useRouter } from 'next/router'

export default function TeamEditForm() {
  const router = useRouter()
  const [teamName, setTeamName] = useState<string>('')
  const { trainer, trainers, setCurrentTeam, currentTeam, setCurrentTrainer, setCurrentTrainersList } = useUser()

  const teamNames: string[] = useMemo(() => trainer?.teams?.map((t) => t.name.toLowerCase()) || [], [trainer?.teams])

  /**
   * Edits current team info
   */

  const updateTeam = async (event: FormEvent) => {
    event.preventDefault()

    const updated: TeamWithRelations | undefined = await axiosClient.put(`/api/team/upsert`, {
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

  /**
   * Deletes team
   */
  const deleteTeam = async (event: FormEvent) => {
    event.preventDefault()

    if (currentTeam && trainer) {
      const deleted: boolean = await axiosClient.delete(`/api/team/${currentTeam.id}`)

      if (deleted === true) {
        const { teams, ...rest } = trainer
        const filteredTeams = teams?.filter((t) => t.id !== currentTeam.id)
        setCurrentTrainer({ ...rest, teams: filteredTeams })
        setCurrentTeam(null)
        router.push('/home')
      }
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
      <div className={styles.actions}>
        <Button
          action="Save"
          color="accent"
          type="submit"
          disabled={!teamName || teamNames.includes(teamName.toLocaleLowerCase())}
        />
        <Button action="Delete" color="error" onClick={(event: FormEvent) => deleteTeam(event)} />
      </div>
    </form>
  )
}
