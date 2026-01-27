"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../config/database");
class UserRepository {
    async findByEmail(email) {
        const result = await database_1.db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }
    async findById(id) {
        const result = await database_1.db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }
    async create(user) {
        const result = await database_1.db.query('INSERT INTO users (first_name, last_name, email, active, role, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [user.first_name, user.last_name, user.email, user.active, user.role, user.balance]);
        return result.rows[0];
    }
    async updateBalance(id, balance) {
        await database_1.db.query('UPDATE users SET balance = $1 WHERE id = $2', [balance, id]);
    }
    async getAll() {
        const result = await database_1.db.query('SELECT * FROM users ORDER BY last_name, first_name');
        return result.rows;
    }
}
exports.UserRepository = UserRepository;
