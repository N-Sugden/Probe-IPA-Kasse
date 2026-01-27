import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import balanceRoutes from './routes/balanceRoutes';
import historyRoutes from './routes/historyRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Passport Microsoft Strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.AZURE_CLIENT_ID!,
  clientSecret: process.env.AZURE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3000/auth/callback',
  scope: ['openid', 'profile', 'email'],
  tenant: process.env.AZURE_TENANT_ID!
}, (accessToken: any, refreshToken: any, profile: any, done: any) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/history', historyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
