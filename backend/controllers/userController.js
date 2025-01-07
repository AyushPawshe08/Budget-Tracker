const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, username, pic } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(401).send("You already have an account");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    // Save user with profile picture URL from Cloudinary
                    let newUser = await userModel.create({
                        email,
                        password: hash,
                        username,
                        pic, // Store the Cloudinary image URL in the 'pic' field
                    });

                    // Generate token after successful registration
                    let token = generateToken(newUser);
                    res.cookie("token", token);

                    res.send("User created");
                }
            });
        });
    } catch (err) {
        res.send(err.message);
    }
};

module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body;

    try {
        // Fetch the user from the database
        const user = await userModel.findOne({ email: email });

        if (!user) {
            // Respond with a generic message to avoid revealing user existence
            return res.status(401).json({ message: "Email or password is incorrect" });
        }

        // Simultaneously check the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Password matches, generate a token
            const token = generateToken(user);
            res.cookie("token", token);
            return res.status(200).json({ message: "Login successful" });
        } else {
            // Password doesn't match
            return res.status(401).json({ message: "Email or password is incorrect" });
        }
    } catch (error) {
        // Handle errors (e.g., database or bcrypt errors)
        return res.status(500).json({ message: "An unexpected error occurred." });
    }
};

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
};
