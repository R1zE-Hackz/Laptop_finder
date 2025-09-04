const { GoogleSearch } = require('google-search-results-nodejs');
require('dotenv').config(); // Load .env

// Check if API key is available
const hasApiKey = process.env.SERPAPI_KEY && process.env.SERPAPI_KEY.trim() !== '';

let search = null;
if (hasApiKey) {
    search = new GoogleSearch(process.env.SERPAPI_KEY);
}

module.exports = function scrapeFlipkart(query) {
    return new Promise((resolve, reject) => {
        // Validate query
        if (!query || typeof query !== 'string') {
            return reject(new Error('Invalid query parameter'));
        }

        // Clean and format query
        const cleanQuery = query.trim().replace(/\s+/g, ' ');
        
        // If no API key, return demo data
        if (!hasApiKey) {
            console.log('⚠️  No SERPAPI_KEY found, returning demo data');
            const demoData = generateDemoData(cleanQuery);
            setTimeout(() => resolve(demoData), 1000); // Simulate API delay
            return;
        }

        search.json(
            {
                q: `site:flipkart.com ${cleanQuery}`,
                location: 'India',
                hl: 'en',
                gl: 'in',
                num: 10 // Limit results to 10
            },
            (data) => {
                try {
                    if (!data || !data.organic_results) {
                        return reject(new Error('No search results found'));
                    }

                    const laptops = data.organic_results
                        .filter(result => result.title && result.link) // Filter out incomplete results
                        .map((result, index) => ({
                            id: index + 1,
                            title: result.title || 'No title available',
                            link: result.link || '#',
                            snippet: result.snippet || 'No description available',
                            source: "Flipkart",
                            position: result.position || index + 1
                        }));

                    if (laptops.length === 0) {
                        return reject(new Error('No valid laptop results found'));
                    }

                    resolve(laptops);
                } catch (error) {
                    reject(new Error(`Failed to process search results: ${error.message}`));
                }
            }
        );
    });
};

// Function to generate demo data
function generateDemoData(query) {
    const queryLower = query.toLowerCase();
    const demoData = [
        {
            id: 1,
            title: "HP Pavilion Gaming Laptop - 15.6 inch FHD, Intel Core i5, 8GB RAM, 512GB SSD",
            link: "https://www.flipkart.com",
            snippet: "Gaming laptop with excellent performance for gaming and work. Features a powerful Intel Core i5 processor and dedicated graphics.",
            source: "Flipkart",
            position: 1
        },
        {
            id: 2,
            title: "Dell Inspiron 15 3000 - 15.6 inch HD, Intel Core i3, 8GB RAM, 1TB HDD",
            link: "https://www.flipkart.com",
            snippet: "Affordable laptop perfect for students and basic computing needs. Reliable performance for everyday tasks.",
            source: "Flipkart",
            position: 2
        },
        {
            id: 3,
            title: "Lenovo IdeaPad 3 - 14 inch FHD, AMD Ryzen 5, 16GB RAM, 512GB SSD",
            link: "https://www.flipkart.com",
            snippet: "Powerful laptop with great battery life for work and entertainment. AMD Ryzen 5 processor for smooth performance.",
            source: "Flipkart",
            position: 3
        },
        {
            id: 4,
            title: "Asus VivoBook 15 - 15.6 inch FHD, Intel Core i7, 16GB RAM, 1TB SSD",
            link: "https://www.flipkart.com",
            snippet: "High-performance laptop for professionals and power users. Intel Core i7 processor with fast SSD storage.",
            source: "Flipkart",
            position: 4
        }
    ];

    // Filter demo data based on query if possible
    if (queryLower.includes('gaming')) {
        return demoData.filter(item => item.title.toLowerCase().includes('gaming'));
    } else if (queryLower.includes('hp')) {
        return demoData.filter(item => item.title.toLowerCase().includes('hp'));
    } else if (queryLower.includes('dell')) {
        return demoData.filter(item => item.title.toLowerCase().includes('dell'));
    } else if (queryLower.includes('lenovo')) {
        return demoData.filter(item => item.title.toLowerCase().includes('lenovo'));
    } else if (queryLower.includes('asus')) {
        return demoData.filter(item => item.title.toLowerCase().includes('asus'));
    }

    return demoData;
}
