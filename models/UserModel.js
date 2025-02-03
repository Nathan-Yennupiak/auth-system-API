import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create indexes
userSchema.index({ username: 1, email:1 }, { unique: true });

// Create the User model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;