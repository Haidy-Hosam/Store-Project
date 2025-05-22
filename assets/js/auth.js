/**
 * ShopEase - Authentication JavaScript
 * Handles user authentication functionality
 */

// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Function to check if user is admin
function isAdmin() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user && user.isAdmin;
}

// Function to update header UI based on authentication status
function updateHeaderUI() {
  const accountLinks = document.querySelectorAll('#account-link, #mobile-account-link');
  
  if (isLoggedIn()) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    accountLinks.forEach(link => {
      link.innerHTML = `
        <a href="#" class="user-menu-toggle">
          <i class="fas fa-user-circle"></i> ${user.firstName}
        </a>
        <div class="user-dropdown">
          <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
          <a href="orders.html"><i class="fas fa-box"></i> My Orders</a>
          <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
          ${user.isAdmin ? '<a href="admin.html"><i class="fas fa-cog"></i> Admin Panel</a>' : ''}
          <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      `;
      
      // Add event listener to toggle user dropdown
      const userMenuToggle = link.querySelector('.user-menu-toggle');
      const userDropdown = link.querySelector('.user-dropdown');
      
      if (userMenuToggle && userDropdown) {
        userMenuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
          }
        });
        
        // Handle logout
        const logoutBtn = link.querySelector('#logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
          });
        }
      }
    });
  } else {
    accountLinks.forEach(link => {
      link.innerHTML = '<a href="login.html">Account</a>';
    });
  }
}

// Signup form handling
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsCheckbox = document.getElementById('terms');
    
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
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
      document.getElementById('email-error').textContent = 'Email already in use';
      hasError = true;
    }
    
    // Validate password
    if (password.length < 8) {
      document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
      hasError = true;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
      document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
      hasError = true;
    }
    
    // Validate terms
    if (!termsCheckbox.checked) {
      document.getElementById('terms-error').textContent = 'You must agree to the Terms of Service';
      hasError = true;
    }
    
    if (!hasError) {
      // Create new user object
      const newUser = {
        id: generateUserId(),
        firstName,
        lastName,
        email,
        password, // In a real app, never store plain-text passwords!
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
      
      // Add user to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Log user in
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Show success message
      const formMessage = document.getElementById('form-message');
      formMessage.textContent = 'Account created successfully! Redirecting...';
      formMessage.classList.add('success');
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    }
  });
  
  // Toggle password visibility
  const togglePassword = document.querySelector('.toggle-password');
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
}

// Login form handling
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
    
    let hasError = false;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address';
      hasError = true;
    }
    
    if (!hasError) {
      // Get users from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Find user with matching email
      const user = users.find(user => user.email === email);
      
      if (!user || user.password !== password) {
        // Show error message
        const formMessage = document.getElementById('form-message');
        formMessage.textContent = 'Invalid email or password';
        formMessage.classList.remove('success');
        return;
      }
      
      // Log user in
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Show success message
      const formMessage = document.getElementById('form-message');
      formMessage.textContent = 'Login successful! Redirecting...';
      formMessage.classList.add('success');
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  });
  
  // Toggle password visibility
  const togglePassword = document.querySelector('.toggle-password');
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
}

// Generate a unique user ID
function generateUserId() {
  return 'user_' + Math.random().toString(36).substring(2, 15);
}

document.head.appendChild(userDropdownStyles);

// Initialize demo users if they don't exist
function initDemoUsers() {
  if (!localStorage.getItem('users')) {
    const demoUsers = [
      {
        id: 'admin_1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@shopease.com',
        password: 'admin123',
        isAdmin: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'admin_2',
        firstName: 'Super',
        lastName: 'Admin',
        email: 'super.admin@shopease.com',
        password: 'admin123',
        isAdmin: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', () => {
  initDemoUsers();
  updateHeaderUI();
});