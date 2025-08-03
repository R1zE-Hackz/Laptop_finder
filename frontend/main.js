document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const resultsContainer = document.querySelector(".results");

    searchBtn.addEventListener("click", async () => {
        const brand = document.getElementById("brand").value;
        const ram = document.getElementById("ram").value;
        const storage = document.getElementById("storage").value;
        const usecase = document.getElementById("usecase").value;
        const battery = document.getElementById("battery").value;
        const minPrice = document.getElementById("minPrice").value;
        const maxPrice = document.getElementById("maxPrice").value;

        const query = `${brand} ${ram} ${storage} ${usecase} ${battery} ${minPrice} ${maxPrice}`.trim();

        resultsContainer.innerHTML = "<p>Loading...</p>";

        try {
            const response = await fetch(`http://localhost:5000/api/laptops?q=${encodeURIComponent(query)}`);
            const laptops = await response.json();

            resultsContainer.innerHTML = ""; // Clear previous results

            if (!laptops || laptops.length === 0) {
                resultsContainer.innerHTML = "<p>No results found.</p>";
                return;
            }

            laptops.forEach(laptop => {
                const card = document.createElement("div");
                card.classList.add("result-card");

                const title = document.createElement("div");
                title.classList.add("result-title");
                title.textContent = laptop.title || "No title available";

                const linkContainer = document.createElement("div");
                linkContainer.classList.add("result-link");

                const link = document.createElement("a");
                link.href = laptop.link;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = "View on Flipkart";

                linkContainer.appendChild(link);
                card.appendChild(title);
                card.appendChild(linkContainer);

                resultsContainer.appendChild(card);
            });

        } catch (err) {
            resultsContainer.innerHTML = "<p style='color:red;'>Error fetching results.</p>";
            console.error("Fetch error:", err);
        }
    });
});
