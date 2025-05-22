/**
 * ShopEase - Admin Panel JavaScript
 */

// Check admin authentication
document.addEventListener('DOMContentLoaded', function() {
  if (!checkAdminAuth()) {
    window.location.href = 'login.html';
    return;
  }

  loadOrders();
  setupEventListeners();
});

// Admin authentication check
function checkAdminAuth() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user && user.isAdmin;
}

// Load orders into table
function loadOrders() {
  const ordersTable = document.getElementById('orders-table-body');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (orders.length === 0) {
    ordersTable.innerHTML = `
      <tr>
        <td colspan="6" class="no-orders">
          <div class="empty-message">
            <i class="fas fa-box-open"></i>
            <h3>No Orders Yet</h3>
            <p>When customers place orders, they will appear here.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  ordersTable.innerHTML = orders.map(order => {
    const user = users.find(u => u.id === order.userId);
    const userName = user ? `${user.firstName} ${user.lastName}` : 'Unknown User';

    return `
      <tr>
        <td>${order.orderNumber}</td>
        <td>${userName}</td>
        <td>${formatDate(order.date)}</td>
        <td>
          <select class="status-select" data-order="${order.orderNumber}">
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>${formatCurrency(order.total)}</td>
        <td>
          <button class="btn btn-outline" onclick="viewOrderDetails('${order.orderNumber}')">
            View Details
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Add event listeners for status changes
  document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', function() {
      updateOrderStatus(this.dataset.order, this.value);
    });
  });
}

// Update order status
function updateOrderStatus(orderNumber, newStatus) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);

  if (orderIndex !== -1) {
    orders[orderIndex].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(orders));
    showNotification(`Order ${orderNumber} status updated to ${newStatus}`, 'success');
  }
}

function viewOrderDetails(orderNumber) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders.find(o => o.orderNumber === orderNumber);
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.id === order.userId);

  if (order) {
    const modal = document.getElementById('order-modal');
    const modalContent = document.querySelector('.modal-content');

    modalContent.innerHTML = `
      <div class="modal-header">
        <h2>Order Details - ${order.orderNumber}</h2>
        <button class="close-modal" onclick="closeOrderModal()">&times;</button>
      </div>
      <div class="modal-body">
        <section class="info-section customer-info">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}</p>
          <p><strong>Email:</strong> ${user ? user.email : 'Unknown'}</p>
        </section>

        <section class="info-section shipping-info">
          <h3>Shipping Address</h3>
          <p>${order.shippingAddress.name}</p>
          <p>${order.shippingAddress.address}</p>
          <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}</p>
        </section>

        <section class="info-section order-items">
          <h3>Order Items</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>
                    <div class="item-info">
                      <img src="${item.image}" alt="${item.name}">
                      <span>${item.name}</span>
                    </div>
                  </td>
                  <td>${formatCurrency(item.price)}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </section>

        <section class="info-section order-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${formatCurrency(order.total)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>${order.total >= 50 ? 'Free' : formatCurrency(5.99)}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${formatCurrency(order.total + (order.total >= 50 ? 0 : 5.99))}</span>
          </div>
        </section>
      </div>
    `;

    modal.classList.add('active');
  }
}

// Close order modal
function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  modal.classList.remove('active');
}

// Format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Setup event listeners
function setupEventListeners() {
  // Admin logout
  document.querySelector('.admin-logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Show notification
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