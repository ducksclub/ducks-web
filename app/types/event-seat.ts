export type MySeatStatus = 'WAITING' | 'HIDDEN_UNTIL_15_MIN' | 'SEAT_ASSIGNED'

export type WaitingSeatResponse = {
  status: 'WAITING'
  message: string
  waitingPosition: number
}

export type HiddenSeatResponse = {
  status: 'HIDDEN_UNTIL_15_MIN'
  message: string
  availableAt: string
}

export type AssignedSeatResponse = {
  status: 'SEAT_ASSIGNED'
  message: string
  seatNumber: number
  tableNumber: number
}

export type MySeatResponse = WaitingSeatResponse | HiddenSeatResponse | AssignedSeatResponse
