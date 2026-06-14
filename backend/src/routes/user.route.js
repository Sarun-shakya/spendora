import express from 'express';
import { register,
    login,
    logout,
    profile,
    updateProfile
} from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { protectRoute } from '../middleware/user.middleware.js';

const router = express.Router();

router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, profile);
router.put("/update-profile", protectRoute, upload.single("profile"), updateProfile);

export default router;