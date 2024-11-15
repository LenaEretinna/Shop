let productData = JSON.parse(localStorage.getItem("cart"));
let products = document.querySelector(".products");
let CartCount = 0;
let productInCart = document.querySelector(".products");
let totalSum = 0;

loadPage(productData);

productInCart.onclick = function (event) {
  let clicked = event.target.closest(".manipulation-product");
  if (clicked == null) return;
  for (let key in productData) {
    let product = productData[key];
    if (product.id != clicked.id) continue; // key  то же значение, что и product.id
    if (clicked.closest(".del")) {
      document.querySelector("#count").textContent = 0;
      delete productData[key];
      localStorage.setItem("cart", JSON.stringify(productData));
      CartCount = 0;
      totalSum=0;
      document.querySelector(".products").textContent = "";

      loadPage(productData);

      return;
    } else if (clicked.closest(".plus")) {
      let a = localStorage.getItem("cart");
      product.amount++;
      localStorage.setItem("cart", JSON.stringify(productData));
      CartCount = 0;
      totalSum=0;
      document.querySelector(".products").textContent = "";

      loadPage(productData);
      console.log(a);
      return;
    } else {
      product.amount--;
      if(product.amount <= 0) delete productData[key];
      localStorage.setItem("cart", JSON.stringify(productData));
      CartCount = 0;
      totalSum=0;
      document.querySelector(".products").textContent = "";

      loadPage(productData);
      return;
    }
  }
};

// productField.onclick = function (event) {
//   let clicked = event.target.closest(".toCard");
//   if (clicked == null) return;
//   for (let product of products) {
//     if (clicked.id == product.id) {
//       addToStorage(product);
//       updateCartCount();
//       return;
//     }
//   }
// };

// for (const key in productData) {

//   const product = productData[key];
//   // создать и добавить элементы для одного товара
//   console.log(product["name"]);
//   let product_item = document.createElement("div");
//   product_item.classList.add("product-item");
//   products.prepend(product_item);

//   let productName = document.createElement("p");
//   productName.textContent = product["name"];
//   productName.classList.add("product-width");
//   product_item.prepend(productName);

//   let productPrice = document.createElement("p");
//   productPrice.textContent = product["price"];
//   productPrice.classList.add("product-width");
//   product_item.append(productPrice );

//   let productAmount = document.createElement("p");
//   productAmount.textContent = product["amount"] +" r";
//   productAmount.classList.add("product-width");
//   product_item.append(productAmount);

//   let productTotal = document.createElement("p");
//   productTotal.textContent = product["amount"] * product["price"] + " r";
//   productTotal.classList.add("product-width");
//   product_item.append(productTotal);

//   CartCount += product["amount"];
// }

function loadPage(productData) {
  for (let key in productData) {
    let product = productData[key];
    let productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.innerHTML = `
            <div class="picture_name">
              <div class="manipulation-product del" id=${
                product.id
              }><b>&times;</b></div>
              <img class="picture-product"  src="Image/${
                product.id
              }.png"  alt="picture"/>
              <p >${product["name"]}</p>
            </div>
            
            <div class="product-price">${product.price} rub</div>
            <div class="product-amount"><div class="manipulation-product minus"  id = ${
              product.id
            }><b>-</b></div>
            ${product.amount}
            <div class="manipulation-product plus" id=${
              product.id
            }><b>+</b></div>
            </div>
            <div class="product-total">${
              +product.amount * +product.price
            } rub</div>
    `;
    products.prepend(productDiv);

    CartCount += product["amount"];
    if (CartCount > 0) {
      document.querySelector("#count").classList.add("on");
      document.querySelector(".on").textContent = CartCount;
    }
    let am = +product["amount"];

    let pr = product["price"];
    totalSum += pr * am;
    document.querySelector("#sum").textContent = totalSum;
  }
}
