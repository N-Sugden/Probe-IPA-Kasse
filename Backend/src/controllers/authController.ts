import { Request, Response } from 'express';
import passport from 'passport';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const login = passport.authenticate('microsoft', { failureRedirect: '/' });

export const callback = (req: Request, res: Response) => {
  passport.authenticate('microsoft', { failureRedirect: '/' }, async (err: any, user: any, info: any) => {
    if (err) return res.status(500).json({ message: 'Authentication error' });
    if (!user) return res.redirect('/');

    try {
      const token = await authService.authenticateWithMicrosoft(user);
      res.redirect(`http://localhost:3001/login?token=${token}`); // Assuming frontend is on 3001
    } catch (error) {
      res.status(500).json({ message: 'Token generation failed' });
    }
  })(req, res);
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
};
