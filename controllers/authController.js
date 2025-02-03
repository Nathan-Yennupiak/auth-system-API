import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

// Joi validation schema for registration and login
const userValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username must be a string.',
        'string.min': 'Username must be at least 3 characters long.',
        'string.max': 'Username must be at most 30 characters long.',
        'any.required': 'Username is required.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Please provide a valid email address.',
        'any.required': 'Email is required.',
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': 'Password must be a string.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.max': 'Password must be at most 30 characters long.',
        'any.required': 'Password is required.',
    })
});

// Register a new User
export const register = async (req, res) => {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // Validate the input
    const { error } = userValidationSchema.validate({ username, email, password });
    if (error) {
        return res.status(400).json({
            
            message: error.details.map(detail => detail.message).join(', ')
        });
    }

    try {
        // Check if user already exists in the database
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Create a new User instance
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
