// Import mongoose for MongoDB interaction
import mongoose from 'mongoose';
// Import dotenv to load environment variables from .env file
import 'dotenv/config';

// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGODB_URI);
        // Log success message if connection is successful
        console.log(`MongoDB connected successfully`);
    } catch (error) {
        // Log error message if connection fails
        console.log(`Error: ${error.message}`);
    }
}

// Export the connectToDatabase function for use in other parts of the application
export default connectToDatabase;
