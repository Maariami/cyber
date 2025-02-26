fetch(`../items/items.json`)
  .then((monacemebi) => monacemebi.json())
  .then((monacemi) => {
    const produqtebi = document.getElementById("products-container");
    monacemi.forEach((produqti) => {
      const item = document.createElement(`div`);
      item.innerHTML = `<div class="product">
        <img class="" src="./images/cart.png" />
        <img src="${produqti.image}" />
        <p class="desc">${produqti.name} 
        ${produqti.color}
        ${produqti.material}
        ${produqti.price}</p>
        <p class="price">${produqti.price}$</p>
        <button class="shop-now"><a href="#">Buy Now</a></button>
        </div>
        `;
      produqtebi.appendChild(item);
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
      salediv.innerHTML = `
         <div class="product">
        <img class="" src="./images/cart.png" />
        <img src="${object.image}" alt="" />
        <p class="desc">${object.name}${object.model}</p>
        <p class="price">${object.price}$</p>
        <button class="shop-now"><a href="#">Buy Now</a></button>
      </div>
        `;
      discountdiv.appendChild(salediv);
    });
  });
