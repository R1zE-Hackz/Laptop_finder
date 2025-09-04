document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.querySelector(".results");

    // Function to get API base URL
    function getApiBaseUrl() {
        // Check if we're on GitHub Pages or local development
        if (window.location.hostname === 'r1ze-hackz.github.io') {
            // For GitHub Pages, we'll need to use a deployed backend or show demo data
            return null; // Will trigger demo mode
        } else {
            // Local development
            return 'http://localhost:5000';
        }
    }

    // Function to show demo results
    function showDemoResults() {
        const demoData = [
            {
                id: 1,
                title: "HP Pavilion Gaming Laptop - 15.6 inch FHD, Intel Core i5, 8GB RAM, 512GB SSD",
                link: "https://www.flipkart.com",
                snippet: "Gaming laptop with excellent performance for gaming and work",
                source: "Flipkart"
            },
            {
                id: 2,
                title: "Dell Inspiron 15 3000 - 15.6 inch HD, Intel Core i3, 8GB RAM, 1TB HDD",
                link: "https://www.flipkart.com",
                snippet: "Affordable laptop perfect for students and basic computing needs",
                source: "Flipkart"
            },
            {
                id: 3,
                title: "Lenovo IdeaPad 3 - 14 inch FHD, AMD Ryzen 5, 16GB RAM, 512GB SSD",
                link: "https://www.flipkart.com",
                snippet: "Powerful laptop with great battery life for work and entertainment",
                source: "Flipkart"
            }
        ];

        displayResults(demoData, true);
    }

    // Function to display results
    function displayResults(laptops, isDemo = false) {
        resultsContainer.innerHTML = ""; // Clear previous results

        if (isDemo) {
            const demoHeader = document.createElement("div");
            demoHeader.innerHTML = "<p style='color: #00ffff; margin-bottom: 20px;'>🎮 Demo Mode - Showing sample results</p>";
            resultsContainer.appendChild(demoHeader);
        }

        if (!laptops || laptops.length === 0) {
            resultsContainer.innerHTML = "<p style='color: #ff6b6b;'>No results found. Try adjusting your search criteria.</p>";
            return;
        }

        laptops.forEach(laptop => {
            const card = document.createElement("div");
            card.classList.add("result-card");

            const title = document.createElement("div");
            title.classList.add("result-title");
            title.textContent = laptop.title || "No title available";

            const snippet = document.createElement("div");
            snippet.classList.add("result-snippet");
            snippet.textContent = laptop.snippet || "No description available";

            const linkContainer = document.createElement("div");
            linkContainer.classList.add("result-link");

            const link = document.createElement("a");
            link.href = laptop.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View on Flipkart";
            link.classList.add("flipkart-button");

            linkContainer.appendChild(link);
            card.appendChild(title);
            card.appendChild(snippet);
            card.appendChild(linkContainer);

            resultsContainer.appendChild(card);
        });
    }

    searchBtn.addEventListener("click", async () => {
        const brand = document.getElementById("brand").value;
        const ram = document.getElementById("ram").value;
        const storage = document.getElementById("storage").value;
        const usecase = document.getElementById("usecase").value;
        const battery = document.getElementById("battery").value;
        const minPrice = document.getElementById("minPrice").value;
        const maxPrice = document.getElementById("maxPrice").value;

        // Build query from selected criteria
        const criteria = [brand, ram, storage, usecase, battery];
        if (minPrice) criteria.push(`min price ${minPrice}`);
        if (maxPrice) criteria.push(`max price ${maxPrice}`);
        
        const query = criteria.filter(c => c).join(" ");

        if (!query.trim()) {
            resultsContainer.innerHTML = "<p style='color: #ff6b6b;'>Please select at least one search criteria.</p>";
            return;
        }

        resultsContainer.innerHTML = "<p style='color: #00ffff;'>🔍 Searching for laptops...</p>";

        const apiBaseUrl = getApiBaseUrl();

        if (!apiBaseUrl) {
            // Demo mode for GitHub Pages
            setTimeout(() => {
                showDemoResults();
            }, 1500);
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/api/laptops?q=${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            displayResults(data.results || data);

        } catch (err) {
            console.error("Fetch error:", err);
            resultsContainer.innerHTML = `
                <p style='color: #ff6b6b;'>Error: ${err.message}</p>
                <p style='color: #ffa500; margin-top: 10px;'>Showing demo results instead:</p>
            `;
            setTimeout(() => {
                showDemoResults();
            }, 1000);
        }
    });

    // Add keyboard support for Enter key
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});
