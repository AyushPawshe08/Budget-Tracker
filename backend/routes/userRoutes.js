const express = require('express')
const router = express.Router()
const {generateToken} = require("../utils/generateToken")
const User = require("../models/userModel")
const verifyJWT = require("../middlewares/verifyJWT")

const{
    registerUser,
    loginUser,
    logout,

} = require("../controllers/userController")


router.post('/register', verifyJWT,registerUser , async (req, res) => {
    try {
        const { username, email, password,pic } = req.body;
        const newUser = new User({ username, email, password,pic });

        await newUser.save();
        const token = generateToken(newUser); // Generate token after successful registration

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});


router.post("/login",loginUser )

router.post("/logout" , logout)

module.exports = router