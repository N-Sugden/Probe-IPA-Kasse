"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const router = express_1.default.Router();
const userRepo = new userRepository_1.UserRepository();
// Dev-only: issue a JWT for a given user id (for local development)
router.post('/token', async (req, res) => {
    if (process.env.NODE_ENV === 'production')
        return res.status(404).end();
    const { userId } = req.body;
    if (!userId)
        return res.status(400).json({ message: 'userId required' });
    const user = await userRepo.findById(Number(userId));
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '12h' });
    res.json({ token });
});
exports.default = router;
