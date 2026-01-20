import express from 'express';
import { getBalance, deposit, withdraw, getAllBalances } from '../controllers/balanceController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/balance', authenticateToken, getBalance);
router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);
router.get('/all-balances', authenticateToken, requireAdmin, getAllBalances);

export default router;
