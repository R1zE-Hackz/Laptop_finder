const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Laptop Finder API is running' });
});

const flipkartScraper = require('./flipkartscraper');

app.get('/api/laptops', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ 
            error: 'Query parameter "q" is required.',
            example: '/api/laptops?q=HP 16GB 512GB gaming'
        });
    }

    try {
        const results = await flipkartScraper(query);
        res.json({
            success: true,
            query: query,
            results: results,
            count: results.length
        });
    } catch (err) {
        console.error('Error fetching laptops:', err);
        res.status(500).json({ 
            error: 'Failed to fetch laptops', 
            details: err.message,
            query: query
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: 'Something went wrong on the server'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /health',
            'GET /api/laptops?q=<search_query>'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔍 API endpoint: http://localhost:${PORT}/api/laptops?q=<query>`);
});


