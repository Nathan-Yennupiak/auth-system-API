import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import 'dotenv/config';


//Initialize express
const app = express();
//  Set up the PORT
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
// Enable CORS
app.use(cors());
// Parse incoming requests with JSON payloads
app.use(express.json());

//Connect to Database
connectToDatabase();

// Define routes
app.use('/api/auth', authRoutes);

//Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT} listening for requests`);
})