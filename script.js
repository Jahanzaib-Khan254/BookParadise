// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const suggestions = document.getElementById('suggestions');
    const currentPage = window.location.pathname.split('/').pop();

    // Determine search scope
    const searchScope = currentPage === 'Home.html' ? 
        allProducts : 
        allProducts.filter(p => p.page.startsWith('Products'));

    // Update suggestions
    function updateSuggestions(value) {
        suggestions.innerHTML = '';
        const input = value.toLowerCase();
        const matches = searchScope.filter(product => 
            product.title.toLowerCase().includes(input)
        );
        matches.forEach(product => {
            const option = document.createElement('option');
            option.value = product.title;
            suggestions.appendChild(option);
        });
    }

    // Input event handler
    searchBar.addEventListener('input', function(e) {
        updateSuggestions(e.target.value);
    });

    // Search handler
    function handleSearch() {
        const searchTerm = searchBar.value.trim();
        const foundProduct = searchScope.find(product => 
            product.title.toLowerCase() === searchTerm.toLowerCase()
        );

        if (foundProduct) {
            window.location.href = foundProduct.page;
        } else {
            searchBar.value = '';
            searchBar.placeholder = 'This product is not available';
            setTimeout(() => {
                searchBar.placeholder = 'Search books...';
            }, 3000);
        }
    }

    // Enter key and click handlers
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });
    suggestions.addEventListener('click', handleSearch);
});
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const searchBtn = document.querySelector('.search-btn'); // Select search button
    const suggestions = document.getElementById('suggestions');
    const currentPage = window.location.pathname.split('/').pop();

    // Determine search scope
    const searchScope = currentPage === 'Home.html' ? 
        allProducts : 
        allProducts.filter(p => p.page.startsWith('Products'));

    // Update suggestions
    function updateSuggestions(value) {
        suggestions.innerHTML = '';
        const input = value.toLowerCase();
        const matches = searchScope.filter(product => 
            product.title.toLowerCase().includes(input)
        );
        matches.forEach(product => {
            const option = document.createElement('option');
            option.value = product.title;
            suggestions.appendChild(option);
        });
    }

    // Search handler
    function handleSearch() {
        const searchTerm = searchBar.value.trim();
        const foundProduct = searchScope.find(product => 
            product.title.toLowerCase() === searchTerm.toLowerCase()
        );

        if (foundProduct) {
            window.location.href = foundProduct.page;
        } else {
            searchBar.value = '';
            searchBar.placeholder = 'This product is not available';
            setTimeout(() => {
                searchBar.placeholder = 'Search books...';
            }, 3000);
        }
    }

    // Enter key event
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Click event for search button
    searchBtn.addEventListener('click', handleSearch);
});




// Function to filter products based on price range
function filterProducts() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productPrice = parseInt(product.getAttribute('data-price'));

        if (productPrice >= minPrice && productPrice <= maxPrice) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.getElementById("filterBtn");

    // Function to extract product details
    function getAllProducts() {
        let products = JSON.parse(localStorage.getItem("allProducts")) || [];

        document.querySelectorAll(".products").forEach(product => {
            let name = product.querySelector("p:first-of-type").textContent;
            let priceText = product.querySelector("p:last-of-type").textContent;
            let price = parseFloat(priceText.replace("$", ""));
            let link = product.querySelector("a").href;
            let image = window.getComputedStyle(product.querySelector(".product_img")).backgroundImage;
            image = image.replace(/url\\(['\"]?(.*?)['\"]?\\)/, '$1'); // Extract URL

            // Avoid duplicate entries
            if (!products.some(p => p.name === name && p.price === price)) {
                products.push({ name, price, link, image });
            }
        });

        // Store all products globally
        localStorage.setItem("allProducts", JSON.stringify(products));
    }

    // Run on page load to ensure all products from all pages are collected
    getAllProducts();

    filterBtn.addEventListener("click", function () {
        const minPrice = document.getElementById("minPrice").value || 0;
        const maxPrice = document.getElementById("maxPrice").value || 9999;

        // Redirect to filtered products page with price range
        window.location.href = `filtered_products.html?min=${minPrice}&max=${maxPrice}`;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.getElementById("filterBtn");

    filterBtn.addEventListener("click", function () {
        let minPrice = document.getElementById("minPrice").value.trim();
        let maxPrice = document.getElementById("maxPrice").value.trim();

        // Check if both fields are empty
        if (minPrice === "" && maxPrice === "") {
            // Redirect to default product page (without filters)
            window.location.href = "Products.html"; 
            return; // Stop further execution
        }

        // Set default values if only one field is filled
        minPrice = minPrice === "" ? 0 : minPrice;
        maxPrice = maxPrice === "" ? 9999 : maxPrice;

        // Redirect to filtered products page with price range
        window.location.href = `filtered_products.html?min=${minPrice}&max=${maxPrice}`;
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const toggleFilterBtn = document.getElementById("toggleFilter");
    const priceFilter = document.getElementById("priceFilter");
    const filterBtn = document.getElementById("filterBtn");

    // Toggle dropdown visibility on button click
    toggleFilterBtn.addEventListener("click", function () {
        priceFilter.classList.toggle("show"); // Add/remove "show" class for dropdown effect
    });

    // Handle filtering logic
    filterBtn.addEventListener("click", function () {
        let minPrice = document.getElementById("minPrice").value.trim();
        let maxPrice = document.getElementById("maxPrice").value.trim();

        // If both fields are empty, reset the filter
        if (minPrice === "" && maxPrice === "") {
            window.location.href = "Products.html"; 
            return;
        }

        // Set default values if only one field is filled
        minPrice = minPrice === "" ? 0 : minPrice;
        maxPrice = maxPrice === "" ? 9999 : maxPrice;

        // Redirect to filtered products page
        window.location.href = `filtered_products.html?min=${minPrice}&max=${maxPrice}`;
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!toggleFilterBtn.contains(event.target) && !priceFilter.contains(event.target)) {
            priceFilter.classList.remove("show"); // Close dropdown
        }
    });
});
