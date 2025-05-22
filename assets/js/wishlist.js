/**
 * ShopEase - Wishlist JavaScript
 * Handles wishlist functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  if (!checkLoginStatus()) {
    return;
  }

  loadWishlist();
  updateHeaderUI();
});

// Load wishlist items
function loadWishlist() {
  const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistEmpty = document.getElementById('wishlist-empty');
  const wishlistContent = document.getElementById('wishlist-content');
  const wishlistItems = document.getElementById('wishlist-items');
  
  // Handle empty wishlist
  if (wishlistIds.length === 0) {
    wishlistEmpty.classList.remove('hidden');
    wishlistContent.classList.add('hidden');
    return;
  }
  
  // Show wishlist content
  wishlistEmpty.classList.add('hidden');
  wishlistContent.classList.remove('hidden');
  
  // Get wishlist products
  const wishlistProducts = wishlistIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);
  
  // Render wishlist items using the same product card format as the products page
  wishlistItems.innerHTML = wishlistProducts
    .map(product => {
      const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      
      return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}">
            ${product.isNew ? '<span class="product-badge badge-new">NEW</span>' : ''}
            ${discountPercentage > 0 ? `<span class="product-badge badge-discount">${discountPercentage}% OFF</span>` : ''}
            <div class="product-actions">
              <button class="action-btn remove-from-wishlist" data-product-id="${product.id}" title="Remove from Wishlist">
                <i class="fas fa-trash"></i>
              </button>
              <button class="action-btn add-to-cart" data-product-id="${product.id}" title="Add to Cart">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
              <div class="stars">
                ${generateStarRating(product.rating)}
              </div>
              <span class="rating-count">(${product.reviewCount})</span>
            </div>
            <div class="product-price">
              <span class="current-price">${formatCurrency(product.price)}</span>
              ${product.originalPrice > product.price ? `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
            </div>
          </div>
        </div>
      `;
    })
    .join('');
  
  // Add event listeners
  addWishlistEventListeners();
}

// Add event listeners to wishlist items
function addWishlistEventListeners() {
  // Remove from wishlist buttons
  document.querySelectorAll('.remove-from-wishlist').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const productId = this.dataset.productId;
      removeFromWishlist(productId);
      
      // Show notification
      showNotification('Item removed from wishlist', 'success');
      
      // Reload wishlist
      loadWishlist();
    });
  });
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const productId = this.dataset.productId;
      const product = products.find(p => p.id === productId);
      
      if (product) {
        addToCart(product, 1);
        
        // Show notification
        showNotification(`${product.name} has been added to your cart`, 'success');
      }
    });
  });
  
  // Product card click
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.closest('button')) {
        const productId = this.dataset.productId;
        window.location.href = `product-details.html?id=${productId}`;
      }
    });
  });
  
  // Clear wishlist button
  const clearWishlistBtn = document.getElementById('clear-wishlist');
  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to clear your wishlist?')) {
        localStorage.setItem('wishlist', '[]');
        loadWishlist();
        showNotification('Wishlist has been cleared', 'success');
      }
    });
  }
  
  // Add all to cart button
  const addAllToCartBtn = document.getElementById('add-all-to-cart');
  if (addAllToCartBtn) {
    addAllToCartBtn.addEventListener('click', function() {
      const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
      const wishlistProducts = wishlistIds
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);
      
      wishlistProducts.forEach(product => {
        addToCart(product, 1);
      });
      
      showNotification('All items have been added to your cart', 'success');
    });
  }
}

// Remove item from wishlist
function removeFromWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const updatedWishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
}