// --- Section 1: Basic Destructuring
const user = {
  name: 'Alice',
  age: 28,
  role: 'Developer',
  city: 'New York'
};

// Extract specific properties
const { name, age } = user;
console.log(name); // 'Alice'
console.log(age);  // 28

// --- Section 2: Renaming Variables
const apiResponse = {
  user_name: 'alice123',      // API uses snake_case
  user_email: 'alice@test.com',
  created_at: '2024-01-15'
};

// Rename to camelCase while destructuring
const { 
  user_name: userName, 
  user_email: userEmail, 
  created_at: createdAt 
} = apiResponse;

console.log(userName);  // 'alice123'
console.log(userEmail); // 'alice@test.com'
console.log(createdAt); // '2024-01-15'

// --- Section 3: Default Values
const config = {
  theme: 'dark',
  language: 'en'
};

// With defaults for missing properties
const { 
  theme, 
  language, 
  fontSize = 16,        // Default when missing
  showSidebar = true    // Default when missing
} = config;

console.log(theme);       // 'dark' (from object)
console.log(fontSize);    // 16 (default)
console.log(showSidebar); // true (default)

// Corner case 1: Default only applies to undefined, not null
const settings = { volume: null };
const { volume = 50 } = settings;
console.log(volume); // null (NOT 50, because null !== undefined)

// --- Section 4: Nested Destructuring
const employee = {
  id: 101,
  firstName: "Tom",
  contact: {
    email: "tom@company.com",
    phone: "555-0100",
    address: {
      city: "Boston",
      country: "USA"
    }
  }
};

// Extract nested properties
const {
  firstName,
  contact: {
    email,
    address: { city }
  }
} = employee;

console.log(firstName);  // "Tom"
console.log(email); // "tom@company.com"
console.log(city);  // "Boston"

// Note: contact and address variables are NOT created
console.log(contact); // ReferenceError!

// Corner Case 2: Destructuring with existing variables
let title = "Original";
let author = "Original Author";

const book = {
  title: "JavaScript Guide",
  author: "Jane Doe",
  year: 2024
};

// Must use parentheses when destructuring into existing variables
({ title, author } = book);

console.log(title);  // "JavaScript Guide"
console.log(author); // "Jane Doe"

// Without parentheses, it's a syntax error:
// { title, author } = book; // SyntaxError!

// --- Section 5: Function Parameter Destructuring

// Old way
function createUser(options) {
  const name = options.name;
  const age = options.age || 18;
  const role = options.role || 'user';
  // ...
}

// Modern way - Destructure in function parameters
function displayUser({ name, email, age = "N/A" }) {
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Age: ${age}`);
}

const person = { name: "Sarah", email: "sarah@example.com" };
displayUser(person); // Age will be "N/A"

// Corner Case 3: Destructuring undefined or null
// This will throw an error
const { nam1 } = undefined; // TypeError!
const { name2 } = null;      // TypeError!

// Safe destructuring with default
const { username } = undefined || {};     // No error, name is undefined
const { useremail } = null || {};         // No error, email is undefined

// Or provide default object
function greet({ username = "Guest" } = {}) {
  console.log(`Hello, ${username}!`);
}

greet();                    // "Hello, Guest!"
greet({});                  // "Hello, Guest!"
greet({ username: "Alice" });   // "Hello, Alice!"

// --- Section 6: Rest Pattern with Objects
const testUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  password: 'secret123',
  role: 'admin'
};

// Extract some properties, collect the rest
const { password, ...safeUser } = testUser;

console.log(password); // 'secret123'
console.log(safeUser); // { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' }
// Great for removing sensitive data before sending to client!

/*
  Exercise (2 min):
  Write a function that takes a product object and destructures its name, price, and
  category (with default "General") from the parameters. 
*/