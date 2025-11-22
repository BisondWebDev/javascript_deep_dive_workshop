// --- Section 1: Combining operations for powerful data transformations
const products = [
  { name: 'Laptop', price: 999, category: 'electronics', inStock: true },
  { name: 'Mouse', price: 25, category: 'electronics', inStock: false },
  { name: 'Desk', price: 350, category: 'furniture', inStock: true },
  { name: 'Chair', price: 200, category: 'furniture', inStock: true },
  { name: 'Keyboard', price: 75, category: 'electronics', inStock: true }
];

// Get names of available electronics under $500
const result = products
  .filter(p => p.category === 'electronics')  // Only electronics
  .filter(p => p.inStock)                      // Only in stock
  .filter(p => p.price < 500)                  // Only affordable
  .map(p => p.name);                           // Get just names

console.log(result); // ['Mouse', 'Keyboard']

// Real-world example: Processing API data
const apiResponse = [
  { id: 1, name: 'John Doe', score: 85, active: true },
  { id: 2, name: 'Jane Smith', score: 92, active: true },
  { id: 3, name: 'Bob Johnson', score: 78, active: false },
  { id: 4, name: 'Alice Brown', score: 95, active: true }
];

// Get top active users formatted for display
const topActiveUsers = apiResponse
  .filter(user => user.active)                    // Only active
  .filter(user => user.score >= 90)               // High performers
  .sort((a, b) => b.score - a.score)              // Sort by score
  .map(user => ({                                 // Transform data
    displayName: user.name,
    grade: user.score >= 95 ? 'A+' : 'A'
  }));

console.log(topActiveUsers);
// [{ displayName: 'Alice Brown', grade: 'A+' },
//  { displayName: 'Jane Smith', grade: 'A' }]

// Performance consideration:
// Less efficient (multiple iterations)
const result1 = products
  .filter(p => p.inStock)
  .filter(p => p.price < 100)
  .map(p => p.name);

// More efficient (single filter)
const result2 = products
  .filter(p => p.inStock && p.price < 100)
  .map(p => p.name);