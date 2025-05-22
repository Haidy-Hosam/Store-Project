/**
 * ShopEase - Cart JavaScript
 * Handles shopping cart functionality
 */

// Load cart items from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  const cartContent = document.getElementById('cart-content');
  
  // Handle empty cart
  if (cart.length === 0) {
    cartEmpty.classList.remove('hidden');
    cartContent.classList.add('hidden');
    return;
  }
  
  // Show cart content
  cartEmpty.classList.add('hidden');
  cartContent.classList.remove('hidden');
  
  // Render cart items
  cartItems.innerHTML = cart.map((item, index) => {
    const variationsText = Object.entries(item.variations || {})
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join(', ');
    
    return `
      <div class="cart-item" data-cart-index="${index}">
        <div class="item-info">
          <div class="item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="item-details">
            <h4>${item.name}</h4>
            ${variationsText ? `<div class="item-variant">${variationsText}</div>` : ''}
          </div>
        </div>
        <div class="item-price">${formatCurrency(item.price)}</div>
        <div class="item-quantity">
          <button class="quantity-btn decrease-quantity">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10">
          <button class="quantity-btn increase-quantity">+</button>
        </div>
        <div class="item-subtotal">${formatCurrency(item.price * item.quantity)}</div>
        <div class="item-remove">
          <button class="remove-btn" title="Remove item">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners for cart interactions
  addCartEventListeners();
  
  // Update cart summary
  updateCartSummary();
}

// Add event listeners to cart items
function addCartEventListeners() {
  // Decrease quantity buttons
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.dataset.cartIndex);
      const quantityInput = cartItem.querySelector('.quantity-input');
      let quantity = parseInt(quantityInput.value);
      
      if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateCartItemQuantity(index, quantity);
      }
    });
  });
  
  // Increase quantity buttons
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.dataset.cartIndex);
      const quantityInput = cartItem.querySelector('.quantity-input');
      let quantity = parseInt(quantityInput.value);
      
      if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
        updateCartItemQuantity(index, quantity);
      }
    });
  });
  
  // Quantity input change
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.dataset.cartIndex);
      let quantity = parseInt(this.value);
      
      // Ensure quantity is within valid range
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
      } else if (quantity > 10) {
        quantity = 10;
      }
      
      this.value = quantity;
      updateCartItemQuantity(index, quantity);
    });
  });
  
  // Remove item buttons
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      const index = parseInt(cartItem.dataset.cartIndex);
      
      removeCartItem(index);
    });
  });
  
  // Update cart button
  const updateCartBtn = document.getElementById('update-cart');
  if (updateCartBtn) {
    updateCartBtn.addEventListener('click', function() {
      updateCartFromInputs();
      
      // Show notification
      showNotification('Cart updated successfully', 'success');
    });
  }
  
  // Apply coupon button
  const applyCouponBtn = document.getElementById('apply-coupon');
  const couponInput = document.getElementById('coupon-code');
  
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', function() {
      const couponCode = couponInput.value.trim().toUpperCase();
      
      if (couponCode === 'WELCOME20') {
        // Apply 20% discount
        localStorage.setItem('coupon', JSON.stringify({
          code: couponCode,
          discount: 0.2
        }));
        
        // Update summary
        updateCartSummary();
        
        // Show notification
        showNotification('Coupon applied successfully!', 'success');
      } else {
        // Show error
        showNotification('Invalid coupon code', 'error');
      }
    });
  }
}

// Update cart item quantity
function updateCartItemQuantity(index, quantity) {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update quantity
  cart[index].quantity = quantity;
  
  // Update subtotal display
  const cartItem = document.querySelector(`.cart-item[data-cart-index="${index}"]`);
  const subtotalElement = cartItem.querySelector('.item-subtotal');
  subtotalElement.textContent = formatCurrency(cart[index].price * quantity);
  
  // Save cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart summary
  updateCartSummary();
  
  // Update cart count
  updateCartCount();
}

// Update cart from all input fields
function updateCartFromInputs() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update each item's quantity
  document.querySelectorAll('.cart-item').forEach(item => {
    const index = parseInt(item.dataset.cartIndex);
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    
    // Ensure quantity is within valid range
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) {
      cart[index].quantity = quantity;
    }
  });
  
  // Save cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Reload cart
  loadCart();
}

// Remove item from cart
function removeCartItem(index) {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Remove item
  cart.splice(index, 1);
  
  // Save cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Reload cart
  loadCart();
  
  // Update cart count
  updateCartCount();
  
  // Show notification
  showNotification('Item removed from cart', 'success');
}

// Update cart summary
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const coupon = JSON.parse(localStorage.getItem('coupon')) || null;
  
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate shipping (free shipping over $50)
  const shipping = subtotal >= 50 ? 0 : 5.99;
  
  // Calculate discount if coupon applied
  let discount = 0;
  if (coupon) {
    discount = subtotal * coupon.discount;
    
    // Show discount in summary
    document.getElementById('discount-container').classList.remove('hidden');
    document.getElementById('cart-discount').textContent = `-${formatCurrency(discount)}`;
  } else {
    document.getElementById('discount-container').classList.add('hidden');
  }
  
  // Calculate total
  const total = subtotal - discount + shipping;
  
  // Update summary values
  document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
  document.getElementById('cart-total').textContent = formatCurrency(total);
}

// Load recently viewed products on cart page
function loadRecentlyViewedProducts() {
  const container = document.getElementById('recently-viewed-products');
  if (!container) return;
  
  // Get recently viewed product IDs from localStorage
  const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Get product data from imported products array (from products.js)
  const recentlyViewedProducts = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) // Remove undefined items
    .slice(0, 4); // Limit to 4 products
  
  if (recentlyViewedProducts.length === 0) {
    container.innerHTML = '<p class="text-center">No recently viewed products</p>';
    return;
  }
  
  // Render products
  container.innerHTML = recentlyViewedProducts
    .map(product => createProductCard(product))
    .join('');
  
  // Add event listeners
  addProductCardEventListeners();
}