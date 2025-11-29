// --- Solution 1: User Profile Manager
const users = {
  user1: { name: 'Alice', email: 'alice@test.com', role: 'admin', active: true },
  user2: { name: 'Bob', email: 'bob@test.com', role: 'user', active: false },
  user3: { name: 'Charlie', email: 'charlie@test.com', role: 'user', active: true }
};

// 1. Get all active users as an array
function getActiveUsers(users) {
  return Object.entries(users)
    .filter(([userId, userData]) => userData.active)
    .map(([userId, userData]) => ({ userId, ...userData }));
}

console.log(getActiveUsers(users));
/* Output:
[
  { userId: 'user1', name: 'Alice', email: 'alice@test.com', role: 'admin', active: true },
  { userId: 'user3', name: 'Charlie', email: 'charlie@test.com', role: 'user', active: true }
]
*/

// 2. Update a user's email immutably
function updateUserEmail(users, userId, newEmail) {
  // Check if user exists
  if (!users[userId]) {
    console.error(`User ${userId} not found`);
    return users;
  }
  
  return {
    ...users,
    [userId]: {
      ...users[userId],
      email: newEmail
    }
  };
}

const updatedUsers = updateUserEmail(users, 'user2', 'bob.new@test.com');
console.log(updatedUsers.user2.email); // 'bob.new@test.com'
console.log(users.user2.email);        // 'bob@test.com' (original unchanged)

// 3. Add a new user with auto-generated userId
function addUser(users, userData) {
  // Find the highest user number
  const userIds = Object.keys(users);
  const userNumbers = userIds.map(id => parseInt(id.replace('user', '')));
  const maxNumber = Math.max(...userNumbers, 0);
  const newUserId = `user${maxNumber + 1}`;
  
  return {
    ...users,
    [newUserId]: {
      active: true,  // Default to active
      role: 'user',  // Default role
      ...userData    // Override with provided data
    }
  };
}

const withNewUser = addUser(users, {
  name: 'Diana',
  email: 'diana@test.com'
});

console.log(withNewUser);

// --- Solution 2: Config Merger
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

function deepMerge(defaults, overrides) {
  // Handle null or undefined
  if (overrides === null || overrides === undefined) {
    return defaults;
  }
  
  if (defaults === null || defaults === undefined) {
    return overrides;
  }
  
  // If overrides is not an object, return it (it replaces the default)
  if (typeof overrides !== 'object' || Array.isArray(overrides)) {
    return overrides;
  }
  
  // Start with a copy of defaults
  const result = { ...defaults };
  
  // Iterate over override properties
  for (const key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      // If the property exists in defaults and both are objects, merge recursively
      if (
        key in defaults &&
        typeof defaults[key] === 'object' &&
        defaults[key] !== null &&
        !Array.isArray(defaults[key]) &&
        typeof overrides[key] === 'object' &&
        overrides[key] !== null &&
        !Array.isArray(overrides[key])
      ) {
        result[key] = deepMerge(defaults[key], overrides[key]);
      } else {
        // Otherwise, use the override value
        result[key] = overrides[key];
      }
    }
  }
  
  return result;
}

const mergedConfig = deepMerge(defaultConfig, userConfig);
console.log(JSON.stringify(mergedConfig, null, 2));

// --- Solution 3: Data Transformer
const apiResponse = [
  { id: 1, first_name: 'Alice', last_name: 'Smith', created_at: '2024-01-15' },
  { id: 2, first_name: 'Bob', last_name: 'Johnson', created_at: '2024-02-20' },
  { id: 3, first_name: 'Charlie', last_name: 'Brown', created_at: '2024-03-10' }
];

// Helper function: Convert snake_case to camelCase
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

// Main transformation function
function transformUsers(users) {
  return users.reduce((acc, user) => {
    // Convert all keys from snake_case to camelCase
    const transformedUser = Object.entries(user).reduce((userAcc, [key, value]) => {
      const camelKey = snakeToCamel(key);
      userAcc[camelKey] = value;
      return userAcc;
    }, {});
    
    // Add fullName property
    transformedUser.fullName = `${transformedUser.firstName} ${transformedUser.lastName}`;
    
    // Use id as the key
    acc[transformedUser.id] = transformedUser;
    
    return acc;
  }, {});
}

const transformed = transformUsers(apiResponse);
console.log(JSON.stringify(transformed, null, 2));
