export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  role: 'LERNENDER' | 'MITARBEITER';
  balance: number;
  created_at: Date;
}

export interface Transaction {
  id: number;
  user_id: number;
  type: 'AUFLADUNG' | 'ABBUCHUNG';
  amount: number;
  created_at: Date;
}
