"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.callback = exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const authService_1 = require("../services/authService");
const authService = new authService_1.AuthService();
exports.login = passport_1.default.authenticate('microsoft', { failureRedirect: '/' });
const callback = (req, res) => {
    passport_1.default.authenticate('microsoft', { failureRedirect: '/' }, async (err, user, info) => {
        if (err)
            return res.status(500).json({ message: 'Authentication error' });
        if (!user)
            return res.redirect('/');
        try {
            const token = await authService.authenticateWithMicrosoft(user);
            res.redirect(`http://localhost:3001/login?token=${token}`); // Assuming frontend is on 3001
        }
        catch (error) {
            res.status(500).json({ message: 'Token generation failed' });
        }
    })(req, res);
};
exports.callback = callback;
const logout = (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out' });
    });
};
exports.logout = logout;
