/**
 * ShopEase - Profile JavaScript
 * Handles user profile functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  if (!checkLoginStatus()) {
    return;
  }

  // Only load profile if we're on a page with profile elements
  if (document.getElementById('profile-name') || 
      document.getElementById('profile-email') || 
      document.getElementById('profile-avatar-text')) {
    loadUserProfile();
  }
  
  loadOrderHistory();
  updateHeaderUI();
});

// Load user profile data
function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;

  // Update profile header - only if elements exist
  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const profileAvatar = document.getElementById('profile-avatar-text');

  if (profileName) {
    profileName.textContent = `${user.firstName} ${user.lastName}`;
  }
  if (profileEmail) {
    profileEmail.textContent = user.email;
  }
  if (profileAvatar) {
    profileAvatar.textContent = getInitials(user.firstName, user.lastName);
  }

  // Update form fields - only if elements exist
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');

  if (firstNameInput) {
    firstNameInput.value = user.firstName;
  }
  if (lastNameInput) {
    lastNameInput.value = user.lastName;
  }
  if (emailInput) {
    emailInput.value = user.email;
  }
}

// Load order history
function loadOrderHistory() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const userOrders = orders.filter(order => order.userId === currentUser.id);
  const ordersList = document.getElementById('orders-list');
  
  if (!ordersList) return;

  if (userOrders.length === 0) {
    ordersList.innerHTML = `
      <div class="empty-message">
        <h3>No orders yet</h3>
        <p>When you place orders, they will appear here.</p>
        <a href="products.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }

  ordersList.innerHTML = userOrders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <div class="order-number">Order #${order.orderNumber}</div>
        <div class="order-date">${formatDate(order.date)}</div>
        <div class="order-status status-${order.status.toLowerCase()}">${order.status}</div>
      </div>
      
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
            <div class="order-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
              <div class="order-item-name">${item.name}</div>
              <div class="order-item-meta">
                Quantity: ${item.quantity} | ${formatCurrency(item.price)}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="order-total">
        Total: ${formatCurrency(order.total)}
      </div>
    </div>
  `).join('');
}

// Handle profile form submission
const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let hasError = false;

    // Validate first name
    if (firstName.length < 2) {
      document.getElementById('firstName-error').textContent = 'First name must be at least 2 characters';
      hasError = true;
    }

    // Validate last name
    if (lastName.length < 2) {
      document.getElementById('lastName-error').textContent = 'Last name must be at least 2 characters';
      hasError = true;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address';
      hasError = true;
    }

    // If changing password
    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword) {
        document.getElementById('currentPassword-error').textContent = 'Current password is required';
        hasError = true;
      }

      if (newPassword.length < 8) {
        document.getElementById('newPassword-error').textContent = 'New password must be at least 8 characters';
        hasError = true;
      }

      if (newPassword !== confirmPassword) {
        document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
        hasError = true;
      }
    }

    if (!hasError) {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Find user index
      const userIndex = users.findIndex(u => u.id === currentUser.id);

      if (userIndex >= 0) {
        // Update user data
        const updatedUser = {
          ...users[userIndex],
          firstName,
          lastName,
          email
        };

        // Update password if provided
        if (currentPassword && newPassword) {
          if (currentPassword !== users[userIndex].password) {
            document.getElementById('currentPassword-error').textContent = 'Current password is incorrect';
            return;
          }
          updatedUser.password = newPassword;
        }

        // Update users array
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));

        // Update current user
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Show success message
        showNotification('Profile updated successfully', 'success');

        // Reload profile data
        loadUserProfile();
      }
    }
  });
}

// View order details
function viewOrderDetails(orderNumber) {
  // In a real app, this would navigate to a detailed order page
  window.location.href = `order-details.html?id=${orderNumber}`;
}

// Get initials from name
function getInitials(firstName, lastName) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}