// --- Section 1: Basic array destructuring
const colors = ['red', 'green', 'blue'];

// Extract into variables
const [first, second, third] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'
console.log(third);  // 'blue'

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary);  // 'red'
console.log(tertiary); // 'blue'

// Default values
const [a, b, c, d = 'yellow'] = colors;
console.log(d); // 'yellow' (default used)

// Real-world example: API response handling
// API returns [error, data] tuple
function fetchUser(id) {
  if (id === 1) {
    return [null, { id: 1, name: 'John' }];
  }
  return ['User not found', null];
}

const [error, userData] = fetchUser(1);

if (error) {
  console.log('Error:', error);
} else {
  console.log('User:', userData.name);
}

// --- Section 2: Rest pattern in destructuring
const numbers = [1, 2, 3, 4, 5];

// Get first and rest
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Get first, second, and rest
const [firstEl, secondEl, ...remaining] = numbers;
console.log(firstEl);     // 1
console.log(secondEl);    // 2
console.log(remaining); // [3, 4, 5]

// Real-world example: Pagination
const allItems = ['item1', 'item2', 'item3', 'item4', 'item5'];

// Get first page and remaining
const [firstItem, secondItem, ...nextPage] = allItems;

console.log('Current page:', [firstItem, secondItem]);
console.log('Next page:', nextPage);

// --- Section 3: Swapping variables
let x = 1;
let y = 2;

// ❌ Old way
let temp = x;
x = y;
y = temp;

// ✅ Modern way with destructuring
[x, y] = [y, x];
console.log(x); // 2
console.log(y); // 1

// Section 4: Nested array destructuring
const nested = [1, [2, 3], 4];

const [firstElement, [secondElement, thirdElement], fourthElement] = nested;
console.log(secondElement); // 2
console.log(thirdElement);  // 3

// Real-world example: Coordinates
const coordinates = [
  [40.7128, -74.0060], // New York
  [51.5074, -0.1278],  // London
  [35.6762, 139.6503]  // Tokyo
];

// Extract latitude and longitude
coordinates.forEach(([lat, lng]) => {
  console.log(`Latitude: ${lat}, Longitude: ${lng}`);
});