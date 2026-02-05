export type Role = 'MITARBEITER' | 'LERNENDER'
export type View = 'AUFLADUNG' | 'ABBUCHUNG' | 'GUTHABEN' | 'GESAMTUEBERSICHT' | 'VERLAUFE'

export interface User {
  id: number
  first_name: string
  last_name: string
  role: Role
  balance: number
}

export interface Transaction {
  id: number
  user_id: number
  type: string
  amount: number
  created_at: string
}

export interface Message {
  type: 'info' | 'error'
  text: string
}
