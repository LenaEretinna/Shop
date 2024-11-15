//{ Main
let productsJSON = `{
    "allProducts": [
        {
            "name": "Ribs",
            "price": 23,
            "id": "chair_ultra"
        },
        {
            "name": "Vil",
            "price": 40,
            "id": "chair_red"
        },
        {
            "name": "Pail",
            "price": 44,
            "id": "chair_ginger"
        },
        {
            "name": "Vitio",
            "price": 23,
            "id": "chair_gray"
        },
        {
            "name": "Tilar",
            "price": 43,
            "id": "chair_navy"
        }
    ]
  }`;

let products = JSON.parse(productsJSON)["allProducts"];
let productField = document.querySelector("#product_Cards");
updateCartCount();
for (let product of products) {
  console.log(product["allProducts"]);
  let productCard = document.createElement("div");
  let img = document.createElement("img");
  let nameProduct = document.createElement("h2");
  let priceProduct = document.createElement("h4");
  let butToCart = document.createElement("button");

  productCard.classList.add("productCard");

  nameProduct.textContent = product.name;
  priceProduct.textContent = product.price;

  img.src = `Image/${product.id}.png`;
  img.alt = "Picture";

  butToCart.textContent = "В корзину";
  butToCart.classList.add("toCard");
  butToCart.id = product.id;

  productField.append(productCard);
  productCard.append(img);
  img.after(nameProduct);
  nameProduct.after(priceProduct);
  priceProduct.after(butToCart);
}

productField.onclick = function (event) {
  let clicked = event.target.closest(".toCard");
  if (clicked == null) return;
  for (let product of products) {
    if (clicked.id == product.id) {
      addToStorage(product);
      updateCartCount();
      return;
    }
  }
};

//if(count.textContent != 0) { count.classList.add("on");}

// }
function addToStorage(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};
  if (cart[product.id]) {
    cart[product.id].amount += 1;
  } else {
    cart[product.id] = { ...product, amount: 1 };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  //document.querySelector("#count").classList.add("on");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let itemCount = 0;
  for (const key in cart) {
    itemCount += cart[key].amount;
  }
  if (itemCount != 0) {
    document.querySelector("#count").classList.add("on");
    document.querySelector(".on").textContent = itemCount;
  }
}
