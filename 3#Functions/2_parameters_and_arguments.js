// Default Parameters
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('Alice')); // "Hello, Alice!"
console.log(greet('Bob', 'Hi')); // "Hi, Bob!"

// Corner Case: undefined vs Other Falsy Values
function createUser(name = 'Anonymous', age = 18) {
  return { name, age };
}

console.log(createUser(undefined, undefined)); // { name: 'Anonymous', age: 18 }
console.log(createUser(null, 0)); // { name: null, age: 0 }

// Only `undefined` triggers defaults!
console.log(createUser('', 0)); // { name: '', age: 0 }

// Defaults Can Reference Previous Parameters
function makeFullName(firstName = 'John', lastName = firstName.toUpperCase()) {
  return `${firstName} ${lastName}`;
}

console.log(makeFullName('Alice')); // "Alice ALICE"
console.log(makeFullName('Bob', 'Smith')); // "Bob Smith"

// Defaults Are Evaluated at Call Time
let counter = 0;

function addToCount(value = counter++) {
  return value;
}

console.log(addToCount()); // 0
console.log(addToCount()); // 1 (counter incremented!)
console.log(addToCount()); // 2
console.log(addToCount(10)); // 10 (counter not incremented)

// Rest Parameters: Handling Variable Arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// The "arguments" Object (Legacy but Important to Know)
function oldSchoolSum() {
  console.log(arguments); // Array-like object
  console.log(Array.isArray(arguments)); // false 
  
  // Convert to real array
  const args = Array.from(arguments);
  return args.reduce((total, num) => total + num, 0);
}

console.log(oldSchoolSum(1, 2, 3, 4)); // 10

const arrowFunc = () => {
  console.log(arguments); // ReferenceError! Arrow functions don't have 'arguments'
};

arrowFunc(1, 2, 3); // Error!