let cartCount = 0;
let totalCost = 0;

function addToCart(button) {
  // Disable the button
  button.disabled = true;
  
  // Increase the cart count
  cartCount++;
  document.getElementById("cart-count").textContent = cartCount;

  // Get product details from the button's parent
  const productDiv = button.parentElement;
  const productName = productDiv.querySelector('p').innerText;
  const productPrice = parseFloat(productDiv.querySelectorAll('p')[1].innerText.replace('Price: $', ''));

  // Add item to cart
  addItemToCart(productName, productPrice);
}

function addItemToCart(name, price) {
  // Create cart item element
  const cartItemsContainer = document.getElementById("cart-items");
  
  const cartItemDiv = document.createElement("div");
  cartItemDiv.className = "cart-item";

  cartItemDiv.innerHTML = `
    <img src="http://www.pngall.com/wp-content/uploads/2016/07/Plants-Free-Download-PNG.png" alt="${name}" class="cart-thumbnail">
    <p>Name: ${name}</p>
    <p>Unit Price: $${price}</p>
    <button onclick="decreaseQuantity(this)">-</button>
    <span class="quantity">1</span>
    <button onclick="increaseQuantity(this)">+</button>
    <button onclick="removeItem(this)">Delete</button>
  `;

  cartItemsContainer.appendChild(cartItemDiv);

  // Update total cost and item count
  updateCartTotals(price, 1);
}

function increaseQuantity(button) {
  const cartItem = button.parentElement;
  const quantityElement = cartItem.querySelector('.quantity');
  const unitPrice = parseFloat(cartItem.querySelector('p:nth-child(2)').innerText.replace('Unit Price: $', ''));

  let quantity = parseInt(quantityElement.innerText);
  quantity++;
  quantityElement.innerText = quantity;

  updateCartTotals(unitPrice, 1);
}

function decreaseQuantity(button) {
  const cartItem = button.parentElement;
  const quantityElement = cartItem.querySelector('.quantity');
  const unitPrice = parseFloat(cartItem.querySelector('p:nth-child(2)').innerText.replace('Unit Price: $', ''));

  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 1) {
    quantity--;
    quantityElement.innerText = quantity;
    updateCartTotals(unitPrice, -1);
  }
}

function removeItem(button) {
  const cartItem = button.parentElement;
  const unitPrice = parseFloat(cartItem.querySelector('p:nth-child(2)').innerText.replace('Unit Price: $', ''));
  const quantity = parseInt(cartItem.querySelector('.quantity').innerText);

  // Remove the item from the cart
  cartItem.remove();

  // Update totals
  updateCartTotals(unitPrice, -quantity);
}

function updateCartTotals(price, quantityChange) {
  totalCost += price * quantityChange;
  cartCount += quantityChange;

  document.getElementById("total-cost").innerText = totalCost.toFixed(2);
  document.getElementById("total-items").innerText = cartCount;

  document.getElementById("cart-count").textContent = cartCount;
}