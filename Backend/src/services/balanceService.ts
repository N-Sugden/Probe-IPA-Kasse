import { UserRepository } from '../repositories/userRepository';
import { BalanceRepository } from '../repositories/balanceRepository';
import { User } from '../models/user';

const userRepository = new UserRepository();
const balanceRepository = new BalanceRepository();

export class BalanceService {
  async getBalance(userId: number): Promise<number> {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return user.balance;
  }

  async deposit(userId: number, amount: number): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');

    const newBalance = user.balance + amount;
    await userRepository.updateBalance(userId, newBalance);
    await balanceRepository.createTransaction({ user_id: userId, type: 'AUFLADUNG', amount });
  }

  async withdraw(userId: number, amount: number): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Insufficient balance');

    const newBalance = user.balance - amount;
    await userRepository.updateBalance(userId, newBalance);
    await balanceRepository.createTransaction({ user_id: userId, type: 'ABBUCHUNG', amount });
  }

  async getAllBalances(): Promise<User[]> {
    return await userRepository.getAll();
  }

  async getTransactionHistory(userId: number): Promise<any[]> {
    return await balanceRepository.getTransactionsByUserId(userId);
  }

  async getAllTransactionHistory(): Promise<any[]> {
    return await balanceRepository.getAllTransactions();
  }
}
