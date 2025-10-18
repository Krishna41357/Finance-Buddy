// Additional imports for Google OAuth
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import crypto from 'crypto'; // For dummy password (Google)

// User Register
export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists!' });
    }

    if (!req.body.password) {
      return res.status(400).json({ success: false, message: 'Password is required!' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      provider: 'local' // ✅ set provider
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: token.expiresIn
    }).status(200).json({
      success: true,
      message: "Registration successful",
      user: {
        userId: newUser._id,
        username: newUser.username
      },
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to register. Try again." });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const identifier = req.body.email;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.provider === 'google') {
      return res.status(400).json({ success: false, message: "Please login with Google." });
    }

    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: "Incorrect email or password!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    const numberOfQuizzesTaken = user.quizzesTaken?.length || 0;
    const numberOfFinancialGoals = user.profile?.financialGoals?.length || 0;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token: token,
        user: {
          userId: user._id,
          username: user.username,
          quizzesTakenCount: numberOfQuizzesTaken,
          financialGoalsCount: numberOfFinancialGoals,
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

// Update User Preferences
export const updateUserPreferences = async (req, res) => {
  try {
    const { userId, preferences } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required!' });
    }

    if (!preferences || !Array.isArray(preferences)) {
      return res.status(400).json({ success: false, message: 'Preferences must be provided as an array!' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        preferences: preferences,
        updatedAt: new Date()
      },
      {
        new: true,
        select: 'username email preferences'
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      user: {
        userId: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        preferences: updatedUser.preferences
      }
    });

  } catch (error) {
    console.log('Error updating preferences:', error);
    res.status(500).json({ success: false, message: "Failed to update preferences. Try again." });
  }
};

// Get all users (admin/test)
export const getAllUsers = async () => {
  return await User.find({});
};

// Setup Google OAuth strategy
export const setupGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/v1/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            const dummyPassword = crypto.randomBytes(20).toString('hex');
            const hashedPassword = await bcrypt.hash(dummyPassword, 10);

            user = await User.create({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
              password: hashedPassword,
              provider: 'google' // ✅ set provider for Google
            });
          }

          return done(null, user);
        } catch (err) {
          console.error('Error in Google strategy:', err);
          return done(err, null);
        }
      }
    )
  );
};

// Google login route 
export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google OAuth callback handler
// Google OAuth callback handler
export const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.redirect('http://localhost:5173/auth/login?error=google_auth_failed');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    // Detect if preferences exist
    const hasPreferences = Array.isArray(user.preferences) && user.preferences.length > 0;

    const redirectPath = hasPreferences ? '/dashboard' : '/preferences';

    res.redirect(`http://localhost:5173${redirectPath}?token=${token}&username=${encodeURIComponent(user.username)}&userId=${user._id}`);
  })(req, res, next);
};


// User Logout
export const logout = (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to logout. Try again.',
    });
  }
};
