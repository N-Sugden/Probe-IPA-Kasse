// This file can be used for balance-related types if needed
export interface BalanceUpdate {
  user_id: number;
  amount: number;
  type: 'AUFLADUNG' | 'ABBUCHUNG';
}