/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);



function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() { }

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tBodyEl = document.querySelector('tbody');
  tBodyEl.innerHTML = '';

  // TODO: Iterate over the items in the cart
  for (let cartItem of state.cart.items) {
    // TODO: Create a TR
    let trEl = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    let tdDeleteEl = document.createElement('td');
    let tdQuantityEl = document.createElement('td');
    let tdItemEl = document.createElement('td');

    let deleteLinkEl = document.createElement('a');
    deleteLinkEl.href = '#';
    deleteLinkEl.innerText = 'X';
    deleteLinkEl.className = cartItem.product.name;
    tdDeleteEl.appendChild(deleteLinkEl);

    tdQuantityEl.innerText = cartItem.quantity;

    let imgEl = document.createElement('img');
    imgEl.src = cartItem.product.filePath;
    imgEl.class = cartItem.product.name;
    tdItemEl.appendChild(imgEl);

    trEl.appendChild(tdDeleteEl);
    trEl.appendChild(tdQuantityEl);
    trEl.appendChild(tdItemEl);
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tBodyEl.appendChild(trEl);
  }
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  console.log(event.target.className)
  for (let cartItem of state.cart.items) {
    if (event.target.className === cartItem.product.name) {
      console.log(cartItem.product.name)
      state.cart.removeItem(cartItem)
    }
  }
  // TODO: Save the cart back to local storage
  state.cart.saveToLocalStorage()
  // TODO: Re-draw the cart table
  showCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
