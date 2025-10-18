export default function verifyRootAdmin(req, res, next) {
    if (req.admin?.isRoot) {
        return next();
    }
    return res.status(403).json({ message: "Only root admin can access this route." });
}
