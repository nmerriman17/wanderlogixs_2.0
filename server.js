const express = require('express');
const cors = require('cors');
const itineraryRoutes = require('./routes/itineraryRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/itinerary', itineraryRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
