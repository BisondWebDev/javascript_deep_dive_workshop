// --- Section 1: Dot Notation vs Bracket Notation
const user = {
  name: 'Alice',
  age: 28,
  'job-title': 'Senior Developer',  // Property with hyphen
  '123': 'numeric key',             // Numeric string key
  'has spaces': true                // Property with spaces
};

// Dot notation - cleaner, preferred when possible
console.log(user.name); // 'Alice'
console.log(user.age);  // 28

// Bracket notation - required for special characters
console.log(user['job-title']);  // 'Senior Developer'
console.log(user['123']);        // 'numeric key'
console.log(user['has spaces']); // true

// Dot notation fails with special characters
// console.log(user.job-title);  // SyntaxError!
// console.log(user.123);        // SyntaxError!

// --- Section 2: Dynamic Property Access
const user1 = {
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@example.com'
};

// Access property using variable
const field = 'email';
console.log(user1[field]); // 'alice@example.com'

// Common mistake - dot notation doesn't work with variables
console.log(user1.field); // undefined (looks for literal 'field' property)

// Iterating over specific fields
const fieldsToDisplay = ['firstName', 'email'];
fieldsToDisplay.forEach(field => {
  console.log(`${field}: ${user1[field]}`);
});
// firstName: Alice
// email: alice@example.com

// Real-world example: Form field validation
const formData = {
  username: 'alice123',
  email: 'alice@example.com',
  password: 'secret123'
};

const validationRules = {
  username: value => value.length >= 3,
  email: value => value.includes('@'),
  password: value => value.length >= 8
};

function validateForm(data, rules) {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const isValid = rules[field](value);
    
    if (!isValid) {
      errors[field] = `${field} is invalid`;
    }
  });
  
  return errors;
}

console.log(validateForm(formData, validationRules));
// { password: 'password is invalid' }

// --- Section 3: Safe Property Access
const profile = {
  name: 'Alice',
  address: {
    city: 'New York'
  }
};

// Corner case: Accessing nested properties that might not exist
console.log(profile.address.city);    // 'New York'
console.log(profile.contact.phone); // TypeError: Cannot read property 'phone' of undefined

// Safe access with optional chaining (?.)
console.log(profile.contact?.phone);           // undefined (no error)
console.log(profile.address?.zipCode);         // undefined (no error)
console.log(profile.preferences?.theme?.color); // undefined (no error)

// Combining with nullish coalescing (??) for defaults
const theme = profile.preferences?.theme ?? 'light';
console.log(theme); // 'light'

// Corner case: Optional chaining with method calls
const result = profile.getName?.(); // undefined if getName doesn't exist

// --- Section 4: Checking Property Existence
const newUser = {
  name: 'Alice',
  age: 0,
  active: false,
  nickname: undefined
};

// Method 1: 'in' operator (checks own + inherited properties)
console.log('name' in newUser);     // true
console.log('email' in newUser);    // false
console.log('toString' in newUser); // true (inherited)

// Method 2: hasOwnProperty (only own properties)
console.log(newUser.hasOwnProperty('name'));     // true
console.log(newUser.hasOwnProperty('toString')); // false

// Method 3: Modern - Object.hasOwn() (ES2022)
console.log(Object.hasOwn(newUser, 'name'));     // true
console.log(Object.hasOwn(newUser, 'toString')); // false

// Corner case: Falsy values
// Don't use truthiness to check existence!
if (newUser.age) {
  console.log('Has age'); // Won't run! age is 0 (falsy)
}

if ('age' in newUser) {
  console.log('Has age'); // Correct! Runs even if age is 0
}

// Corner case: undefined values
console.log(newUser.nickname);              // undefined
console.log('nickname' in newUser);         // true (property exists)
console.log(newUser.nonexistent);           // undefined
console.log('nonexistent' in newUser);      // false (property doesn't exist)

/* 
  Exercise (2 min):
  Given an object, write a function that takes a property name as a string and
  returns the value safely (return "N/A" if property doesn't exist).
*/