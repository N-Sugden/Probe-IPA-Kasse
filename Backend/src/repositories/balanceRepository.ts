import { db } from '../config/database';
import { Transaction } from '../models/user';

export class BalanceRepository {
  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> {
    const result = await db.query(
      'INSERT INTO transactions (user_id, type, amount) VALUES ($1, $2, $3) RETURNING *',
      [transaction.user_id, transaction.type, transaction.amount]
    );
    return result.rows[0];
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    const result = await db.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    const result = await db.query('SELECT * FROM transactions ORDER BY created_at DESC');
    return result.rows;
  }
}
