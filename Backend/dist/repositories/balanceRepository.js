"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceRepository = void 0;
const database_1 = require("../config/database");
class BalanceRepository {
    async createTransaction(transaction) {
        const result = await database_1.db.query('INSERT INTO transactions (user_id, type, amount) VALUES ($1, $2, $3) RETURNING *', [transaction.user_id, transaction.type, transaction.amount]);
        return result.rows[0];
    }
    async getTransactionsByUserId(userId) {
        const result = await database_1.db.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return result.rows;
    }
    async getAllTransactions() {
        const result = await database_1.db.query('SELECT * FROM transactions ORDER BY created_at DESC');
        return result.rows;
    }
}
exports.BalanceRepository = BalanceRepository;
