// function determineTopProduct(productList) {
//     return productList.reduce((topProduct, product) => {
//         return product.rating > topProduct.rating ? product : topProduct;
//     }, productList[0]);
// }

document.addEventListener("DOMContentLoaded", function() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    prevButton.addEventListener("click", handlePrev);
    nextButton.addEventListener("click", handleNext);

    document.getElementById("search-button").addEventListener("click", searchProductsByName);

    displayProducts(currentPage);
    updatePaginationButtons();
    
    displayTopProduct(productsArray); 

});

function generateProducts(numProducts = 20) {
    
    const productNames = [
        "Crispy Potato Chips",
        "Sweet & Salty Popcorn",
        "Chocolate-Covered Almonds",
        "Tangy Sour Gummies",
        "Savory Pretzel Sticks",
        "Spicy Jalapeño Poppers",
        "Honey Roasted Peanuts",
        "Cheese and Crackers",
        "Deluxe Trail Mix",
        "Cheddar Cheese Puffs",
        "Caramel Popcorn",
        "Salted Cashews",
        "Fruit and Nut Bars",
        "Mixed Berry Yogurt",
        "Chocolate Muffins",
        "Sour Cream & Onion Chips",
        "Milk Chocolate Bars",
        "Assorted Fruit Gummies",
        "Roasted Sunflower Seeds",
        "Rice Cakes"
    ];

    const productDescriptions = [
        "A classic snack for every occasion.",
        "The perfect balance of sweet and salty.",
        "Perfect mix of chocolate and almonds.",
        "Get a burst of sourness in every bite.",
        "Crunchy pretzel sticks with a savory twist.",
        "Spicy and delicious jalapeño flavor.",
        "Honey roasted peanuts for a sweet treat.",
        "Enjoy cheese and crackers together.",
        "A mix of nuts, dried fruits, and chocolates.",
        "Cheese puffs with a cheddar kick.",
        "Delicious caramel-coated popcorn.",
        "Premium quality salted cashews.",
        "Healthy bars with a blend of fruits and nuts.",
        "Yogurt-covered berries for a tasty snack.",
        "Indulge in moist chocolate muffins.",
        "Classic sour cream & onion flavor.",
        "Melt-in-your-mouth milk chocolate.",
        "Fruit gummies bursting with flavor.",
        "Roasted sunflower seeds for snacking.",
        "Light and crispy rice cakes."
    ];

    const productPrices = Array.from({ length: numProducts }, () =>
      (Math.random() * 5 + 1).toFixed(2)
    );

    const productRatings = Array.from({ length: numProducts }, () =>
        Math.floor(Math.random() * 11) // Ratings between 0 and 5
    );

    const products = [];
    for (let i = 0; i < numProducts; i++) {
    const product = {
        name: productNames[i % productNames.length],
        description: productDescriptions[i % productDescriptions.length],
        price: productPrices[i],
        rating: productRatings[i],
        image: "placeholder.jpg"
    };
    products.push(product);
    }

    return products;
}
    
    const productsArray = generateProducts(20);
    const productsPerPage = 10; // Number of products to display per page
    let currentPage = 1; // Current page number
    
function generateProductCard(product)  {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
    
        const productName = document.createElement("h2");
        productName.textContent = product.name;
    
        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;
    
        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price} EUR`;
    
        const productRating = document.createElement("p");
        productRating.textContent = `${product.rating}/10`;
    
        const productImage = document.createElement("img");
        productImage.src = product.image;
    
        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productRating);
    
        return productDiv;
    }
    function displayProducts(page) {
        const productContainers = document.querySelectorAll(".product-container");
        productContainers.forEach((container, index) => {
            container.innerHTML = ""; // Clear existing products
            const startIndex = (page - 1) * productsPerPage + index * 3;
            const endIndex = startIndex + 3;
            
            const productsToDisplay = productsArray.slice(startIndex, endIndex);
            
            productsToDisplay.forEach(product => {
            const productCard = generateProductCard(product);
            container.appendChild(productCard);
            });
        });
        
    }
    
    function handlePrev() {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(currentPage);
            updatePaginationButtons();
        }
    }
    
    function handleNext() {
        const totalPages = Math.ceil(productsArray.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(currentPage);
            updatePaginationButtons();
        }
    }
    
    function updatePaginationButtons() {
        const prevButton = document.getElementById("prev-button");
        const nextButton = document.getElementById("next-button");
    
        const totalPages = Math.ceil(productsArray.length / productsPerPage);
    
        if (currentPage === 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }
    
        if (currentPage === totalPages) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
    }

    function searchProductsByName() {
        const searchInput = document.getElementById("search-input");
        const searchTerm = searchInput.value.toLowerCase(); // Convert the input to lowercase for case-insensitive search
    
        // Filter the products array by checking if the product name contains the search term
        const filteredProducts = productsArray.filter(product => product.name.toLowerCase().includes(searchTerm));
    
        // Display the filtered products
        displayFilteredProducts(filteredProducts);
    }
    
    function displayFilteredProducts(filteredProducts) {
        const productContainers = document.querySelectorAll(".product-container");

        console.log("Number of product containers: " + productContainers.length);

        // Clear existing products
        productContainers.forEach(container => {
            container.innerHTML = "";
        });
        
        // Create and display product cards for the filtered products
        filteredProducts.forEach((product, index) => {
            const productCard = generateProductCard(product);
            const containerIndex = index % productContainers.length;
            productContainers[containerIndex].appendChild(productCard);
        });
        
        // Update pagination buttons
        currentPage = 1; // Reset to the first page
        updatePaginationButtons();
    }
// Function to fetch images from the ImgFlip API
async function fetchImages() {
    try {
        // Fetch data from the API
        const response = await fetch('https://api.imgflip.com/get_memes');
        const data = await response.json();

        // Check if the response is successful and contains data
        if (data.success && data.data.memes) {
            // Get the first 20 images
            const images = data.data.memes.slice(0, 20);
            return images;
        } else {
            throw new Error('Failed to fetch images from the API');
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}


fetchImages()
    .then(images => {
        console.log(images);
        // Update your product objects with these images
        productsArray.forEach((product, index) => {
            if (index < images.length) {
                // Use the URL of the retrieved image
                product.image = images[index].url;
            }
        });

        displayProducts(currentPage);
        displayTopProduct(productsArray);

    })
    .catch(error => {
        console.error(error);
    });
    // Usage: Call the fetchImages function and use the retrieved images
// function determineTopProduct(productList) {
//         return productList.reduce((topProduct, product) => {
//             return product.rating > topProduct.rating ? product : topProduct;
//         }, productList[0]);
//     }

// function displayTopProduct(productList) {
//         const topProduct = determineTopProduct(productList);
//         const topProductContainer = document.createElement("article");
//         topProductContainer.className = "product-container";
        
//         const topProductCard = generateProductCard(topProduct);
        
//         const determineTopProduct = (productList) => {
//             return productList.reduce((topProduct, product) => {
//                 return product.rating > topProduct.rating ? product : topProduct;
//             }, productList[0]);
//         }
        
        

//         topProductContainer.appendChild(topProductCard);
        
//         // Append the top product container to the main
//         const main = document.querySelector(".main.bd-grid");
//         main.appendChild(topProductContainer);
//     }