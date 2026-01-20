import { Request, Response } from 'express';
import { BalanceService } from '../services/balanceService';

const balanceService = new BalanceService();

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const history = await balanceService.getTransactionHistory(userId);
    res.json({ history });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactionHistory = async (req: Request, res: Response) => {
  try {
    const history = await balanceService.getAllTransactionHistory();
    res.json({ history });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
