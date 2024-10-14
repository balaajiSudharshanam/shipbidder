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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
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
    console.log(user);
    // Use comparePassword instead of matchPassword
    if (user && (await user.matchPassword(password))) {
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
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};
        // console.log(req.user);

    const users = await User.find();
    res.send(users);
});

module.exports = { registerUser, authUser,allUsers };
