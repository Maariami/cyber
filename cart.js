document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".shopping-cart");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    // Loop through each product in the cart and create the item elements dynamically
    cart.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("item");
      cartItem.setAttribute("data-product-id", product.id); // Set product ID for easy access later

      cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <div class="whatever">
                  <div class="name-id">
                    <p class="title">${product.name}</p>
                  </div>
                  <div class="num">
                    <p class="decrement">-</p>
                    <div class="amount" data-product-id="${product.id}">${
        product.quantity
      }</div>
                    <p class="increment">+</p>
                    <p>$${(product.price * product.quantity).toFixed(2)}</p>
                    <img src="./images/Close.png" alt="Remove" class="remove-item" data-product-id="${
                      product.id
                    }" />
                  </div>
                </div>
              `;

      cartContainer.appendChild(cartItem);
    });
  }

  // Handle the click events for increment, decrement, and remove actions
  cartContainer.addEventListener("click", function (event) {
    const target = event.target;
    const productId = target.closest(".item").getAttribute("data-product-id");
    const amountElement = target.closest(".item").querySelector(".amount");
    let quantity = parseInt(amountElement.textContent);

    if (target.classList.contains("increment")) {
      // Increase quantity
      quantity += 1;
      amountElement.textContent = quantity; // Update .amount display
      updateCartQuantity(productId, quantity); // Update localStorage immediately
    } else if (target.classList.contains("decrement") && quantity > 1) {
      // Decrease quantity (but not below 1)
      quantity -= 1;
      amountElement.textContent = quantity; // Update .amount display
      updateCartQuantity(productId, quantity); // Update localStorage immediately
    } else if (target.classList.contains("remove-item")) {
      // Remove item from cart
      removeItemFromCart(productId);
      return;
    }
  });

  // Function to update cart quantity and save changes to localStorage
  function updateCartQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((p) => p.id === productId);

    if (productIndex >= 0) {
      // Update the product quantity in the cart
      cart[productIndex].quantity = newQuantity;

      // Save the updated cart back to localStorage immediately
      localStorage.setItem("cart", JSON.stringify(cart));

      // Debugging: Check the updated cart in localStorage
      console.log("Updated cart:", cart);
    }
  }

  // Function to remove item from cart and update localStorage
  function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== productId);

    // Save the updated cart back to localStorage immediately
    localStorage.setItem("cart", JSON.stringify(cart));

    // Debugging: Check the updated cart in localStorage
    console.log("Cart after item removal:", cart);

    // Remove the item from the DOM
    const itemElement = document.querySelector(
      `.item[data-product-id="${productId}"]`
    );
    if (itemElement) {
      itemElement.remove();
    }

    // If the cart is empty, show an empty message
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }
  }
});
