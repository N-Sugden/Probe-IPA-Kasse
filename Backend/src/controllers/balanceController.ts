import { Request, Response } from 'express';
import { BalanceService } from '../services/balanceService';

const balanceService = new BalanceService();

export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const balance = await balanceService.getBalance(userId);
    res.json({ balance });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deposit = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    await balanceService.deposit(userId, amount);
    res.json({ message: 'Deposit successful' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const withdraw = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    await balanceService.withdraw(userId, amount);
    res.json({ message: 'Withdrawal successful' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBalances = async (req: Request, res: Response) => {
  try {
    const balances = await balanceService.getAllBalances();
    res.json({ balances });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
