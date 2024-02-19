
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let cart = [];

// Open and close cart
iconCart.addEventListener('click', () => {
  body.classList.add('showCart');
});

closeCart.addEventListener('click', () => {
  body.classList.remove('showCart');
});



// Get products in home page
var ListProducts = [];
var ListProductsHtml = document.querySelector('.listProduct');

var addDataToHtml = () => {
  ListProductsHtml.innerHTML = '';

  if (ListProducts.length > 0) {
    ListProducts.forEach(Product => {
      var newProduct = document.createElement('div');
      newProduct.classList.add('pro');
      newProduct.dataset.id = Product.id;

      newProduct.innerHTML = `
                <img src="${Product.image}" alt="">
                <div class="des">
                    <span>${Product.brandname}</span>
                    <h5>${Product.name}</h5>
                    <div class="start">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>${Product.price}$</h4>
                </div>
                <button class="more normal" style="; color: #088178; padding:12px">details</button>
                <button class="Buy normal" style="background-color: #088178; color: #fff; padding:12px 25px">Buy</button>
            `;

      ListProductsHtml.appendChild(newProduct);
    });
  }
};

// Function to add item to cart
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
  if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1
    });
  } else {
    cart[positionThisProductInCart].quantity++;
  }
  addCartToHTML();
  addCartToMemory()
};

var addCartToMemory = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add cart items to HTML
const addCartToHTML = () => {
  listCartHTML.innerHTML = '';
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach(item => {
      totalQuantity += item.quantity;
      let positionProduct = ListProducts.findIndex((value) => value.id == item.product_id);
      if (positionProduct !== -1) {
        let info = ListProducts[positionProduct];
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = item.product_id;
        newItem.innerHTML = `
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">$${info.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
        listCartHTML.appendChild(newItem);
      }
    });
  }
  iconCartSpan.innerText = totalQuantity;
};
listCartHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = 'minus';
      if(positionClick.classList.contains('plus')){
          type = 'plus';
      }
      changeQuantityCart(product_id, type);
  }
})
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
  if(positionItemInCart >= 0){
      let info = cart[positionItemInCart];
      switch (type) {
          case 'plus':
              cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
              break;
      
          default:
              let changeQuantity = cart[positionItemInCart].quantity - 1;
              if (changeQuantity > 0) {
                  cart[positionItemInCart].quantity = changeQuantity;
              }else{
                  cart.splice(positionItemInCart, 1);
              }
              break;
      }
  }
  addCartToHTML();
  addCartToMemory();
}

ListProductsHtml.addEventListener('click', (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('Buy')) {
    const productId = clickedElement.parentElement.dataset.id;
    addToCart(productId);
  }
});
ListProductsHtml.addEventListener('click', (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('more')) {
    window.location.href = 'sproducut.html';

  }
});


// Function initapp
function initApp() {
  fetch('Products.json')
    .then(response => response.json())
    .then(data => {
      ListProducts = data;
      addDataToHtml(data);
      
      if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
      }
    })
}
initApp();
