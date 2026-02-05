import express from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';

const router = express.Router();
const userRepo = new UserRepository();

// Dev-only: issue a JWT for a given user id (for local development)
router.post('/token', async (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(404).end();

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId required' });

  const user = await userRepo.findById(Number(userId));
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '12h' });
  res.json({ token });
});

// Dev-only: get all users grouped by role
router.get('/users', async (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(404).end();
  const users = await userRepo.getAll();
  const mitarbeiter = users.filter(u => u.role === 'MITARBEITER');
  const lernende = users.filter(u => u.role === 'LERNENDER');
  res.json({ mitarbeiter, lernende });
});

export default router;
