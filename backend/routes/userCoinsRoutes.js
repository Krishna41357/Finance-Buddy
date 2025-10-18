import express from "express";
import { addCoins, removeCoins, getCoins } from "../Controllers/userCoinsController.js";

const router = express.Router();

// POST /api/v1/user/coins/:userId/add
router.post("/:userId/add", addCoins);

// POST /api/v1/user/coins/:userId/remove
router.post("/:userId/remove", removeCoins);

// ✅ Get coin balance
router.get("/:userId", getCoins);

export default router;
