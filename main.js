

let productGridWrapper = document.querySelector(".grid-wrapper");


let cart = [];
let cartButtonsDOM = [];

class Products{
    async getProducts() {
        try {
            let result = await fetch('product.json');
            let jsonData = await result.json();
            let product = jsonData.product;
            return product;
        } catch (error) {
            console.log(error);
        }
        
    }
}

class UI {
    displayProducts(products) {
        console.log(products);
        let layoutProduct = "";
        products.forEach(product => {
            layoutProduct += `
            <div class="single-box">
            <img class="displayed" src="./img/product1small.png">
            <div>
              <span class="title-text">${product.name}</span>
            </div>
            <div>
              <div><span class="other-text">${product.price}</span></div>
              <div class="add-cart"><a class="add-btn" href="#" id="${product.name}">Order</a></div>
            </div>
          </div>
            `;
        });
        productGridWrapper.innerHTML = layoutProduct;
    }

    getProductAddBtn() {
        let addCartBtn = [...document.querySelectorAll(".add-btn")];
        console.log("size:" + addCartBtn.length);
        cartButtonsDOM = addCartBtn;
        addCartBtn.forEach(button => {
            let id = button.id;
            let inCart = cart.find(item => item.name === id);
            if (inCart) {
                button.innerHTML = "In Cart";
                button.disabled = true;
            }
            button.addEventListener("click", event => {
                event.target.innerHTML = "In Cart";
                event.target.disabled = true;

                //Get product from products
                let cartItem = {...Storage.getProduct(id), amount:1};

                //Add product to cart
                cart = [...cart, cartItem];

                //Save cart to storate
                Storage.saveCart(cart);

                //Set cart values
                this.setCartValues(cart);

                //Add cart item
                this.addCartItem(cartItem);

                //Show the cart

            });

        });

    }

    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
    }

    addCartItem(item) {
        let cartContent = document.querySelector("shopping-cart");
        const divCartItem = document.createElement('div');
        divCartItem.classList.add('cart-item');
        divCartItem.innerHTML = `        <div class="product">
        <div class="product-image">
          <img src="./img/product1smallthumbnail.png">
        </div>
        <div class="product-details">
          <div class="product-title">${item.name}</div>
        </div>
        <div class="product-price">12.99</div>
        <div class="product-quantity">
          <input type="number" value="2" min="1">
        </div>
        <div class="product-removal">
          <button class="remove-product">
            Remove
          </button>
        </div>
        <div class="product-line-price">25.98</div>
      </div>`;
      
      //cartContent.appendChild(divCartItem);??Something wrong getting div of modal
      console.log(divCartItem);
    }
}

class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.name === id);
    }
    static saveCart(cart) {
        localStorage.setItem("carts", JSON.stringify(cart))
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    console.log("Loading");

    const products = new Products();
    const ui = new UI();
    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products);
    }).then(() => {
        ui.getProductAddBtn();
    });
    
});


let modal = document.getElementById("cartModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}