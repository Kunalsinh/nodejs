const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

// Initialize Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false, // Deprecated in Mongoose 6
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
        console.error(err);
        process.exit(1); // Exit process with failure
    });

// Routes
app.use('/api', itemRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the CRUD API');
});

// Handle undefined Routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
