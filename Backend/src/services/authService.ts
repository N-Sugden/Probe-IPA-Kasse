import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';

const userRepository = new UserRepository();

export class AuthService {
  async authenticateWithMicrosoft(profile: any): Promise<string> {
    // Assuming profile has email, firstName, lastName from Microsoft
    let user = await userRepository.findByEmail(profile.emails[0].value);

    if (!user) {
      // Create new user
      user = await userRepository.create({
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        active: true,
        role: 'LERNENDER', // Default role
        balance: 0
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
