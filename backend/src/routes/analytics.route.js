import express from 'express';
import {
    getBookSummary,
    getDashboardStats,
    getMonthlyReport,
} from '../controllers/analytics.controller.js';
import { protectRoute } from '../middleware/user.middleware.js';

const router = express.Router();
router.use(protectRoute);

router.get("/dashboard", getDashboardStats);
router.get("/monthly-report", getMonthlyReport);
router.get("/book-summary/:id", getBookSummary);

export default router;