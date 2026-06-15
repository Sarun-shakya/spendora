import express from 'express';
import { createBook,
        updateBook,
        deleteBook,
        getBooks,
        getBookById
} from '../controllers/book.controller.js';
import { protectRoute } from '../middleware/user.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;