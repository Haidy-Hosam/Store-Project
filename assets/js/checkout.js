/**
 * ShopEase - Checkout JavaScript
 * Handles checkout functionality
 */
let currentStep = 1;
const steps = ['shipping', 'payment', 'review'];
// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
  if (!checkLoginStatus()) {
    return;
  }
  
  loadOrderSummary();
  initializeCheckoutForms();
});

// Load order summary
function loadOrderSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  // Update summary
  document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('summary-shipping').textContent = shipping === 0 ? 'Free' : formatCurrency(shipping);
  document.getElementById('summary-tax').textContent = formatCurrency(tax);
  document.getElementById('summary-total').textContent = formatCurrency(total);
  
  // Load order items
  const orderItems = document.getElementById('order-items');
  if (orderItems) {
    orderItems.innerHTML = cart.map(item => `
      <div class="review-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="review-item-details">
          <h4>${item.name}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>${formatCurrency(item.price * item.quantity)}</p>
        </div>
      </div>
    `).join('');
  }
}

// Initialize checkout forms
function initializeCheckoutForms() {
  // Handle shipping form submission
  const shippingForm = document.getElementById('shipping-form');
  if (shippingForm) {
    shippingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateShippingForm()) {
        nextStep();
      }
    });
  }
  
  // Handle payment form submission
  const paymentForm = document.getElementById('payment-form');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validatePaymentForm()) {
        nextStep();
      }
    });
  }
  
  // Format card expiry date
  const cardExpiry = document.getElementById('card-expiry');
  if (cardExpiry) {
    cardExpiry.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      e.target.value = value;
    });
  }
}

// Validate shipping form
function validateShippingForm() {
  const fields = {
    'shipping-name': 'Full Name',
    'shipping-email': 'Email',
    'shipping-phone': 'Phone',
    'shipping-address': 'Address',
    'shipping-city': 'City',
    'shipping-state': 'State',
    'shipping-zip': 'ZIP Code'
  };
  
  let isValid = true;
  
  for (const [id, label] of Object.entries(fields)) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    
    if (!value) {
      showNotification(`${label} is required`, 'error');
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  }
  
  // Validate email format
  const email = document.getElementById('shipping-email').value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showNotification('Please enter a valid email address', 'error');
    document.getElementById('shipping-email').classList.add('error');
    isValid = false;
  }
  
  return isValid;
}

// Validate payment form
function validatePaymentForm() {
  const fields = {
    'card-name': 'Name on Card',
    'card-number': 'Card Number',
    'card-expiry': 'Expiry Date',
    'card-cvv': 'CVV'
  };
  
  let isValid = true;
  
  for (const [id, label] of Object.entries(fields)) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    
    if (!value) {
      showNotification(`${label} is required`, 'error');
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  }
  
  // Validate card number
  const cardNumber = document.getElementById('card-number').value.replace(/\D/g, '');
  if (cardNumber.length !== 16) {
    showNotification('Card number must be 16 digits', 'error');
    document.getElementById('card-number').classList.add('error');
    isValid = false;
  }
  
  // Validate expiry date
  const expiry = document.getElementById('card-expiry').value;
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    showNotification('Invalid expiry date format (MM/YY)', 'error');
    document.getElementById('card-expiry').classList.add('error');
    isValid = false;
  } else {
    const [month, year] = expiry.split('/');
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    if (parseInt(month) < 1 || parseInt(month) > 12) {
      showNotification('Invalid month in expiry date', 'error');
      document.getElementById('card-expiry').classList.add('error');
      isValid = false;
    } else if (parseInt(year) < currentYear || 
              (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      showNotification('Card has expired', 'error');
      document.getElementById('card-expiry').classList.add('error');
      isValid = false;
    }
  }
  
  // Validate CVV
  const cvv = document.getElementById('card-cvv').value;
  if (!/^\d{3,4}$/.test(cvv)) {
    showNotification('CVV must be 3 or 4 digits', 'error');
    document.getElementById('card-cvv').classList.add('error');
    isValid = false;
  }
  
  return isValid;
}

// Move to next step
function nextStep() {
  if (currentStep < 3) {
    // Hide current form
    document.getElementById(`${steps[currentStep-1]}-form`).classList.remove('active');
    
    // Show next form
    document.getElementById(`${steps[currentStep]}-form`).classList.add('active');
    
    // Update steps indicator
    document.getElementById(`step-${steps[currentStep-1]}`).classList.remove('active');
    document.getElementById(`step-${steps[currentStep]}`).classList.add('active');
    
    // If moving to review step, populate review information
    if (currentStep === 2) {
      populateReviewInfo();
    }
    
    currentStep++;
  }
}

// Move to previous step
function previousStep() {
  if (currentStep > 1) {
    // Hide current form
    document.getElementById(`${steps[currentStep-1]}-form`).classList.remove('active');
    
    // Show previous form
    document.getElementById(`${steps[currentStep-2]}-form`).classList.add('active');
    
    // Update steps indicator
    document.getElementById(`step-${steps[currentStep-1]}`).classList.remove('active');
    document.getElementById(`step-${steps[currentStep-2]}`).classList.add('active');
    
    currentStep--;
  }
}

// Populate review information
function populateReviewInfo() {
  // Populate shipping info
  const shippingInfo = {
    name: document.getElementById('shipping-name').value,
    email: document.getElementById('shipping-email').value,
    phone: document.getElementById('shipping-phone').value,
    address: document.getElementById('shipping-address').value,
    city: document.getElementById('shipping-city').value,
    state: document.getElementById('shipping-state').value,
    zip: document.getElementById('shipping-zip').value
  };
  
  document.getElementById('review-shipping').innerHTML = `
    <p>${shippingInfo.name}</p>
    <p>${shippingInfo.address}</p>
    <p>${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}</p>
    <p>Email: ${shippingInfo.email}</p>
    <p>Phone: ${shippingInfo.phone}</p>
  `;
  
  // Populate payment info
  const cardNumber = document.getElementById('card-number').value;
  const lastFour = cardNumber.slice(-4);
  
  document.getElementById('review-payment').innerHTML = `
    <p>Card ending in ${lastFour}</p>
    <p>Expiry: ${document.getElementById('card-expiry').value}</p>
  `;
}

function placeOrder() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  // Get shipping info
  const shippingInfo = {
    name: document.getElementById('shipping-name').value,
    address: document.getElementById('shipping-address').value,
    city: document.getElementById('shipping-city').value,
    state: document.getElementById('shipping-state').value,
    zip: document.getElementById('shipping-zip').value
  };
  
  // Generate order number
  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Create order object
  const newOrder = {
    orderNumber,
    userId: currentUser.id,
    date: new Date().toISOString(),
    status: 'Processing',
    items: cart,
    total: total,
    shippingAddress: shippingInfo
  };
  
  // Add to orders in localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Show confirmation modal
  document.getElementById('order-number').textContent = orderNumber;
  document.getElementById('order-confirmation').classList.add('show');
  
  // Clear cart
  localStorage.removeItem('cart');
}