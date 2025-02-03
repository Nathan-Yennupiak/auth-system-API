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

// import mongoose from "mongoose";

// // Define the User schema
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Email validation regex
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: [8, 'Password must be at least 8 characters long'], // Minimum length validation
//         validate: {
//             validator: function(value) {
//                 // Password policy validation: at least one uppercase letter, one number, and one special character
//                 const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//                 return passwordRegex.test(value);
//             },
//             message: 'Password must contain at least one uppercase letter, one number, and one special character.',
//         },
//     },
// });


// // Create indexes
// userSchema.index({ username: 1, email: 1 }, { unique: true });


// // Create the User model
// const UserModel = mongoose.model('User', userSchema);

// // Optional: Pre-save hook for password validation (just in case)
// userSchema.pre('save', function(next) {
//     if (this.isModified('password')) {
//         const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//         if (!passwordRegex.test(this.password)) {
//             return next(new Error('Password must contain at least one uppercase letter, one number, and one special character.'));
//         }
//     }
//     next();
// });

// export default UserModel;
