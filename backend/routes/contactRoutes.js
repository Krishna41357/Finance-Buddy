import express from "express";
const router = express.Router();
import { 
    saveContact,
    getContact,
    getAllContact
} from "../Controllers/contactController.js";
import { verifyToken, verifyAdmin } from "../utils/verifyToken.js";

// Public route
router.post("/saveContact", saveContact);

// Admin protected routes
router.get("/getAllContact", verifyToken, verifyAdmin, getAllContact);
router.get("/getContact/:id", verifyToken, verifyAdmin, getContact);

export default router;
