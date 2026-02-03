"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_microsoft_1 = require("passport-microsoft");
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const balanceRoutes_1 = __importDefault(require("./routes/balanceRoutes"));
const historyRoutes_1 = __importDefault(require("./routes/historyRoutes"));
const devRoutes_1 = __importDefault(require("./routes/devRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
// Passport Microsoft Strategy
passport_1.default.use(new passport_microsoft_1.Strategy({
    clientID: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/callback',
    scope: ['openid', 'profile', 'email'],
    tenant: process.env.AZURE_TENANT_ID
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/api/balance', balanceRoutes_1.default);
app.use('/api/history', historyRoutes_1.default);
if (process.env.NODE_ENV !== 'production') {
    app.use('/dev', devRoutes_1.default);
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
