import express from "express";
const router = express.Router();
import { getAllFeedback, saveFeedback } from "../Controllers/feedbackController.js";

router.post("/saveFeedback", saveFeedback);
router.get('/getAllfeedback', getAllFeedback);
export default router;