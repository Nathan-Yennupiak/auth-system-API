import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Register a new User
export const register = async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    try {
        // Check if user already exists in the database
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Create a new User instance with the provided username, email, and password
        user = new User({ username, email, password });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the new user to the database
        await user.save();

        // Generate a token with the user id
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });

        // Return a 201 status with a success message and the token
        res.status(201).json({
            message: `User: ${email} >> registered successfully`,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

// Login a User
export const login = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: `User : ${email} >> logged in successfully`,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

// Logout a User
export const logout = (req, res) => {
    res.status(200).json({
        message: `User logged out successfully`,
    });
};