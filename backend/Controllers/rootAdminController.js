import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

// Create a new admin (only root can do this)
export const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existing = await Admin.findOne({ email });
        if (existing) return res.status(400).json({ message: "Admin already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            isRoot: false
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully." });
    } catch (err) {
        console.error("Root admin creation error:", err);
        res.status(500).json({ message: "Failed to create admin." });
    }
};

// Delete an admin (only root can)
export const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ message: "Admin not found." });
        if (admin.isRoot) return res.status(403).json({ message: "Cannot delete root admin." });

        await Admin.findByIdAndDelete(adminId);
        res.status(200).json({ message: "Admin deleted successfully." });
    } catch (err) {
        console.error("Delete admin error:", err);
        res.status(500).json({ message: "Failed to delete admin." });
    }
};
