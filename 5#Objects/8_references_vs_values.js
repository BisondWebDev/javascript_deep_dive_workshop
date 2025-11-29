// --- section 1: Understanding References
// Primitives are copied by value
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Objects are copied by reference
let obj1 = { count: 10 };
let obj2 = obj1;  // obj2 points to same object
obj2.count = 20;
console.log(obj1.count); // 20 (changed!)

// They reference the same object
console.log(obj1 === obj2); // true

// Comparison Gotchas
const person1 = { name: "Alice", age: 25 };
const person2 = { name: "Alice", age: 25 };
const person3 = person1;

console.log(person1 === person2); // false (different objects)
console.log(person1 === person3); // true (same reference)

// To compare object contents, compare properties
function objectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => obj1[key] === obj2[key]);
}

console.log(objectsEqual(person1, person2)); // true

// --- Section 2: Function Parameters
function updatePrimitive(num) {
  num = 100;
}

function updateObject(obj) {
  obj.value = 100;
}

function replaceObject(obj) {
  obj = { value: 100 }; // Creates new object, doesn't affect original
}

let number = 10;
let object = { value: 10 };

updatePrimitive(number);
console.log(number); // 10 (unchanged)

updateObject(object);
console.log(object.value); // 100 (changed!)

let anotherObject = { value: 10 };
replaceObject(anotherObject);
console.log(anotherObject.value); // 10 (unchanged - reassignment doesn't affect original)

// Corner Case 1: Arrays and objects in comparisons
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

console.log(arr1 === arr2); // false (different references)
console.log([] === []);     // false
console.log({} === {});     // false

// This can cause bugs!
const cache = [];

function addToCache(item) {
  if (cache.includes(item)) {  // This checks by reference!
    return "Already in cache";
  }
  cache.push(item);
  return "Added to cache";
}

const obj = { id: 1 };
console.log(addToCache(obj));  // "Added to cache"
console.log(addToCache(obj));  // "Already in cache" (same reference)
console.log(addToCache({ id: 1 })); // "Added to cache" (different object!)

// --- Section 3: Creating True Copies
const original = {
  name: "Test",
  data: {
    value: 42
  }
};

// Shallow copy - nested objects still referenced
const shallowCopy = { ...original };
shallowCopy.data.value = 100;
console.log(original.data.value); // 100 (affected!)

// Deep copy (simple approach - has limitations)
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.data.value = 200;
console.log(original.data.value); // 100 (not affected!)

// JSON method limitations
const problematic = {
  date: new Date(),
  func: () => "hello",
  undef: undefined,
  symbol: Symbol("id")
};

const copied = JSON.parse(JSON.stringify(problematic));
console.log(copied);
// {
//   date: "2024-01-15T12:00:00.000Z" (string, not Date!)
//   // func is missing
//   // undef is missing
//   // symbol is missing
// }

// Modern Deep Copy with structuredClone() (ES2022)
// structuredClone() - the modern way to deep copy!
const complexObject = {
  name: "User",
  created: new Date(),
  settings: {
    theme: "dark",
    notifications: {
      email: true,
      push: false
    }
  },
  tags: ["admin", "premium"],
  metadata: new Map([
    ["lastLogin", "2024-01-15"],
    ["loginCount", 42]
  ]),
  avatar: new Uint8Array([1, 2, 3, 4])
};

// Create a true deep copy
const cloned = structuredClone(complexObject);

// Modify nested values
cloned.settings.notifications.email = false;
cloned.tags.push("vip");
cloned.created.setFullYear(2025);

// Original is completely unaffected
console.log(original.settings.notifications.email); // true (unchanged)
console.log(original.tags);                         // ["admin", "premium"] (unchanged)
console.log(original.created.getFullYear());        // 2024 (unchanged)

// Date objects are preserved correctly
console.log(cloned.created instanceof Date);  // true (still a Date!)
console.log(original.created === cloned.created); // false (different objects)

// Maps, Sets, and typed arrays are also cloned
console.log(cloned.metadata instanceof Map); // true
console.log(cloned.metadata === complexObject.metadata); // false

// Browser Support Note
// structuredClone is supported in modern browsers (2022+)
// For older environments, you might need a polyfill or fallback

function safeDeepClone(obj) {
  // Check if structuredClone is available
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  
  // Fallback to JSON method for older browsers
  console.warn('structuredClone not available, using JSON fallback');
  return JSON.parse(JSON.stringify(obj));
}

const clone = safeDeepClone(complexObject);