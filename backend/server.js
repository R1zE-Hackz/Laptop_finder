const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const flipkartScraper = require('./flipkartscraper');

app.get('/api/laptops', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Query parameter "q" is required.' });

    try {
        const results = await flipkartScraper(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch laptops', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


