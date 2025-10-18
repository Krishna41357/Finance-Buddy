// routes/adminAuthRoutes.js
import express from 'express';
import { adminLogin } from '../Controllers/adminAuthController.js';

const router = express.Router();

router.post('/login', adminLogin); // POST /api/v1/auth/admin/login

export default router;
