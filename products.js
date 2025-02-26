document.addEventListener("DOMContentLoaded", function () {
  fetch("./items/items.json")
    .then(async (res) => {
      const products = await res.json();
      const container = document.getElementById("products-container");

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
        <div class="mocemuloba">
        <div class="photos">
            <img src="./images/cart.png" alt="Cart Icon" />
            <img src="${product.image}" alt="${product.name}" />
        </div>

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
            <button data-product-id="${
              product.id
            }" class="shop-now buy-now-link">
             Buy Now
            </button>
            </div>
          `;

        container.appendChild(productElement);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("./items/discount.json")
    .then((response) => response.json())
    .then((products) => {
      const container = document.getElementById("discount-products");

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <div class="mocemuloba">
        <div class="photos">
            <img src="./images/cart.png" alt="Cart Icon" />
            <img src="${product.image}" alt="${product.name}" />
        </div>

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

fetch("./items/types.json")
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
      categoryDiv.appendChild(imgElement);
      categoryDiv.appendChild(pElement);
      categoryContainer.appendChild(categoryDiv);
    });
  })
  .catch((error) => console.error("Error loading categories:", error));

document.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("buy-now-link")) {
    event.preventDefault(); // Prevent the default anchor click action

    const productId = event.target.getAttribute("data-product-id");

    // Fetch product data
    fetch("./items/items.json")
      .then((response) => response.json())
      .then((products) => {
        const product = products.find((p) => p.id == productId);

        if (product) {
          // Retrieve the cart from localStorage (or create an empty cart if it doesn't exist)
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Check if the product already exists in the cart
          const existingProductIndex = cart.findIndex(
            (p) => p.id === product.id
          );

          if (existingProductIndex >= 0) {
            // If the product exists, increment the quantity
            cart[existingProductIndex].quantity += 1;
          } else {
            // If the product doesn't exist, add it with quantity 1
            product.quantity = 1;
            cart.push(product);
          }

          // Save the updated cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      })
      .catch((error) => console.error("Error adding product to cart:", error));
  }
});
// When the document is fully loaded, execute this
