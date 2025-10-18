import express from 'express'
import { login, register, googleLogin, googleCallback, updateUserPreferences, logout  } from '../Controllers/authController.js'

const router = express.Router()

// Authentication routes
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout);

// // verify email
// router.get("/verify-email/:token", verifyEmail);

// // send again
// router.post("/resend-verification", resendVerificationEmail); 

// User preferences route
router.post('/preferences', updateUserPreferences)

// Google OAuth routes
router.get('/google', googleLogin)
router.get('/google/callback', googleCallback)

export default router