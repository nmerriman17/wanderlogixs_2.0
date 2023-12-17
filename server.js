const express = require('express');
const cors = require('cors');
const itineraryRoutes = require('./routes/itineraryRoutes');
const searchRoutes = require('./routes/searchRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Using Itinerary and Search Routes
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Database connection test
const { pool } = require('./config/db');
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected:', res.rows[0].now);
    }
});
