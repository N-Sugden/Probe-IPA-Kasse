"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balanceController_1 = require("../controllers/balanceController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/balance', auth_1.authenticateToken, balanceController_1.getBalance);
router.post('/deposit', auth_1.authenticateToken, balanceController_1.deposit);
router.post('/withdraw', auth_1.authenticateToken, balanceController_1.withdraw);
router.get('/all-balances', auth_1.authenticateToken, auth_1.requireAdmin, balanceController_1.getAllBalances);
exports.default = router;
