const User = require('../Model/UserModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcrypt');  // Corrected the import

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create new user");
    }
});

// Authenticate a user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error("Enter all fields");
    }

    const user = await User.findOne({ email });

    // Use comparePassword instead of matchPassword
    if (user && (await user.comparePassword(password))) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };
