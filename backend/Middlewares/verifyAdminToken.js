// middleware/verifyAdminToken.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied: No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(403).json({ message: "Admin not found." });

    req.admin = {
      id: admin._id,
      email: admin.email,
      isRoot: admin.isRoot
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ message: "Invalid or expired admin token." });
  }
};

export default verifyAdminToken;
