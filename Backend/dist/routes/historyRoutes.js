"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyController_1 = require("../controllers/historyController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/history', auth_1.authenticateToken, historyController_1.getTransactionHistory);
router.get('/all-history', auth_1.authenticateToken, auth_1.requireAdmin, historyController_1.getAllTransactionHistory);
exports.default = router;
