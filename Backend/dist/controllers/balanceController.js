"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBalances = exports.withdraw = exports.deposit = exports.getBalance = void 0;
const balanceService_1 = require("../services/balanceService");
const balanceService = new balanceService_1.BalanceService();
const getBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        const balance = await balanceService.getBalance(userId);
        res.json({ balance });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBalance = getBalance;
const deposit = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;
        if (!amount || amount <= 0)
            return res.status(400).json({ message: 'Invalid amount' });
        await balanceService.deposit(userId, amount);
        res.json({ message: 'Deposit successful' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deposit = deposit;
const withdraw = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;
        if (!amount || amount <= 0)
            return res.status(400).json({ message: 'Invalid amount' });
        await balanceService.withdraw(userId, amount);
        res.json({ message: 'Withdrawal successful' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.withdraw = withdraw;
const getAllBalances = async (req, res) => {
    try {
        const balances = await balanceService.getAllBalances();
        res.json({ balances });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllBalances = getAllBalances;
