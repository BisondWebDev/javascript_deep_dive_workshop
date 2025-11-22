// --- Exercise 1: Product Filter Dashboard
const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', rating: 4.5, inStock: true },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics', rating: 4.8, inStock: true },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture', rating: 4.2, inStock: false },
  { id: 4, name: 'Chair', price: 199, category: 'Furniture', rating: 4.6, inStock: true },
  { id: 5, name: 'Monitor', price: 349, category: 'Electronics', rating: 4.7, inStock: true }
];

// TODO: Create a function that:
// 1. Filters products by category
// 2. Filters only in-stock items
// 3. Sorts by rating (high to low)
// 4. Returns array of product names

function getTopProducts(category) {
  // Your code here
}

console.log(getTopProducts('Electronics'));
// Expected: ['Phone', 'Monitor', 'Laptop']

// --- Exercise 2: Shopping Cart Calculator
const cart = [
  { name: 'Item 1', price: 29.99, quantity: 2, taxRate: 0.1 },
  { name: 'Item 2', price: 49.99, quantity: 1, taxRate: 0.1 },
  { name: 'Item 3', price: 19.99, quantity: 3, taxRate: 0.08 }
];

// TODO: Calculate:
// 1. Subtotal for each item (price * quantity)
// 2. Tax for each item (subtotal * taxRate)
// 3. Total cart value (sum of all items with tax)

function calculateCart(items) {
  // Your code here
}

console.log(calculateCart(cart));
// Expected: { subtotal: X, tax: Y, total: Z }

// --- Exercise 3: User Activity Tracker
const activities = [
  { user: 'Alice', action: 'login', timestamp: 1000 },
  { user: 'Bob', action: 'view', timestamp: 2000 },
  { user: 'Alice', action: 'purchase', timestamp: 3000 },
  { user: 'Charlie', action: 'login', timestamp: 4000 },
  { user: 'Alice', action: 'logout', timestamp: 5000 }
];

// TODO: Create a function that groups activities by user
// Return format: { username: [array of actions] }

function groupActivitiesByUser(activities) {
  // Your code here
}

console.log(groupActivitiesByUser(activities));
// Expected: { Alice: ['login', 'purchase', 'logout'], ... }