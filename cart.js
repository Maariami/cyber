document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".shopping-cart");
  const subtotalElement = document.querySelector(".subtotal");
  const totalElement = document.querySelector(".total");
  const taxElement = document.querySelector(".tax");
  const shipElement = document.querySelector(".ship");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Fixed values for shipping and tax
  const taxAmount = 50; // Fixed tax value
  const shippingAmount = 29; // Fixed shipping value

  // Function to calculate subtotal from all .final-price elements
  function updateSummary() {
    let subtotal = 0;

    // Calculate the subtotal by summing the final price of all items
    document.querySelectorAll(".final-price").forEach((priceElement) => {
      subtotal += parseFloat(priceElement.textContent.replace("$", "")) || 0;
    });

    // Calculate total (Subtotal + Tax + Shipping)
    let total = subtotal + taxAmount + shippingAmount;

    // Update the tax, shipping, subtotal, and total in the UI
    taxElement.innerHTML = `<p>Tax</p><p>$${taxAmount}</p>`; // Display as integer
    shipElement.innerHTML = `<p>Shipping</p><p>$${shippingAmount}</p>`; // Display as integer
    subtotalElement.innerHTML = `<p>Subtotal</p><p>$${subtotal.toFixed(2)}</p>`; // Display as float
    totalElement.innerHTML = `<p>Total</p><p>$${total.toFixed(2)}</p>`; // Display as float
  }

  // Check if the cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalElement.innerHTML = `<p>Subtotal</p><p>$0.00</p>`;
    taxElement.innerHTML = `<p>Tax</p><p>$0</p>`; // Display as integer
    shipElement.innerHTML = `<p>Shipping</p><p>$0.00</p>`;
    totalElement.innerHTML = `<p>Total</p><p>$0.00</p>`;
  } else {
    // Render cart items
    cart.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("item");
      cartItem.setAttribute("data-product-id", product.id);

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
            <p class="final-price" data-product-id="${product.id}">$${(
        product.price * product.quantity
      ).toFixed(2)}</p>
            <img src="./images/Close.png" alt="Remove" class="remove-item" data-product-id="${
              product.id
            }" />
          </div>
        </div>
      `;

      cartContainer.appendChild(cartItem);
    });

    updateSummary(); // Initial update
  }

  // Handle click events for increment, decrement, and remove actions
  cartContainer.addEventListener("click", function (event) {
    const target = event.target;
    const itemElement = target.closest(".item");
    if (!itemElement) return; // If the clicked element isn't part of a cart item, do nothing

    const productId = itemElement.getAttribute("data-product-id");
    const amountElement = itemElement.querySelector(".amount");
    let quantity = parseInt(amountElement.textContent);

    // Check if we clicked increment, decrement, or remove button
    if (target.classList.contains("increment")) {
      quantity += 1;
      updateCartQuantity(productId, quantity);
    } else if (target.classList.contains("decrement") && quantity > 1) {
      quantity -= 1;
      updateCartQuantity(productId, quantity);
    } else if (target.classList.contains("decrement") && quantity == 1) {
      removeItemFromCart(productId);
    } else if (target.classList.contains("remove-item")) {
      removeItemFromCart(productId);
    }
  });

  // Function to update cart quantity, price, and save changes to localStorage
  function updateCartQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((p) => p.id === Number(productId));

    if (productIndex >= 0) {
      cart[productIndex].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update the UI
      const itemElement = document.querySelector(
        `.item[data-product-id="${productId}"]`
      );
      if (itemElement) {
        const amountElement = itemElement.querySelector(".amount");
        const priceElement = itemElement.querySelector(".final-price");

        amountElement.textContent = newQuantity;
        priceElement.textContent = `$${(
          cart[productIndex].price * newQuantity
        ).toFixed(2)}`;
      }

      updateSummary(); // Update subtotal, taxes, shipping, and total
      console.log("Updated cart:", cart);
    } else {
      console.error("Product not found in cart:", productId);
    }
  }

  // Function to remove item from cart and update localStorage
  function removeItemFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((product) => product.id !== Number(productId));

    localStorage.setItem("cart", JSON.stringify(cart));

    // Remove the item from the DOM
    const itemElement = document.querySelector(
      `.item[data-product-id="${productId}"]`
    );
    if (itemElement) {
      itemElement.remove();
    }

    updateSummary(); // Update subtotal, taxes, shipping, and total

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      subtotalElement.innerHTML = `<p>Subtotal</p><p>$0.00</p>`;
      taxElement.innerHTML = `<p>Tax</p><p>$0</p>`; // Display as integer
      shipElement.innerHTML = `<p>Shipping</p><p>$0.00</p>`;
      totalElement.innerHTML = `<p>Total</p><p>$0.00</p>`;
    }

    console.log("Cart after item removal:", cart);
  }
});
