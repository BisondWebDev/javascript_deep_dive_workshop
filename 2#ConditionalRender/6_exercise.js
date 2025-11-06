/*
  Scenario
  You're building a product filtering system for an e-commerce site. Users can filter products based on multiple criteria, and you need to implement the logic to determine which products to show.

  Your Task
  Implement the shouldDisplayProduct function that takes a product object and filter settings, then returns true if the product should be displayed, false otherwise.

  ## Requirements

  Your function must handle:

  1. **Category Filter** - If `filters.category` exists, only show products matching that category
  2. **Price Filter** - Only show products where price is less than or equal to `filters.maxPrice`
  3. **Rating Filter** - Only show products where rating is greater than or equal to `filters.minRating`
  4. **Stock Filter** - If `filters.inStockOnly` is true, only show in-stock products

  ### Edge Cases to Handle

  - Filter values might be `null` or `undefined` (should ignore that filter)
  - Product properties might be missing
  - Multiple filters can be active simultaneously
  - All active conditions must be true for product to display

  ## Expected Output

  Filter 1 Results:
  Wireless Headphones: SHOW
  Running Shoes: HIDE
  Coffee Maker: HIDE

  Filter 2 Results:
  Wireless Headphones: HIDE
  Running Shoes: HIDE
  Coffee Maker: SHOW

 */

  // Starter Code
function shouldDisplayProduct(product, filters) {
  // Your code here
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
  const show = shouldDisplayProduct(p, filters1);
  console.log(`${p.name}: ${show ? 'SHOW' : 'HIDE'}`);
});