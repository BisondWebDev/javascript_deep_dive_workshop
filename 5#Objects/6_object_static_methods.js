// --- Section 1: Object.keys()
const inventory = {
  apples: 50,
  oranges: 30,
  bananas: 25,
  grapes: 40
};

// Get array of property names
const items = Object.keys(inventory);
console.log(items); // ["apples", "oranges", "bananas", "grapes"]

// Now we can iterate (we learned arrays before!)
items.forEach(item => {
  console.log(`${item}: ${inventory[item]}`);
});

// Corner Case 1: Inherited properties
const parent = { inherited: "parent value" };
const child = Object.create(parent);
child.own = "child value";

console.log(child.inherited); // "parent value" (accessible)
console.log(child.own);       // "child value"

// Object.keys only returns own properties
console.log(Object.keys(child)); // ["own"]

// To check for all properties (including inherited)
console.log("inherited" in child); // true
console.log(child.hasOwnProperty("inherited")); // false
console.log(child.hasOwnProperty("own")); // true

// --- Section 2: Object.values()
const scores = {
  math: 85,
  english: 92,
  science: 78,
  history: 88
};

// Get array of values
const allScores = Object.values(scores);
console.log(allScores); // [85, 92, 78, 88]

// Calculate average
const average = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
console.log(average); // 85.75

// --- Section 3: Object.entries()
const userData = {
  username: "alice123",
  email: "alice@example.com",
  role: "admin"
};

// Get array of [key, value] pairs
const entries = Object.entries(userData);
console.log(entries);
// [
//   ["username", "alice123"],
//   ["email", "alice@example.com"],
//   ["role", "admin"]
// ]

// Destructure in loop
entries.forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Practical Use Case: Converting objects
// Object to query string
const params = {
  search: "javascript",
  category: "books",
  limit: 10
};

const queryString = Object.entries(params)
  .map(([key, value]) => `${key}=${value}`)
  .join("&");

console.log(queryString); // "search=javascript&category=books&limit=10"

// --- Section 4: Object.assign()
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

// Merge source objects into target
const result = Object.assign(target, source1, source2);

console.log(result); // { a: 1, b: 3, c: 5, d: 6 }
console.log(target); // { a: 1, b: 3, c: 5, d: 6 } - target is modified!

// Use empty object to avoid modifying target
const merged = Object.assign({}, target, source1, source2);

// Modern alternative: spread operator (preferred)
const merged2 = { ...target, ...source1, ...source2 };


// Corner Case 2: Symbol properties
const sym = Symbol("id");

const obj = {
  name: "Test",
  [sym]: 123
};

console.log(Object.keys(obj));    // ["name"] - no symbols
console.log(Object.values(obj));  // ["Test"] - no symbols
console.log(Object.entries(obj)); // [["name", "Test"]] - no symbols

// To get symbols
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(id)]

// --- Section 5: Object.freeze() and Object.seal()
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// Freeze - cannot add, delete, or modify properties
Object.freeze(config);

config.timeout = 10000;      // Ignored (strict mode: TypeError)
config.newProp = "value";    // Ignored (strict mode: TypeError)
delete config.apiUrl;        // Ignored (strict mode: TypeError)

console.log(config.timeout); // 5000 (unchanged)

// Check if frozen
console.log(Object.isFrozen(config)); // true

const settings = {
  theme: "dark"
};

// Seal - can modify existing, but cannot add/delete
Object.seal(settings);

settings.theme = "light";    // Works!
settings.newProp = "value";  // Ignored (strict mode: TypeError)
delete settings.theme;       // Ignored (strict mode: TypeError)

console.log(settings.theme); // "light" (modified)
console.log(Object.isSealed(settings)); // true

//Corner Case 3: Shallow freeze
const data = {
  name: "Test",
  nested: {
    value: 42
  }
};

Object.freeze(data);

data.name = "Changed";           // Ignored
data.nested.value = 100;         // Works! Nested object not frozen

console.log(data.nested.value);  // 100 (changed)

// Deep freeze requires recursive freezing
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach(value => {
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  });
}

/*
Exercise (3 min):
Given an object with product names as keys and prices as values, write a function
that returns the name of the most expensive product using Object.entries().
*/