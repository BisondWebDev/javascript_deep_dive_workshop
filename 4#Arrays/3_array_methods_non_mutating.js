// Methods that return NEW arrays (original unchanged)
// These are your bread and butter for modern JavaScript and React development.

// --- Section 1:  map() - Transform every element ---
const prices = [10, 20, 30];

// Add tax to each price
const withTax = prices.map(price => price * 1.2);
console.log(prices); // [10, 20, 30] - original unchanged
console.log(withTax); // [12, 24, 36]

// Map with index
const numbered = ['a', 'b', 'c'].map((letter, index) => {
  return `${index + 1}. ${letter}`;
});
console.log(numbered); // ['1. a', '2. b', '3. c']

// Real-world example with map(): Formatting user data for display
const users = [
  { firstName: 'John', lastName: 'Doe', age: 28 },
  { firstName: 'Jane', lastName: 'Smith', age: 34 }
];

// Create display names
const displayNames = users.map(user => `${user.firstName} ${user.lastName}`);
console.log(displayNames); // ['John Doe', 'Jane Smith']

// Transform for dropdown options
const options = users.map(user => ({
  value: user.firstName.toLowerCase(),
  label: `${user.firstName} ${user.lastName} (${user.age})`
}));
console.log(options);
// [{ value: 'john', label: 'John Doe (28)' }, ...]

// --- Section 2:  filter() - Keep only what you need ---
const numbers = [1, 2, 3, 4, 5, 6];

// Get even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]

// Filter with multiple conditions
const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true }
];

const available = products.filter(p => p.inStock && p.price < 500);
console.log(available); // [{ name: 'Keyboard', ... }]

// Real-world example with filter(): Search functionality
const searchTerm = 'lap';
const searchResults = products.filter(product => 
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);
console.log(searchResults); // [{ name: 'Laptop', ... }]

// Corner case: Empty filter results
const expensive = products.filter(p => p.price > 2000);
console.log(expensive); // [] - empty array, not null
console.log(expensive.length); // 0 - safe to check


// --- section 3:  find() - Get the first match ---
const listUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const listUser = listUsers.find(u => u.id === 2);
console.log(listUser); // { id: 2, name: 'Bob' }

// Corner case: No match found
const notFound = listUsers.find(u => u.id === 999);
console.log(notFound); // undefined

// Safe usage with optional chaining
console.log(notFound?.name); // undefined (no error)

// Real-world example with find(): Finding active user session
const sessions = [
  { userId: 1, active: false },
  { userId: 2, active: true },
  { userId: 3, active: false }
];

const activeSession = sessions.find(s => s.active);
if (activeSession) {
  console.log(`User ${activeSession.userId} is active`);
} else {
  console.log('No active sessions');
}

// --- Section 4 reduce() - The most powerful (and tricky) method
// Sum all numbers
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// Build an object from array
const votes = ['yes', 'no', 'yes', 'yes', 'no'];
const tally = votes.reduce((acc, vote) => {
  acc[vote] = (acc[vote] || 0) + 1;
  return acc;
}, {});
console.log(tally); // { yes: 3, no: 2 }

// Real-world example with reduce(): Shopping cart total
const cart = [
  { name: 'Laptop', price: 999, quantity: 1 },
  { name: 'Mouse', price: 25, quantity: 2 },
  { name: 'Keyboard', price: 75, quantity: 1 }
];

const total = cart.reduce((sum, item) => {
  return sum + (item.price * item.quantity);
}, 0);
console.log(total); // 1124

// Group products by price range
const grouped = cart.reduce((groups, item) => {
  const range = item.price > 100 ? 'expensive' : 'affordable';
  if (!groups[range]) {
    groups[range] = [];
  }
  groups[range].push(item);
  return groups;
}, {});
console.log(grouped);

// Corner case with reduce(): Empty array with no initial value
// This will throw an error!
// [].reduce((a, b) => a + b); // TypeError

// Always provide initial value for safety
const safeSum = [].reduce((a, b) => a + b, 0); // 0

// --- Section 5: forEach() - Side effects only ---
const tasks = ['Task 1', 'Task 2', 'Task 3'];

// forEach doesn't return anything useful
const result = tasks.forEach(task => console.log(task));
console.log(result); // undefined

// Use for side effects only
const logs = [];
tasks.forEach((task, index) => {
  logs.push(`${index}: ${task}`);
});
console.log(logs); // ['0: Task 1', '1: Task 2', '2: Task 3']

// When to use forEach() vs map():
// ❌ Don't do this (use map instead)
const doubled = [];
[1, 2, 3].forEach(num => doubled.push(num * 2));

// ✅ Do this
const doubledSec = [1, 2, 3].map(num => num * 2);

// ✅ forEach is good for DOM manipulation
const elements = document.querySelectorAll('.item');
elements.forEach(el => el.classList.add('active'));