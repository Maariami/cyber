document.addEventListener("DOMContentLoaded", function () {
  fetch("./items/items.json")
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("products-container");

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
        <div class="mocemuloba">
        <div class="photos">
            <img src="./images/cart.png" alt="Cart Icon" />
            <img src="${product.image}" alt="${product.name}" /></div>
          
            <p class="desc">${product.name} 
            ${product.screen ? product.screen : ""} 
            ${product.storage ? product.storage : ""} 
            ${product.connectivity ? product.connectivity : ""}
            ${product.color ? product.color : ""} 
            ${product.material ? product.material : ""} 
            ${product.model ? product.model : ""} 
            ${product.year ? product.year : ""}
            </p>
            <p class="price">$${product.price}</p>
            </div>
            <button class="shop-now">
            <a href="${product.buy_link}" >
             Buy Now
            </a>
            </button>
            </div>
          `;

        container.appendChild(productElement);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("./items/discount.json") // Make sure this path is correct
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("discount-products"); // Updated ID

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <div class="mocemuloba">
        <div class="photos">
            <img src="./images/cart.png" alt="Cart Icon" />
            <img src="${product.image}" alt="${product.name}" /></div>
          
            <p class="desc">${product.name} 
            ${product.screen ? product.screen : ""} 
            ${product.storage ? product.storage : ""} 
            ${product.connectivity ? product.connectivity : ""}
            ${product.color ? product.color : ""} 
            ${product.material ? product.material : ""} 
            ${product.model ? product.model : ""} 
            ${product.year ? product.year : ""}
            </p>
            <p class="price">$${product.price}</p>
            </div>
            <button class="shop-now">
            <a href="${product.buy_link}" >
             Buy Now
            </a>
            </button>
            </div>
            `;

        container.appendChild(productElement);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
});

fetch("./items/types.json") // Change this path to your actual location of types.json
  .then((response) => response.json())
  .then((types) => {
    const categoryContainer = document.getElementById("categoryContainer");

    types.forEach((type) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category");

      const imgElement = document.createElement("img");
      imgElement.src = type.img;
      imgElement.alt = type.text;

      const pElement = document.createElement("p");
      pElement.textContent = type.text;

      // Append the img and p elements to the category div
      categoryDiv.appendChild(imgElement);
      categoryDiv.appendChild(pElement);

      // Append the category div to the container
      categoryContainer.appendChild(categoryDiv);
    });
  })
  .catch((error) => console.error("Error loading categories:", error));
