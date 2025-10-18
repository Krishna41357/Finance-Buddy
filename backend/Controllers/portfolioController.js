import User from '../models/User.js';
import { calculateProfileCompletion } from '../utils/calculateProfileCompletion.js';


// Get user's portfolio/profile
export const getPortfolio = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, "profile profileCompletion");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      profile: user.profile,
      profileCompletion: user.profileCompletion,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user's portfolio/profile (partial or full)
export const updatePortfolio = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const allowedFields = [
      'ageGroup',
      'experienceLevel',
      'annualIncome',
      'monthlyExpenses',
      'riskTolerance',
      'financialGoals'
    ];

    const filteredUpdate = {};
    for (const field of allowedFields) {
      if (field in updateData) {
        filteredUpdate[field] = updateData[field];
      }
    }

    if (Object.keys(filteredUpdate).length === 0) {
      return res.status(400).json({ message: 'No valid profile fields provided' });
    }

    // Fetch existing user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Merge existing profile with update
    const existingProfile = user.profile?.toJSON() || {};
    const fullProfile = { ...existingProfile, ...filteredUpdate };


    // Validate merged profile manually
    user.profile = fullProfile;
    user.profileCompletion = calculateProfileCompletion(fullProfile);

    // Save user (triggers validation)
    const savedUser = await user.save();

    res.json({
      profile: savedUser.profile,
      profileCompletion: savedUser.profileCompletion
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

