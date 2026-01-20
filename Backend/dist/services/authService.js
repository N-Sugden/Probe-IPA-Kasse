"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const userRepository = new userRepository_1.UserRepository();
class AuthService {
    async authenticateWithMicrosoft(profile) {
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
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
}
exports.AuthService = AuthService;
