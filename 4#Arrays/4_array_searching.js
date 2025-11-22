// --- Section 1: includes() - Check if value exists ---
const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

// Case-sensitive!
console.log(fruits.includes('Apple')); // false

// Works with fromIndex parameter
console.log(fruits.includes('apple', 1)); // false (starts from index 1)

// Corner cases with includes()
// NaN handling
console.log([1, 2, NaN].includes(NaN)); // true

// Object references (not deep equality)
const obj1 = { id: 1 };
const obj2 = { id: 1 };
console.log([obj1].includes(obj2)); // false (different references)
console.log([obj1].includes(obj1)); // true (same reference)

// ---  Section 2: indexOf() - Get position of element
const colors = ['red', 'blue', 'green', 'blue'];

console.log(colors.indexOf('blue')); // 1 (first occurrence)
console.log(colors.indexOf('yellow')); // -1 (not found)

// Find from specific index
console.log(colors.indexOf('blue', 2)); // 3 (starts from index 2)

// Common pattern: check if exists
if (colors.indexOf('red') !== -1) {
  console.log('Red exists!');
}

// Modern alternative: includes()
if (colors.includes('red')) {
  console.log('Red exists!'); // Cleaner!
}

// ---  Section 3: findIndex() - Find position with condition
const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 }
];

// Find index of first product over $50
const index = products.findIndex(p => p.price > 50);
console.log(index); // 0 (Laptop)

// Not found returns -1
const notFound = products.findIndex(p => p.price > 5000);
console.log(notFound); // -1

// Real-world example: Updating item in array
function updateProduct(id, updates) {
  const index = products.findIndex(p => p.id === id);
  
  if (index !== -1) {
    // Found it - update the product
    products[index] = { ...products[index], ...updates };
  } else {
    console.log('Product not found');
  }
}

updateProduct(2, { price: 29.99 });
console.log(products[1]); // { id: 2, name: 'Mouse', price: 29.99 }