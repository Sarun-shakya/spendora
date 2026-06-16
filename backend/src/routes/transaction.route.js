import express from 'express';
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from '../controllers/transaction.controller.js';
import { protectRoute } from '../middleware/user.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();
router.use(protectRoute);

router.post("/", upload.single("receipt"), createTransaction);
router.get("/", getTransactions);
router.get("/:id", getTransactionById);
router.put("/:id",upload.single("receipt"), updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;