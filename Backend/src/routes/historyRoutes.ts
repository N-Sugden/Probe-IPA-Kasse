import express from 'express';
import { getTransactionHistory, getAllTransactionHistory } from '../controllers/historyController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/history', authenticateToken, getTransactionHistory);
router.get('/all-history', authenticateToken, requireAdmin, getAllTransactionHistory);

export default router;
