export type CreateBroadcastPayload = {
  message: string
}

export type CreateBroadcastResponse = {
  message: string
  data: {
    totalUsers: number
    createdCount: number
    skippedCount: number
  }
}
