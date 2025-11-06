// Functions as First-Class Citizens
function processArray(arr, callback) {
  const results = [];
  for (let item of arr) {
    results.push(callback(item));
  }
  return results;
}

const numbers = [1, 2, 3, 4];
const multiplyByTwo = num => num * 2;
const doubled = processArray(numbers, multiplyByTwo);

console.log(doubled); // [2, 4, 6, 8]

// Common Patterns with Callbacks
// Array Methods
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

// map: Transform each element
const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']

// filter: Keep elements that pass a test
const over30 = users.filter(user => user.age > 30);
console.log(over30); // [{ name: 'Charlie', age: 35 }]

// find: Get first element that matches
const bob = users.find(user => user.name === 'Bob');
console.log(bob); // { name: 'Bob', age: 30 }

// reduce: Accumulate to a single value
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 90

// Asynchronous Callbacks
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'Sample Data' };
    callback(data);
  }, 1000);
}

console.log('Starting...');
fetchData(data => {
  console.log('Data received:', data);
});
console.log('Request sent!');

// Output:
// Starting...
// Request sent!
// (1 second later)
// Data received: { id: 1, name: 'Sample Data' }

// Callback Hell
// Avoid this pattern (callback hell/pyramid of doom)
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c);
    });
  });
});

// Modern alternative: Promises/async-await