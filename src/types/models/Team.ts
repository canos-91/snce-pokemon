export interface Team {
  readonly id?: number
  trainerId: number
  name: string
  // readonly createdAt?: Date
  // readonly updatedAt?: Date
}

export interface TeamCreateData {
  trainerId: number
  name: string
}
