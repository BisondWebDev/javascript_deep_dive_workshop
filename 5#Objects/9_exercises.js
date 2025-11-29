// Exercise 1: User Profile Manager
const users = {
  user1: { name: 'Alice', email: 'alice@test.com', role: 'admin', active: true },
  user2: { name: 'Bob', email: 'bob@test.com', role: 'user', active: false },
  user3: { name: 'Charlie', email: 'charlie@test.com', role: 'user', active: true }
};

// TODO: Create functions that:
// 1. Get all active users as an array of objects
// 2. Update a user's email by userId (immutably)
// 3. Add a new user with auto-generated userId

function getActiveUsers(users) {
  // Your code here
}

function updateUserEmail(users, userId, newEmail) {
  // Your code here - return new users object
}

function addUser(users, userData) {
  // Your code here - return new users object with new user
}

console.log(getActiveUsers(users));
// Expected: [{ name: 'Alice', ... }, { name: 'Charlie', ... }]

// Exercise 2: Config Merger
const defaultConfig = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  ui: {
    theme: 'light',
    language: 'en',
    sidebar: {
      visible: true,
      width: 250
    }
  }
};

const userConfig = {
  api: {
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer token123'
    }
  },
  ui: {
    theme: 'dark',
    sidebar: {
      width: 300
    }
  }
};

// TODO: Create a function that deep merges configs
// User config should override defaults, but preserve unspecified defaults

function deepMerge(defaults, overrides) {
  // Your code here
}

console.log(deepMerge(defaultConfig, userConfig));
// Expected: merged config with all properties preserved

// Exercise 3: Data Transformer
const apiResponse = [
  { id: 1, first_name: 'Alice', last_name: 'Smith', created_at: '2024-01-15' },
  { id: 2, first_name: 'Bob', last_name: 'Johnson', created_at: '2024-02-20' },
  { id: 3, first_name: 'Charlie', last_name: 'Brown', created_at: '2024-03-10' }
];

// TODO: Transform the API response to:
// 1. Convert snake_case keys to camelCase
// 2. Add a fullName property
// 3. Return as object keyed by id

function transformUsers(users) {
  // Your code here
}

console.log(transformUsers(apiResponse));
/* Expected:
{
  1: { id: 1, firstName: 'Alice', lastName: 'Smith', createdAt: '2024-01-15', fullName: 'Alice Smith' },
  2: { id: 2, firstName: 'Bob', lastName: 'Johnson', createdAt: '2024-02-20', fullName: 'Bob Johnson' },
  3: { id: 3, firstName: 'Charlie', lastName: 'Brown', createdAt: '2024-03-10', fullName: 'Charlie Brown' }
}
*/