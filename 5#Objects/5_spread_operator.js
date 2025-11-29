// --- Section 1: Copying Objects
const original = { name: 'Alice', age: 28 };

// ❌ This doesn't copy - it creates a reference
const wrong = original;
wrong.age = 30;
console.log(original.age); // 30 - Original changed!

// ✅ Spread creates a shallow copy
const copy = { ...original };
copy.age = 25;
console.log(original.age); // 28 - Original unchanged
console.log(copy.age);     // 25

// --- Section 2: Adding/Overriding Properties
const product = {
  id: 1,
  name: "Laptop",
  price: 999
};

// Add new properties
const productWithDiscount = {
  ...product,
  discount: 0.1,
  finalPrice: product.price * 0.9
};

// Override specific properties
const updatedProduct = {
  ...product,
  price: 899,
  inStock: true
};

console.log(updatedProduct);
// { id: 1, name: "Laptop", price: 899, inStock: true }

// Corner case 1: Shallow copy only
const user = {
  name: 'Alice',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

const copy = { ...user };
copy.name = 'Bob';           // Safe - primitive
copy.address.city = 'Boston'; // Modifies original!

console.log(user.name);         // 'Alice' - unchanged
console.log(user.address.city); // 'Boston' - CHANGED!

// Solution: Deep copy nested objects manually
const deepCopy = {
  ...user,
  address: { ...user.address }
};

// Or use structuredClone (modern browsers)
const trueDeepCopy = structuredClone(user);

// --- Section 3: Merging Objects
const defaults = {
  theme: 'light',
  fontSize: 14,
  showSidebar: true
};

const userPrefs = {
  theme: 'dark',
  fontSize: 16
};

// Later properties override earlier ones
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: 'dark', fontSize: 16, showSidebar: true }

// Corner Case 2:  Order matters!
const reversed = { ...userPrefs, ...defaults };
console.log(reversed);
// { theme: 'light', fontSize: 14, showSidebar: true } - defaults won!

// --- Section 3: Conditional Properties
const includeExtra = true;

const config = {
  host: "localhost",
  port: 3000,
  ...(includeExtra && { 
    timeout: 5000,
    retries: 3 
  })
};

console.log(config);
// If includeExtra is true: { host: "localhost", port: 3000, timeout: 5000, retries: 3 }
// If includeExtra is false: { host: "localhost", port: 3000 }

// Corner Case 3: Spreading non-objects
const obj1 = { ...null };       // {} (ignored)
const obj2 = { ...undefined };  // {} (ignored)
const obj3 = { ...42 };         // {} (primitives ignored)
const obj4 = { ..."hello" };    // { 0: "h", 1: "e", 2: "l", 3: "l", 4: "o" }
const obj5 = { ...[1, 2, 3] };  // { 0: 1, 1: 2, 2: 3 }

/*
  Exercise (2 min):
  Create a function that takes two objects and merges them, but only includes
  properties from the second object if they don't exist in the first.
 */