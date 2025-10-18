// routes/rootAdminRoutes.js
import express from 'express';
import verifyAdminToken from '../Middlewares/verifyAdminToken.js';
import verifyRootAdmin from '../Middlewares/verifyRootAdmin.js';
import {
  createAdmin,
  getAllAdmins,
  deleteAdmin
} from '../Controllers/adminUserController.js';

const router = express.Router();

// Admin user management routes (root-only)
router.post('/admins/create', verifyAdminToken, verifyRootAdmin, createAdmin);
router.get('/admins', verifyAdminToken, verifyRootAdmin, getAllAdmins);
router.delete('/admins/:id', verifyAdminToken, verifyRootAdmin, deleteAdmin);

export default router;
