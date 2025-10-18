import express from 'express';
import { getPortfolio, updatePortfolio } from '../Controllers/portfolioController.js';
// import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router();

// Get portfolio
router.get('/portfolio/:id', getPortfolio);

// Update portfolio
router.patch('/portfolio/:id', updatePortfolio);

export default router;
