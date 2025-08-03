const { GoogleSearch } = require('google-search-results-nodejs');
require('dotenv').config(); // Load .env

const search = new GoogleSearch(process.env.SERPAPI_KEY);

module.exports = function scrapeFlipkart(query) {
    return new Promise((resolve, reject) => {
        search.json(
            {
                q: `site:flipkart.com ${query}`,
                location: 'India',
                hl: 'en',
                gl: 'in'
            },
            (data) => {
                if (!data.organic_results) return reject(new Error('No results found.'));
                const laptops = data.organic_results.map(result => ({
                    title: result.title,
                    link: result.link,
                    price: result.price,
                    source: "Flipkart"
                }));
                resolve(laptops);
            }
        );
    });
};
