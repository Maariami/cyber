fetch(`items/items.json`)
  .then((response) => response.json())
  .then((products) => {
    const prodContainer = document.getElementById("products-container");
    products.forEach((item) => {
      const product = document.createElement(`div`);
      product.classList.add("product");
      product.innerHTML = `
        <img class="" src="./images/cart.png" />
        <img src="${item.image}" />
        <p class="desc">${item.name} 
        ${item.color}
        ${item.material}
        ${item.price}</p>
        <p class="price">${item.price}$</p>
        <button class="shop-now"><a href="#">Buy Now</a></button>
      
        `;
      prodContainer.appendChild(product);
    });
  });

fetch(`../items/types.json`)
  .then((list) => list.json())
  .then((listitem) => {
    const types = document.getElementById("categoryContainer");
    listitem.forEach((type) => {
      const block = document.createElement(`div`);
      block.innerHTML = `
            <div class="category">
          <img src="${type.img}" alt="" />
          <p>${type.text}</p>
        </div>
            `;
      types.appendChild(block);
    });
  });

fetch(`../items/discount.json`)
  .then((response) => response.json())
  .then((objects) => {
    const discountdiv = document.getElementById(`discount-products`);
    objects.forEach((object) => {
      const salediv = document.createElement(`div`);
      salediv.classList.add("product");
      salediv.innerHTML = `
        <img class="" src="./images/cart.png" />
        <img src="${object.image}" alt="" />
        <p class="desc">${object.name}${object.model}</p>
        <p class="price">${object.price}$</p>
        <button class="shop-now"><a href="#">Buy Now</a></button>
        `;
      discountdiv.appendChild(salediv);
    });
  });

function addingtostorage() {
  fetch(`items/items.json`)
    .then((response) => response.json())
    .then((data) => localStorage.setItem("content", JSON.stringify(data)));
}
console.log(addingtostorage());
