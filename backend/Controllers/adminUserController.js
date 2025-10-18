import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create new admin (only by root admin)
export const createAdmin = async (req, res) => {
  try {
    const { email, password, username, isRoot = false } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    if (!req.admin?.isRoot) {
      return res.status(403).json({ message: 'Only root admins can create new admins.' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      username,
      isRoot
    });

    await newAdmin.save();

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: newAdmin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Admin created successfully.',
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        username: newAdmin.username,
        isRoot: newAdmin.isRoot
      },
      token
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Server error while creating admin.' });
  }
};

// Get all admins (for management panel)
export const getAllAdmins = async (req, res) => {
  try {
    if (!req.admin?.isRoot) {
      return res.status(403).json({ message: 'Only root admins can view all admins.' });
    }

    const admins = await Admin.find().select('-password'); // Exclude password field
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Server error while fetching admins.' });
  }
};

// Delete an admin (only root can delete non-root admins)
export const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    if (!req.admin?.isRoot) {
      return res.status(403).json({ message: 'Only root admins can delete other admins.' });
    }

    const adminToDelete = await Admin.findById(adminId);
    if (!adminToDelete) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    if (adminToDelete.isRoot) {
      return res.status(403).json({ message: 'Cannot delete a root admin.' });
    }

    await Admin.findByIdAndDelete(adminId);
    res.status(200).json({ message: 'Admin deleted successfully.' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Server error while deleting admin.' });
  }
};
