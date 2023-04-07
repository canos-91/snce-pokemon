import { TrainerWithTeams } from '@/types/models'
import { axiosClient } from './apiClient'

/**
 * Fetches trainers from db
 * @returns
 */
export const loadTrainers = async (): Promise<TrainerWithTeams[] | undefined> => {
  return await axiosClient.get(`${process.env.SERVER_HOST}/api/trainer/list`)
}
