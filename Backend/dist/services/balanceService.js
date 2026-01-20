"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const balanceRepository_1 = require("../repositories/balanceRepository");
const userRepository = new userRepository_1.UserRepository();
const balanceRepository = new balanceRepository_1.BalanceRepository();
class BalanceService {
    async getBalance(userId) {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        return user.balance;
    }
    async deposit(userId, amount) {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        const newBalance = user.balance + amount;
        await userRepository.updateBalance(userId, newBalance);
        await balanceRepository.createTransaction({ user_id: userId, type: 'AUFLADUNG', amount });
    }
    async withdraw(userId, amount) {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new Error('User not found');
        if (user.balance < amount)
            throw new Error('Insufficient balance');
        const newBalance = user.balance - amount;
        await userRepository.updateBalance(userId, newBalance);
        await balanceRepository.createTransaction({ user_id: userId, type: 'ABBUCHUNG', amount });
    }
    async getAllBalances() {
        return await userRepository.getAll();
    }
    async getTransactionHistory(userId) {
        return await balanceRepository.getTransactionsByUserId(userId);
    }
    async getAllTransactionHistory() {
        return await balanceRepository.getAllTransactions();
    }
}
exports.BalanceService = BalanceService;
