/**
 * ShopEase - Main JavaScript
 * Handles core functionality across the website
 */

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Hide mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    mobileMenu.classList.remove('active');
  }
});

// Search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

if (searchInput && searchBtn) {
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
  }
}

// Category navigation
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    window.location.href = `products.html?category=${category}`;
  });
});

// Update cart count badge
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  cartCountElements.forEach(element => {
    element.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  });
}

// Check login status
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('currentUser') !== null;
  if (!isLoggedIn) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
    return false;
  }
  return true;
}

// Update header UI based on login status
function updateHeaderUI() {
  const isLoggedIn = localStorage.getItem('currentUser') !== null;
  const accountLink = document.getElementById('account-link');
  const mobileAccountLink = document.getElementById('mobile-account-link');

  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const accountText = user.firstName ? `My Account` : 'Account';
    
    if (accountLink) {
      accountLink.innerHTML = `<a href="profile.html">${accountText}</a>`;
    }
    if (mobileAccountLink) {
      mobileAccountLink.innerHTML = `<a href="profile.html">${accountText}</a>`;
    }
  } else {
    if (accountLink) {
      accountLink.innerHTML = '<a href="login.html">Account</a>';
    }
    if (mobileAccountLink) {
      mobileAccountLink.innerHTML = '<a href="login.html">Account</a>';
    }
  }
}

// Tab system functionality
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        const tabId = `${btn.dataset.tab}-tab`;
        document.getElementById(tabId).classList.add('active');
      });
    });
  }
}

// Initialize tabs if they exist
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  updateCartCount();
});

// Utility function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Utility function to add animation class and remove it after animation completes
function animateElement(element, animationClass) {
  element.classList.add(animationClass);
  
  element.addEventListener('animationend', () => {
    element.classList.remove(animationClass);
  }, { once: true });
}

// Notification system
function showNotification(message, type = 'success') {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  // Set type and message
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Add close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
  });
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);
}

// Add styles for notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 350px;
    background-color: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateX(calc(100% + 20px));
    transition: transform 0.3s ease;
    z-index: 1000;
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification.success {
    border-left: 4px solid var(--success-color);
  }
  
  .notification.error {
    border-left: 4px solid var(--error-color);
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .notification-content i {
    font-size: 20px;
  }
  
  .notification.success i {
    color: var(--success-color);
  }
  
  .notification.error i {
    color: var(--error-color);
  }
  
  .notification-close {
    background: none;
    border: none;
    color: var(--neutral-600);
    cursor: pointer;
  }
  
  .notification-close:hover {
    color: var(--neutral-900);
  }
  
  @media (max-width: 576px) {
    .notification {
      left: 20px;
      right: 20px;
      max-width: unset;
    }
  }
`;

document.head.appendChild(notificationStyles);