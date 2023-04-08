import { TrainerWithTeams } from '@/types/models'
import { axiosClient } from './apiClient'

/**
 * Fetches trainers from db
 * @returns
 */
export const loadTrainers = async () => {
  return await axiosClient.get<TrainerWithTeams[]>(`${process.env.SERVER_HOST}/api/trainer/list`)
}
