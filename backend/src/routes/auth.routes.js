import express from 'express';
import {
  login,
  signup,
  getOtp,
  verifyOtp,
  checkAuth
} from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/getOtp', getOtp);
router.post('/verifyOtp', verifyOtp);
router.get('/checkAuth', protectRoute, checkAuth);

export default router;
