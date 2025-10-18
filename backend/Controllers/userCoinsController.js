import User from "../models/User.js";

// ✅ Add coins to user
export const addCoins = async (req, res) => {
  try {
    const { userId } = req.params;
    const { coins } = req.body;

    if (typeof coins !== 'number' || coins <= 0) {
      return res.status(400).json({ message: "Coins must be a positive number." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalCoins: coins } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({
      message: `${coins} coins added.`,
      totalCoins: user.totalCoins
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove coins from user
export const removeCoins = async (req, res) => {
  try {
    const { userId } = req.params;
    const { coins } = req.body;

    if (typeof coins !== 'number' || coins <= 0) {
      return res.status(400).json({ message: "Coins must be a positive number." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.totalCoins < coins) {
      return res.status(400).json({ message: "Insufficient coins." });
    }

    user.totalCoins -= coins;
    await user.save();

    res.status(200).json({
      message: `${coins} coins removed.`,
      totalCoins: user.totalCoins
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get current coin balance of a user
export const getCoins = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("totalCoins");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      userId: user._id,
      totalCoins: user.totalCoins
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
