/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i of state.allProducts) {
    let optionEl = document.createElement('option')
    optionEl.value = i.name;
    optionEl.innerText = i.name;
    selectElement.appendChild(optionEl)
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  let selectItemEl = document.getElementById('items');
  let quantityInputEl = document.getElementById('quantity');
  let quantity;

  for (let product of state.allProducts) {
    if (selectItemEl.value === product.name) {
      // TODO: get the quantity
      console.log('touched')
      quantity = quantityInputEl.value;
      state.cart.addItem(product, quantity)
    }
  }
};

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let cartContentsEl = document.getElementById('cartContents');


  // TODO: Add a new element to the cartContents div with that information

  console.log(state.cart.items[0].product.filePath)

  for (let cartItem of state.cart.items) {
    console.log(cartItem)
    let figureEl = document.createElement('figure')
    let imgEl = document.createElement('img');
    let figCaptionEl = document.createElement('figcaption');

    imgEl.src = cartItem.product.filePath;
    imgEl.class = cartItem.product.name;
    figCaptionEl.innerText = quantity;


    figureEl.appendChild(imgEl);
    figureEl.appendChild(figCaptionEl);
    cartContentsEl.appendChild(imgEl);
  }
};

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
