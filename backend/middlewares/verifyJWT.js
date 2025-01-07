const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
    try {
        // Check for token in cookies
        if (!req.cookies.token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // Find user based on decoded email
        const user = await userModel
            .findOne({ email: decoded.email })
            .select("-password"); // Exclude password from the retrieved data

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach user data to the request
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT verification error:", err.message);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};