// -- section 1: Literal Notation
// Simple object literal
const user = {
  name: 'Alice',
  age: 28,
  role: 'Developer'
};

// Object with various value types
const product = {
  id: 1,
  name: 'Laptop',
  price: 999.99,
  inStock: true,
  tags: ['electronics', 'computers'],
  specs: {
    ram: '16GB',
    storage: '512GB SSD'
  }
};

// Empty object - two ways
const empty1 = {};
const empty2 = new Object(); // Avoid this - literal is cleaner

// --- Section 2: Computed Property Names
// Dynamic property names using variables
const fieldName = 'email';
const fieldValue = 'alice@example.com';

const userOne = {
  name: 'Alice',
  [fieldName]: fieldValue  // email: 'alice@example.com'
};

console.log(userOne); // { name: 'Alice', email: 'alice@example.com' }

// Computed names with expressions
const prefix = 'user';
const config = {
  [`${prefix}Name`]: 'Alice',
  [`${prefix}Age`]: 28,
  [`${prefix}Active`]: true
};

console.log(config); // { userName: 'Alice', userAge: 28, userActive: true }

// Real-world example: Building form data dynamically
function createFormData(fields) {
  const formData = {};
  
  fields.forEach(field => {
    formData[field.name] = field.value;
  });
  
  return formData;
}

const fields = [
  { name: 'firstName', value: 'John' },
  { name: 'lastName', value: 'Doe' },
  { name: 'email', value: 'john@example.com' }
];

console.log(createFormData(fields));
// { firstName: 'John', lastName: 'Doe', email: 'john@example.com' }

// --- Section 3: Shorthand Property Names
// When variable name matches property name
const name = 'Alice';
const age = 28;
const role = 'Developer';

// Old way (repetitive)
const user1 = {
  name: name,
  age: age,
  role: role
};

// Modern shorthand
const user2 = { name, age, role };

console.log(user2); // { name: 'Alice', age: 28, role: 'Developer' }

/*
  Exercise (2 min):
  Create a Book object with properties: title, author, year, and isAvailable (boolean).
*/