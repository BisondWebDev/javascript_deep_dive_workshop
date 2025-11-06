function shouldDisplayProduct(product, filters) {
  // Guard clause: if product doesn't exist, don't display
  if (!product) return false;

  // Category filter: if category is specified, product must match
  if (filters.category != null && product.category !== filters.category) {
    return false;
  }

  // Price filter: product price must be within max price
  if (filters.maxPrice != null && product.price > filters.maxPrice) {
    return false;
  }

  // Rating filter: product rating must meet minimum
  if (filters.minRating != null && product.rating < filters.minRating) {
    return false;
  }

  // Stock filter: if inStockOnly is true, product must be in stock
  if (filters.inStockOnly && !product.inStock) {
    return false;
  }

  // All filters passed
  return true;
}

// Test Data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "electronics",
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 120.00,
    category: "sports",
    inStock: false,
    rating: 4.8
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 45.50,
    category: "home",
    inStock: true,
    rating: 3.9
  }
];

// Test filters
const filters1 = {
  category: "electronics",
  maxPrice: 100,
  minRating: 4.0,
  inStockOnly: true
};

const filters2 = {
  category: null,
  maxPrice: 50,
  minRating: 3.5,
  inStockOnly: false
};

// Test your function
products.forEach(p => {
  const show = shouldDisplayProduct(p, filters2);
  console.log(`${p.name}: ${show ? 'SHOW' : 'HIDE'}`);
});