import { db } from '../config/database';
import { User } from '../models/user';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const result = await db.query(
      'INSERT INTO users (first_name, last_name, email, active, role, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user.first_name, user.last_name, user.email, user.active, user.role, user.balance]
    );
    return result.rows[0];
  }

  async updateBalance(id: number, balance: number): Promise<void> {
    await db.query('UPDATE users SET balance = $1 WHERE id = $2', [balance, id]);
  }

  async getAll(): Promise<User[]> {
    const result = await db.query('SELECT * FROM users ORDER BY last_name, first_name');
    return result.rows;
  }
}
