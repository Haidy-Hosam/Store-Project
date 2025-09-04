/**
 * Walaa's Shop - Products JavaScript
 * Handles product-related functionality
 */

// Sample product data - in a real app, this would come from a backend
const products = [
  {
    id: 'prod_001',
    name: 'Queen',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Perfect for music lovers and professionals.',
    price: 3600,
    originalPrice: 4000,
    rating: 4.7,
    reviewCount: 124,
    category: 'straighteners',
    isNew: true,
    isFeatured: true,
        images: [
      'assets/img/Q5.jpg',
      'assets/img/Q1.jpg',
      'assets/img/Q2.jpg',
      'assets/img/Q3.jpg',
      'assets/img/Q4.jpg'
    ],
    stock: 45,
    sku: 'HDPH-BLK-001',
    specifications: {
      'Battery Life': 'Up to a 30 hours',
      'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
      'Noise Cancellation': 'Active Noise Cancelling (ANC)',
      'Weight': '250g',
      'Warranty': '2 years'
    },
    variations: {
      color: ['Black', 'White', 'Blue'],
      size: ['One Size']
    }
  },
  /*==================================*/
  {
    id: 'prod_002',
    name: 'Gold Shine',
    description: 'Track your fitness goals with our advanced smart watch. Features heart rate monitoring, sleep tracking, and more.',
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviewCount: 87,
    category: 'hair Sets',
    isNew: true,
    isFeatured: true,
    images: [
      'assets/img/C5.jpg',
      'assets/img/C5.jpg'
    ],
    stock: 32,
    sku: 'SWTCH-BLK-002',
    specifications: {
      'Battery Life': 'Up to 7 days',
      'Water Resistance': '5 ATM',
      'Display': '1.3" AMOLED',
      'Sensors': 'Heart rate, accelerometer, gyroscope',
      'Compatibility': 'iOS 12+, Android 6.0+'
    },
    variations: {
      color: ['Black', 'Silver', 'Rose Gold'],
      size: ['Standard']
    }
  },
  /*==================================*/
  {
    id: 'prod_003',
    name: 'Hair Dryer',
    description: 'Fast and efficient hair drying with ionic technology for smoother results.',
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.4,
    reviewCount: 65,
    category: 'accessories',
    isNew: false,
    isFeatured: true,
    images: [
      'assets/img/C7-1.jpg',
      'assets/img/C7-2.jpg',
      'assets/img/C7-3.jpg',
      'assets/img/C7-4.jpg',
      'assets/img/C7-5.jpg',
    ],
    stock: 25,
    sku: 'BCKPK-BRN-008',
    specifications: {
      'Material': 'Full-grain leather',
      'Capacity': '20L',
      'Dimensions': '12" x 16" x 5"',
      'Weight': '1.2kg',
      'Warranty': '1 year'
    },
    variations: {
      color: ['Brown', 'Black'],
      size: ['One Size']
    }
  },
  /*==================================*/
  {
    id: 'prod_004',
    name: 'Vooc Smart',
    description: 'Keep your drinks cold for 24 hours or hot for 12 hours with our vacuum-insulated stainless steel bottle.',
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviewCount: 103,
    category: 'home',
    isNew: false,
    isFeatured: true,
        images: [
      'assets/img/v.jpg',
      'assets/img/v.jpg',
      'assets/img/v.jpg'
    ],
    stock: 65,
    sku: 'BTTLE-BLU-004',
    specifications: {
      'Capacity': '750ml (25oz)',
      'Material': '18/8 Stainless Steel',
      'Insulation': 'Double-wall vacuum',
      'Lid Type': 'Leak-proof screw cap',
      'Weight': '300g'
    },
    variations: {
      color: ['Blue', 'Black', 'Silver', 'Green'],
      size: ['750ml']
    }
  },
  /*==================================*/
  {
    id: 'prod_005',
    name: 'Vita Gloss',
    description: 'Hydrate and nourish your skin with our all-natural face moisturizer, made with organic ingredients.',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviewCount: 78,
    category: 'beauty',
    isNew: true,
    isFeatured: true,
            images: [
      'assets/img/C12.jpg'
    ],
    stock: 42,
    sku: 'MOIST-NAT-005',
    specifications: {
      'Size': '50ml',
      'Skin Type': 'All skin types',
      'Key Ingredients': 'Aloe Vera, Jojoba Oil, Vitamin E',
      'Free From': 'Parabens, Sulfates, Artificial Fragrances',
      'Usage': 'Apply morning and evening'
    },
    variations: {
      type: ['Normal', 'Sensitive', 'Dry Skin'],
      size: ['50ml', '100ml']
    }
  },
  {
    id: 'prod_006',
    name: "Me' Ora",
    description: 'Made from 100% organic cotton, this t-shirt is both comfortable and environmentally friendly.',
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 56,
    category: 'hair Sets',
    isNew: false,
    isFeatured: true,
    images: [
      'assets/img/C3.jpg',
      'assets/img/C3.jpg',
      'assets/img/C3.jpg'
    ],
    stock: 78,
    sku: 'TSHRT-WHT-003',
    specifications: {
      'Material': '100% Organic Cotton',
      'Care': 'Machine wash cold, tumble dry low',
      'Origin': 'Ethically made in Portugal',
      'Certification': 'GOTS Certified Organic'
    },
    variations: {
      color: ['White', 'Black', 'Navy', 'Gray'],
      size: ['S', 'M', 'L', 'XL', 'XXL']
    }
  },
  /*==================================*/
  {
    id: 'prod_007',
    name: 'Padawia',
    description: 'Make perfect smoothies, soups, and more with our high-powered professional blender.',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviewCount: 91,
    category: 'hair Sets',
    isNew: false,
    isFeatured: false,
    images: [
      'assets/img/C6.jpg',
    ],
    stock: 28,
    sku: 'BLNDR-PRO-006',
    specifications: {
      'Power': '1000W',
      'Capacity': '1.5L',
      'Speed Settings': '10 variable speeds',
      'Functions': 'Pulse, smoothie, soup, crush',
      'Warranty': '3 years'
    },
    variations: {
      color: ['Black', 'Silver', 'Red'],
      size: ['Standard']
    }
  },
  /*==================================*/
  {
    id: 'prod_008',
    name: 'Hair Dryer',
    description: 'EFast and efficient hair drying with ionic technology for smoother results.',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.6,
    reviewCount: 117,
    category: 'accessories',
    isNew: true,
    isFeatured: false,
    images: [
      'assets/img/H2.jpg',
      'assets/img/H2.jpg'
    ],
    stock: 39,
    sku: 'EARBUD-WHT-007',
    specifications: {
      'Battery Life': '6 hours + 24 hours with case',
      'Connectivity': 'Bluetooth 5.0',
      'Water Resistance': 'IPX5',
      'Controls': 'Touch controls',
      'Microphone': 'Built-in with noise cancellation'
    },
    variations: {
      color: ['White', 'Black', 'Blue'],
      size: ['One Size']
    }
  },
  /*==================================*/
  {
    id: 'prod_009',
    name: 'Sedra',
    description: 'Enhance your workspace with this ergonomic chair designed for comfort and support.',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviewCount: 89,
    category: 'hair Sets',
    isNew: true,
    isFeatured: false,
    images: [
      'assets/img/C1.jpg',
      'assets/img/C1.jpg'
    ],
    stock: 15,
    sku: 'CHR-ERG-009',
    specifications: {
      'Material': 'Mesh fabric, steel frame',
      'Adjustability': 'Height, tilt, lumbar support',
      'Weight Capacity': '150kg',
      'Assembly': 'Required',
      'Warranty': '2 years'
    },
    variations: {
      color: ['Black', 'Gray'],
      size: ['Standard']
    }
  },
  /*==================================*/
  {
    id: 'prod_010',
    name: 'Scented Candle Set',
    description: 'Relax with this set of scented candles, featuring natural soy wax and essential oils.',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 72,
    category: 'Protein',
    isNew: false,
    isFeatured: true,
    images: [
      'assets/img/C9.jpg'
    ],
    stock: 50,
    sku: 'CANDL-SET-010',
    specifications: {
      'Quantity': '3 candles',
      'Burn Time': 'Up to 40 hours each',
      'Scent': 'Lavender, Vanilla, Eucalyptus',
      'Material': 'Soy wax',
      'Weight': '600g total'
    },
    variations: {
      scent: ['Lavender', 'Vanilla'],
      size: ['Set']
    }
  },
/*==================================*/
  {
    id: 'prod_011',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioning for optimal performance and comfort.',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 95,
    category: '',
    isNew: true,
    isFeatured: false,
    images: [
      'assets/img/C10.jpg',
    ],
    stock: 60,
    sku: 'SHOS-RUN-011',
    specifications: {
      'Material': 'Mesh upper, rubber sole',
      'Weight': '300g per shoe',
      'Cushioning': 'EVA foam',
      'Size Range': 'US 6-12',
      'Warranty': '1 year'
    },
    variations: {
      color: ['Blue', 'Black', 'Red'],
      size: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12']
    }
  },
  /*==================================*/
  {
    id: 'prod_012',
    name: 'Diva',
    description: 'Reduce wrinkles and boost skin elasticity with this potent anti-aging serum.',
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewCount: 83,
    category: 'beauty',
    isNew: false,
    isFeatured: true,
    images: [
      'assets/img/C11.jpg',
 
    ],
    stock: 35,
    sku: 'SRUM-ANTI-012',
    specifications: {
      'Size': '30ml',
      'Key Ingredients': 'Retinol, Hyaluronic Acid, Vitamin C',
      'Skin Type': 'All skin types',
      'Usage': 'Apply at night',
      'Shelf Life': '12 months'
    },
    variations: {
      type: ['Normal', 'Dry'],
      size: ['30ml']
    }
  },
  /*==================================*/
  {
    id: 'prod_013',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere with this compact, waterproof Bluetooth speaker.',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 110,
    category: 'electronics',
    isNew: true,
    isFeatured: false,
            images: [
      'assets/img/C2.jpg',
      'assets/img/C2.jpg',
      'assets/img/C2.jpg'
    ],
    stock: 70,
    sku: 'SPKR-BLU-013',
    specifications: {
      'Battery Life': '12 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Water Resistance': 'IPX7',
      'Output': '10W',
      'Weight': '400g'
    },
    variations: {
      color: ['Blue', 'Black', 'Green'],
      size: ['One Size']
    }
  },
  /*==================================*/
  {
    id: 'prod_014',
    name: 'Winter Jacket',
    description: 'Stay warm in style with this insulated winter jacket featuring a water-resistant finish.',
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.7,
    reviewCount: 68,
    category: '',
    isNew: false,
    isFeatured: true,
    images: [
      'assets/img/C13-1.jpg',
      'assets/img/C13-2.jpg',
    ],
    stock: 40,
    sku: 'JCKT-WIN-014',
    specifications: {
      'Material': 'Polyester, cotton lining',
      'Insulation': '100g Thinsulate',
      'Water Resistance': 'Yes',
      'Temperature Rating': '-10°C to 5°C',
      'Warranty': '1 year'
    },
    variations: {
      color: ['Black', 'Navy', 'Gray'],
      size: ['S', 'M', 'L', 'XL']
    }
  },
  /*==================================*/
  {
    id: 'prod_015',
    name: 'Diva 2',
    description: 'Brew your perfect cup with this programmable coffee maker featuring a built-in grinder.',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.5,
    reviewCount: 76,
    category: 'home',
    isNew: true,
    isFeatured: false,
    images: [
      'assets/img/C14.jpg',
    ],
    stock: 30,
    sku: 'COFMK-PRO-015',
    specifications: {
      'Capacity': '12 cups',
      'Grinder': 'Built-in conical burr',
      'Programmable': 'Yes',
      'Power': '1100W',
      'Warranty': '2 years'
    },
    variations: {
      color: ['Black', 'Stainless Steel'],
      size: ['Standard']
    }
  },
  /*==================================*/
  {
    id: 'prod_016',
    name: 'Bella',
    description: 'Protect your eyes in style with these polarized sunglasses featuring UV400 protection.',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 85,
    category: 'accessories',
    isNew: false,
    isFeatured: true,
    images: [
      'assets/img/Bella.jpg',
      'assets/img/Bella 2.jpg',
      'assets/img/Bella 3.jpg',
      'assets/img/Bella 4.jpg',
    ],
    stock: 90,
    sku: 'SUNGL-BLK-016',
    specifications: {
      'Lens Material': 'Polarized polycarbonate',
      'UV Protection': 'UV400',
      'Frame': 'Metal alloy',
      'Weight': '50g',
      'Warranty': '6 months'
    },
    variations: {
      color: ['Black', 'Silver', 'Tortoise'],
      size: ['One Size']
    }
  },
  /*==================================*/
  {
    id: 'prod_017',
    name: 'Serum',
    description: 'Fast and efficient hair drying with ionic technology for smoother results.',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviewCount: 60,
    category: 'accessories',
    isNew: true,
    isFeatured: false,
    images: [
      'assets/img/480234704_1975236546302169_8235459293552549082_n.jpg',
    ],
    stock: 45,
    sku: 'HDRY-ION-017',
    specifications: {
      'Power': '1800W',
      'Technology': 'Ionic',
      'Settings': '3 heat, 2 speed',
      'Cord Length': '2.5m',
      'Warranty': '1 year'
    },
    variations: {
      color: ['Black', 'White'],
      size: ['Standard']
    }
  }
];

// Function to generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Function to create product card HTML
function createProductCard(product) {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}">
        ${product.isNew ? '<span class="product-badge">NEW</span>' : ''}
        ${discountPercentage > 0 ? `<span class="product-badge">${discountPercentage}% OFF</span>` : ''}
        <div class="product-actions">
          <button class="action-btn add-to-wishlist" data-product-id="${product.id}" title="Add to Wishlist">
            <i class="far fa-heart"></i>
          </button>
          <button class="action-btn quick-view" data-product-id="${product.id}" title="Quick View">
            <i class="far fa-eye"></i>
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
      <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    </div>
  `;
}

// Load featured products on home page
function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  if (!featuredProductsContainer) return;
  
  const featuredProducts = products.filter(product => product.isFeatured);
  
  featuredProductsContainer.innerHTML = featuredProducts
    .slice(0, 4)
    .map(product => createProductCard(product))
    .join('');
  
  // Add event listeners to the newly added product cards
  addProductCardEventListeners();
}

// Load new arrivals on home page
function loadNewArrivals() {
  const newArrivalsContainer = document.getElementById('new-arrivals');
  if (!newArrivalsContainer) return;
  
  const newProducts = products.filter(product => product.isNew);
  
  newArrivalsContainer.innerHTML = newProducts
    .slice(0, 4)
    .map(product => createProductCard(product))
    .join('');
  
  // Add event listeners to the newly added product cards
  addProductCardEventListeners();
}

// Load all products on products page
function loadAllProducts() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;
  
  // Get URL parameters for filtering
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');
  
  // Apply initial filters
  let filteredProducts = products;
  
  if (categoryParam) {
    filteredProducts = filteredProducts.filter(product => product.category === categoryParam);
    
    // Check the corresponding category filter
    const categoryCheckbox = document.getElementById(categoryParam);
    if (categoryCheckbox) {
      categoryCheckbox.checked = true;
    }
  }
  
  if (searchParam) {
    const searchTerm = searchParam.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
    
    // Update the search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = searchParam;
    }
  }
  
  // Display filtered products
  productsGrid.innerHTML = filteredProducts
    .map(product => createProductCard(product))
    .join('');
  
  // Update product count
  const productsTotal = document.getElementById('products-total');
  if (productsTotal) {
    productsTotal.textContent = filteredProducts.length;
  }
  
  // Add event listeners
  addProductCardEventListeners();
  
  // Initialize filter handlers
  initializeFilters();
}

// Initialize product filters
function initializeFilters() {
  const applyFiltersBtn = document.getElementById('apply-filters');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const priceSlider = document.getElementById('price-slider');
  const priceValue = document.getElementById('price-value');
  const sortSelect = document.getElementById('sort-by');
  
  if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', () => {
      priceValue.textContent = `$${priceSlider.value}`;
    });
  }
  
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }
  
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }
  
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }
}

// Apply filters to products
function applyFilters() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;
  
  // Get filter values
  const categoryCheckboxes = document.querySelectorAll('#category-filters input:checked');
  const ratingCheckboxes = document.querySelectorAll('#rating-filters input:checked');
  const maxPrice = parseInt(document.getElementById('price-slider').value);
  const sortBy = document.getElementById('sort-by').value;
  
  const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);
  const selectedRatings = Array.from(ratingCheckboxes).map(cb => parseInt(cb.value));
  
  // Filter products
  let filteredProducts = products;
  
  // Apply category filter
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedCategories.includes(product.category)
    );
  }
  
  // Apply rating filter
  if (selectedRatings.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedRatings.some(rating => product.rating >= rating)
    );
  }
  
  // Apply price filter
  filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  
  // Apply sorting
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => a.isNew ? -1 : b.isNew ? 1 : 0);
      break;
    case 'featured':
    default:
      filteredProducts.sort((a, b) => b.isFeatured ? 1 : a.isFeatured ? -1 : 0);
      break;
  }
  
  // Display filtered products
  productsGrid.innerHTML = filteredProducts
    .map(product => createProductCard(product))
    .join('');
  
  // Update product count
  const productsTotal = document.getElementById('products-total');
  if (productsTotal) {
    productsTotal.textContent = filteredProducts.length;
  }
  
  // Reinitialize event listeners
  addProductCardEventListeners();
}

// Clear all filters
function clearFilters() {
  // Reset category checkboxes
  document.querySelectorAll('#category-filters input').forEach(cb => {
    cb.checked = false;
  });
  
  // Reset rating checkboxes
  document.querySelectorAll('#rating-filters input').forEach(cb => {
    cb.checked = false;
  });
  
  // Reset price slider
  const priceSlider = document.getElementById('price-slider');
  const priceValue = document.getElementById('price-value');
  if (priceSlider && priceValue) {
    priceSlider.value = 500;
    priceValue.textContent = '$500';
  }
  
  // Reset sort dropdown
  document.getElementById('sort-by').value = 'featured';
  
  // Apply filters (this will reset to default)
  applyFilters();
}

// Load product details on product details page
function loadProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Update page title
  document.title = `${product.name} - ShopEase`;
  
  // Update breadcrumb
  document.getElementById('product-name-breadcrumb').textContent = product.name;
  
  // Update main product image
  document.getElementById('main-product-image').src = product.images[0];
  document.getElementById('main-product-image').alt = product.name;
  
  // Load thumbnails
  const thumbnailList = document.getElementById('thumbnail-list');
  thumbnailList.innerHTML = product.images.map((img, index) => `
    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image-index="${index}">
      <img src="${img}" alt="${product.name} - Image ${index + 1}">
    </div>
  `).join('');
  
  // Add thumbnail click handlers
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
      const imageIndex = this.dataset.imageIndex;
      document.getElementById('main-product-image').src = product.images[imageIndex];
      
      // Update active thumbnail
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Update product details
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-rating').innerHTML = generateStarRating(product.rating);
  document.getElementById('review-count').textContent = `${product.reviewCount} reviews`;
  document.getElementById('product-sku').textContent = product.sku;
  document.getElementById('product-price').textContent = formatCurrency(product.price);
  
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  if (product.originalPrice > product.price) {
    document.getElementById('product-original-price').textContent = formatCurrency(product.originalPrice);
    document.getElementById('product-original-price').classList.remove('hidden');
    document.getElementById('discount-badge').textContent = `${discountPercentage}% OFF`;
    document.getElementById('discount-badge').classList.remove('hidden');
  } else {
    document.getElementById('product-original-price').classList.add('hidden');
    document.getElementById('discount-badge').classList.add('hidden');
  }
  
  // Update product description
  document.getElementById('product-description').innerHTML = `<p>${product.description}</p>`;
  
  // Update full description tab
  document.getElementById('full-description').innerHTML = `
    <p>${product.description}</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `;
  
  // Update specifications tab
  const specsTable = document.getElementById('specs-table');
  specsTable.innerHTML = Object.entries(product.specifications).map(([key, value]) => `
    <tr>
      <th>${key}</th>
      <td>${value}</td>
    </tr>
  `).join('');
  
  // Update product variations
  const variationsContainer = document.getElementById('product-variations');
  let variationsHTML = '';
  
  for (const [type, options] of Object.entries(product.variations)) {
    variationsHTML += `
      <div class="variation-group">
        <h4>${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
        <div class="variation-options">
          ${options.map((option, index) => `
            <div class="variation-option ${index === 0 ? 'active' : ''}" data-value="${option}">
              ${option}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  variationsContainer.innerHTML = variationsHTML;
  
  // Add variation click handlers
  document.querySelectorAll('.variation-option').forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from siblings
      const siblings = this.parentElement.querySelectorAll('.variation-option');
      siblings.forEach(sib => sib.classList.remove('active'));
      
      // Add active class to clicked option
      this.classList.add('active');
    });
  });
  
  // Initialize quantity buttons
  const decreaseBtn = document.getElementById('decrease-quantity');
  const increaseBtn = document.getElementById('increase-quantity');
  const quantityInput = document.getElementById('product-quantity');
  
  decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
      quantityInput.value = currentValue + 1;
    }
  });
  
  // Add to cart button
  const addToCartBtn = document.getElementById('add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    // Get selected variations
    const selectedVariations = {};
    document.querySelectorAll('.variation-group').forEach(group => {
      const type = group.querySelector('h4').textContent.toLowerCase();
      const value = group.querySelector('.variation-option.active').dataset.value;
      selectedVariations[type] = value;
    });
    
    // Get quantity
    const quantity = parseInt(quantityInput.value);
    
    // Add to cart
    addToCart(product, quantity, selectedVariations);
    
    // Show notification
    showNotification(`${product.name} has been added to your cart.`, 'success');
  });
  
  // Add to wishlist button
  const addToWishlistBtn = document.getElementById('add-to-wishlist');
  addToWishlistBtn.addEventListener('click', () => {
    addToWishlist(product.id);
    
    // Update button appearance
    addToWishlistBtn.querySelector('i').classList.remove('far');
    addToWishlistBtn.querySelector('i').classList.add('fas');
    
    // Show notification
    showNotification(`${product.name} has been added to your wishlist.`, 'success');
  });
  
  // Update reviews section
  updateReviewsSection(product);
  
  // Add to recently viewed
  addToRecentlyViewed(product);
}

// Update reviews section with product data
function updateReviewsSection(product) {
  // Set average rating
  document.getElementById('average-rating').textContent = product.rating.toFixed(1);
  document.getElementById('average-rating-stars').innerHTML = generateStarRating(product.rating);
  document.getElementById('total-reviews').textContent = product.reviewCount;
  
  // Generate dummy review breakdown
  const ratingBreakdown = document.getElementById('rating-breakdown');
  let breakdownHTML = '';
  
  for (let i = 5; i >= 1; i--) {
    // Generate realistic distribution favoring the actual rating
    let percentage;
    if (i === Math.round(product.rating)) {
      percentage = 60 + Math.floor(Math.random() * 20); // 60-80% for the main rating
    } else if (i === Math.round(product.rating) - 1 || i === Math.round(product.rating) + 1) {
      percentage = 10 + Math.floor(Math.random() * 15); // 10-25% for adjacent ratings
    } else {
      percentage = Math.floor(Math.random() * 10); // 0-10% for other ratings
    }
    
    const count = Math.floor((product.reviewCount * percentage) / 100);
    
    breakdownHTML += `
      <div class="rating-bar">
        <div class="rating-level">${i} star</div>
        <div class="rating-progress">
          <div class="rating-progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="rating-count">${count}</div>
      </div>
    `;
  }
  
  ratingBreakdown.innerHTML = breakdownHTML;
  
  // Generate sample reviews
  const reviewsList = document.getElementById('reviews-list');
  
  // Sample review data
  const sampleReviews = [
    {
      author: "Michael D.",
      date: "2 weeks ago",
      rating: 5,
      title: "Absolutely love it!",
      content: "This product exceeded my expectations. The quality is outstanding and it works perfectly. Would definitely recommend to anyone looking for a high-quality product."
    },
    {
      author: "Sarah T.",
      date: "1 month ago",
      rating: 4,
      title: "Great product, minor issues",
      content: "Overall I'm very happy with my purchase. The product is well-made and functions as described. I'm giving 4 stars instead of 5 because the instructions could have been clearer."
    },
    {
      author: "David L.",
      date: "2 months ago",
      rating: 5,
      title: "Best purchase this year",
      content: "I've been using this for a couple of months now and it has made a huge difference. The design is sleek and modern, and the functionality is top-notch."
    }
  ];
  
  reviewsList.innerHTML = sampleReviews.map(review => `
    <div class="review">
      <div class="review-header">
        <div class="review-author">${review.author}</div>
        <div class="review-date">${review.date}</div>
      </div>
      <div class="review-rating">
        <div class="stars">
          ${generateStarRating(review.rating)}
        </div>
      </div>
      <div class="review-title">${review.title}</div>
      <div class="review-content">
        <p>${review.content}</p>
      </div>
    </div>
  `).join('');
  
  // Initialize review form
  const reviewForm = document.getElementById('review-form');
  const ratingInputs = document.querySelectorAll('.rating-input i');
  
  // Setup rating stars interaction
  ratingInputs.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      // Update visual on hover
      for (let i = 0; i <= index; i++) {
        ratingInputs[i].classList.remove('far');
        ratingInputs[i].classList.add('fas', 'active');
      }
      for (let i = index + 1; i < ratingInputs.length; i++) {
        ratingInputs[i].classList.remove('fas', 'active');
        ratingInputs[i].classList.add('far');
      }
    });
    
    star.addEventListener('click', () => {
      // Set rating on click
      star.dataset.selected = true;
      
      // Remove selected from all other stars
      ratingInputs.forEach((s, i) => {
        if (i !== index) {
          s.dataset.selected = false;
        }
      });
    });
  });
  
  // Reset stars when leaving the rating area (if not selected)
  document.querySelector('.rating-input').addEventListener('mouseleave', () => {
    const selectedIndex = Array.from(ratingInputs).findIndex(star => star.dataset.selected === 'true');
    
    if (selectedIndex >= 0) {
      // If a star is selected, display up to that star
      for (let i = 0; i <= selectedIndex; i++) {
        ratingInputs[i].classList.remove('far');
        ratingInputs[i].classList.add('fas', 'active');
      }
      for (let i = selectedIndex + 1; i < ratingInputs.length; i++) {
        ratingInputs[i].classList.remove('fas', 'active');
        ratingInputs[i].classList.add('far');
      }
    } else {
      // If no star is selected, reset all stars
      ratingInputs.forEach(star => {
        star.classList.remove('fas', 'active');
        star.classList.add('far');
      });
    }
  });
  
  // Handle review form submission
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const selectedIndex = Array.from(ratingInputs).findIndex(star => star.dataset.selected === 'true');
    
    if (selectedIndex < 0) {
      showNotification('Please select a rating', 'error');
      return;
    }
    
    const rating = selectedIndex + 1;
    const title = document.getElementById('review-title').value.trim();
    const content = document.getElementById('review-content').value.trim();
    
    if (!title || !content) {
      showNotification('Please fill out all fields', 'error');
      return;
    }
    
    // In a real app, we would submit this to a backend
    // For now, just show a success message
    showNotification('Your review has been submitted and is pending approval. Thank you!', 'success');
    
    // Reset form
    reviewForm.reset();
    ratingInputs.forEach(star => {
      star.dataset.selected = false;
      star.classList.remove('fas', 'active');
      star.classList.add('far');
    });
  });
}

// Load related products on product details page
function loadRelatedProducts(productId) {
  const relatedProductsContainer = document.getElementById('related-products');
  if (!relatedProductsContainer) return;
  
  const currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;
  
  // Find products in the same category
  const relatedProducts = products
    .filter(p => p.id !== productId && p.category === currentProduct.category)
    .slice(0, 4);
  
  // If not enough products in the same category, add some featured products
  if (relatedProducts.length < 4) {
    const neededProducts = 4 - relatedProducts.length;
    const additionalProducts = products
      .filter(p => p.id !== productId && !relatedProducts.some(rp => rp.id === p.id) && p.isFeatured)
      .slice(0, neededProducts);
    
    relatedProducts.push(...additionalProducts);
  }
  
  relatedProductsContainer.innerHTML = relatedProducts
    .map(product => createProductCard(product))
    .join('');
  
  // Add event listeners
  addProductCardEventListeners();
}

// Add event listeners to product cards
function addProductCardEventListeners() {
  // Product card click
  document.querySelectorAll('.product-card').forEach(card => {
    // Remove any existing click listeners to avoid duplicates
    const cardClickHandler = (e) => {
      if (!e.target.closest('button')) {
        const productId = card.dataset.productId;
        window.location.href = `product-details.html?id=${productId}`;
      }
    };
    card.removeEventListener('click', cardClickHandler);
    card.addEventListener('click', cardClickHandler);
  });
  
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    // Remove any existing click listeners to avoid duplicates
    if (button.cartHandler) {
      button.removeEventListener('click', button.cartHandler);
    }
    button.cartHandler = (e) => {
      e.stopPropagation();
      const productId = button.dataset.productId;
      const product = products.find(p => p.id === productId);
      
      if (product) {
        addToCart(product, 1);
        
        // Animate button
        animateElement(button, 'button-pulse');
        
        // Show notification
        showNotification(`${product.name} has been added to your cart.`, 'success');
      }
    };
    button.addEventListener('click', button.cartHandler);
  });
  
  // Add to wishlist buttons
  document.querySelectorAll('.add-to-wishlist').forEach(button => {
    // Remove any existing click listeners to avoid duplicates
    if (button.wishlistHandler) {
      button.removeEventListener('click', button.wishlistHandler);
    }
    button.wishlistHandler = (e) => {
      e.stopPropagation();
      const productId = button.dataset.productId;
      
      addToWishlist(productId);
      
      // Update button appearance
      const icon = button.querySelector('i');
      icon.classList.remove('far');
      icon.classList.add('fas');
      
      // Animate button
      animateElement(button, 'button-pulse');
      
      // Show notification
      const product = products.find(p => p.id === productId);
      showNotification(`${product.name} has been added to your wishlist.`, 'success');
    };
    button.addEventListener('click', button.wishlistHandler);
  });
  
  // Quick view buttons
  document.querySelectorAll('.quick-view').forEach(button => {
    // Remove any existing click listeners to avoid duplicates
    if (button.quickViewHandler) {
      button.removeEventListener('click', button.quickViewHandler);
    }
    button.quickViewHandler = (e) => {
      e.stopPropagation();
      const productId = button.dataset.productId;
      
      // In a full implementation, this would open a quick view modal
      // For now, just navigate to product page
      window.location.href = `product-details.html?id=${productId}`;
    };
    button.addEventListener('click', button.quickViewHandler);
  });
}

// Add to cart functionality
function addToCart(product, quantity = 1, variations = null) {
  console.log(`Adding ${product.name} to cart, quantity: ${quantity}`); // Debug log to confirm function is called
  // Get existing cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already in cart
  const existingItemIndex = cart.findIndex(item => {
    if (variations) {
      return item.id === product.id && 
             JSON.stringify(item.variations) === JSON.stringify(variations);
    }
    return item.id === product.id;
  });
  
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      variations: variations || {}
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Add to wishlist functionality
function addToWishlist(productId) {
  // Get existing wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  // Add to wishlist if not already there
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
}

// Add to recently viewed functionality
function addToRecentlyViewed(product) {
  // Get existing recently viewed from localStorage
  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  
  // Remove if already in the list
  const filteredList = recentlyViewed.filter(id => id !== product.id);
  
  // Add to the beginning of the list
  filteredList.unshift(product.id);
  
  // Keep only the last 8 items
  const updatedList = filteredList.slice(0, 8);
  
  // Save back to localStorage
  localStorage.setItem('recentlyViewed', JSON.stringify(updatedList));
}

// Add styles for button animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes button-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .button-pulse {
    animation: button-pulse 0.3s ease-in-out;
  }
`;

document.head.appendChild(animationStyles);
