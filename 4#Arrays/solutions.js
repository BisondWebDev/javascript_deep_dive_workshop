// --- Exercise 1 Solution: Product Filter Dashboard
const products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', rating: 4.5, inStock: true },
  { id: 2, name: 'Phone', price: 699, category: 'Electronics', rating: 4.8, inStock: true },
  { id: 3, name: 'Desk', price: 299, category: 'Furniture', rating: 4.2, inStock: false },
  { id: 4, name: 'Chair', price: 199, category: 'Furniture', rating: 4.6, inStock: true },
  { id: 5, name: 'Monitor', price: 349, category: 'Electronics', rating: 4.7, inStock: true }
];

function getTopProducts(category) {
  return products
    .filter(product => product.category === category && product.inStock)  // Combined filters
    .sort((a, b) => b.rating - a.rating)
    .map(product => product.name);
}

console.log(getTopProducts('Electronics'));
// Output: ['Phone', 'Monitor', 'Laptop']

console.log(getTopProducts('Furniture'));
// Output: ['Chair'] (Desk is not in stock)

// --- Exercise 2 Solution: Shopping Cart Calculator
const cart = [
  { name: 'Item 1', price: 29.99, quantity: 2, taxRate: 0.1 },
  { name: 'Item 2', price: 49.99, quantity: 1, taxRate: 0.1 },
  { name: 'Item 3', price: 19.99, quantity: 3, taxRate: 0.08 }
];

function calculateCart(items) {
  // Calculate totals for each item
  const itemsWithTotals = items.map(item => {
    const subtotal = item.price * item.quantity;
    const tax = subtotal * item.taxRate;
    const total = subtotal + tax;
    
    return {
      ...item,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  });

  // Sum up all values
  const cartTotals = itemsWithTotals.reduce((acc, item) => {
    return {
      subtotal: acc.subtotal + item.subtotal,
      tax: acc.tax + item.tax,
      total: acc.total + item.total
    };
  }, { subtotal: 0, tax: 0, total: 0 });

  // Round final values to 2 decimal places
  return {
    subtotal: parseFloat(cartTotals.subtotal.toFixed(2)),
    tax: parseFloat(cartTotals.tax.toFixed(2)),
    total: parseFloat(cartTotals.total.toFixed(2)),
    items: itemsWithTotals  // Include detailed items
  };
}

const result = calculateCart(cart);
console.log(result);

// --- Exercise 3 Solution: User Activity Tracker
const activities = [
  { user: 'Alice', action: 'login', timestamp: 1000 },
  { user: 'Bob', action: 'view', timestamp: 2000 },
  { user: 'Alice', action: 'purchase', timestamp: 3000 },
  { user: 'Charlie', action: 'login', timestamp: 4000 },
  { user: 'Alice', action: 'logout', timestamp: 5000 }
];

function groupActivitiesByUser(activities) {
  return activities.reduce((grouped, activity) => {
    // If user doesn't exist in grouped object, create empty array
    if (!grouped[activity.user]) {
      grouped[activity.user] = [];
    }
    
    // Add the action to user's array
    grouped[activity.user].push(activity.action);
    
    return grouped;
  }, {});
}

const outcome = groupActivitiesByUser(activities);
console.log(outcome);