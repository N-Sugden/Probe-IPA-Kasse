"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTransactionHistory = exports.getTransactionHistory = void 0;
const balanceService_1 = require("../services/balanceService");
const balanceService = new balanceService_1.BalanceService();
const getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await balanceService.getTransactionHistory(userId);
        res.json({ history });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTransactionHistory = getTransactionHistory;
const getAllTransactionHistory = async (req, res) => {
    try {
        const history = await balanceService.getAllTransactionHistory();
        res.json({ history });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllTransactionHistory = getAllTransactionHistory;
