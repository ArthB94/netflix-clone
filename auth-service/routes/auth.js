import { Router } from "express";
import { register, login, getMyInfo } from "../controllers/auth.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateToken, getMyInfo);

export default router;