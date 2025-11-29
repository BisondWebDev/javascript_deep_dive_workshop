# Objects

Welcome to the Objects section! Objects are the heart of JavaScript - nearly everything in JavaScript is an object or behaves like one. This section covers object fundamentals, modern syntax, and essential patterns.

## Overview

Objects allow you to organize data with key-value pairs and create complex data structures. You'll learn how to create, access, modify, and manipulate objects using modern JavaScript syntax. This section emphasizes practical patterns you'll use in real-world applications.

## Topics Covered

### Core Concepts

1. **Object Creation**
   - Literal notation (the preferred way)
   - Computed property names
   - Shorthand property names
   - Property name conventions

2. **Property Access**
   - Dot notation vs bracket notation
   - When to use each approach
   - Dynamic property access
   - Optional chaining (`?.`)
   - Nullish coalescing (`??`)

3. **Object Methods**
   - Adding methods to objects
   - Method shorthand syntax
   - The `this` keyword
   - Arrow functions vs regular functions in methods

4. **Object Destructuring**
   - Extracting properties
   - Renaming during destructuring
   - Default values
   - Rest properties
   - Nested destructuring

5. **Spread Operator**
   - Copying objects (shallow copy)
   - Merging objects
   - Overriding properties
   - Shallow vs deep copies

6. **Object Static Methods**
   - `Object.keys()`, `Object.values()`, `Object.entries()`
   - `Object.assign()`
   - `Object.freeze()`, `Object.seal()`
   - `Object.create()`
   - Practical use cases for each

7. **Nested Objects**
   - Working with deeply nested data
   - Safe property access
   - Updating nested properties immutably

8. **References vs Values**
   - How objects are stored in memory
   - Reference equality vs value equality
   - Shallow copy vs deep copy
   - Common gotchas with object references

## Files in This Section

- [1_object_creation.js](1_object_creation.js) - Creating objects with modern syntax
- [2_property_access.js](2_property_access.js) - Accessing and checking properties
- [3_object_methods.js](3_object_methods.js) - Methods and `this` binding
- [4_object_destructuring.js](4_object_destructuring.js) - Extracting object properties
- [5_spread_operator.js](5_spread_operator.js) - Spreading and copying objects
- [6_object_static_methods.js](6_object_static_methods.js) - Built-in Object methods
- [7_nested_objects.js](7_nested_objects.js) - Working with nested data
- [8_references_vs_values.js](8_references_vs_values.js) - Understanding object references
- [9_exercises.js](9_exercises.js) - Practice exercises
- [solutions.js](solutions.js) - Exercise solutions

## Key Concepts to Master

### Object Creation Patterns

**Literal Notation (Preferred):**
```javascript
const user = {
  name: 'Alice',
  age: 28,
  role: 'Developer'
};
```

**Computed Property Names:**
```javascript
const fieldName = 'email';
const user = {
  name: 'Alice',
  [fieldName]: 'alice@example.com' // Dynamic key
};
```

**Shorthand Properties:**
```javascript
const name = 'Alice';
const age = 28;
const user = { name, age }; // Same as { name: name, age: age }
```

**Method Shorthand:**
```javascript
const user = {
  name: 'Alice',
  // Old way
  greet: function() {
    return `Hello, ${this.name}`;
  },
  // Modern shorthand
  sayHi() {
    return `Hi, ${this.name}`;
  }
};
```

### Property Access

**Dot Notation:**
```javascript
user.name // Use when property name is known and valid identifier
```

**Bracket Notation:**
```javascript
user['name'] // Use for dynamic access or invalid identifiers
user[fieldName] // Variable as property name
user['first-name'] // Property with special characters
```

**Optional Chaining:**
```javascript
user?.address?.street // Returns undefined if any part is null/undefined
```

**Nullish Coalescing:**
```javascript
const displayName = user.name ?? 'Guest'; // Only uses default for null/undefined
```

### Object Destructuring

**Basic:**
```javascript
const { name, age } = user;
```

**Renaming:**
```javascript
const { name: userName, age: userAge } = user;
```

**Default Values:**
```javascript
const { name, role = 'User' } = user;
```

**Rest Properties:**
```javascript
const { name, ...otherProps } = user;
```

**Nested:**
```javascript
const { address: { street, city } } = user;
```

### Spread Operator

**Copy Object (Shallow):**
```javascript
const copy = { ...original };
```

**Merge Objects:**
```javascript
const merged = { ...obj1, ...obj2 }; // obj2 properties override obj1
```

**Add/Override Properties:**
```javascript
const updated = { ...user, age: 29, verified: true };
```

### Important Object Methods

**Keys, Values, Entries:**
```javascript
Object.keys(user)    // ['name', 'age', 'role']
Object.values(user)  // ['Alice', 28, 'Developer']
Object.entries(user) // [['name', 'Alice'], ['age', 28], ...]
```

**Assign (Merge):**
```javascript
Object.assign(target, source1, source2); // Mutates target
```

**Freeze (Make Immutable):**
```javascript
Object.freeze(user); // Cannot add/remove/modify properties
```

**Seal (No Add/Remove):**
```javascript
Object.seal(user); // Can modify, but can't add/remove properties
```

## Best Practices

**DO:**
- Use literal notation for object creation
- Use shorthand properties and methods
- Use optional chaining for safe property access
- Use destructuring for extracting multiple properties
- Prefer `const` for objects you won't reassign
- Use `Object.freeze()` for truly immutable objects

**DON'T:**
- Use `new Object()` - literal notation is cleaner
- Mutate objects you don't own
- Forget that spread only creates shallow copies
- Use bracket notation when dot notation works
- Modify frozen or sealed objects

### Common Gotchas

**Reference Equality:**
```javascript
const obj1 = { name: 'Alice' };
const obj2 = { name: 'Alice' };
obj1 === obj2 // false - different references!

const obj3 = obj1;
obj3 === obj1 // true - same reference
```

**Shallow Copy:**
```javascript
const original = { user: { name: 'Alice' } };
const copy = { ...original };
copy.user.name = 'Bob';
original.user.name // 'Bob' - nested objects are still referenced!
```

**This in Arrow Functions:**
```javascript
const obj = {
  name: 'Alice',
  greet: () => {
    console.log(this.name); // undefined - arrow functions don't bind 'this'
  }
};
```

**Property Order:**
```javascript
// Property order is generally preserved, but don't rely on it for numeric keys
const obj = { 2: 'two', 1: 'one', a: 'a' };
Object.keys(obj); // ['1', '2', 'a'] - numeric keys are sorted!
```

## Advanced Patterns

### Safe Nested Access
```javascript
// Old way - verbose
const street = user && user.address && user.address.street;

// Modern way - optional chaining
const street = user?.address?.street;
```

### Immutable Updates
```javascript
// Update nested property without mutation
const updatedUser = {
  ...user,
  address: {
    ...user.address,
    street: 'New Street'
  }
};
```

### Object Transformation
```javascript
// Convert array to object
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const usersById = Object.fromEntries(
  users.map(user => [user.id, user])
);
// { 1: { id: 1, name: 'Alice' }, 2: { id: 2, name: 'Bob' } }
```

### Dynamic Property Creation
```javascript
// Building objects dynamically
const fields = ['name', 'email', 'age'];
const values = ['Alice', 'alice@example.com', 28];

const user = Object.fromEntries(
  fields.map((field, i) => [field, values[i]])
);
```

## Exercises

Practice object manipulation:
- Creating and transforming objects
- Working with nested data
- Using destructuring effectively
- Understanding references vs values

Files:
- [9_exercises.js](9_exercises.js) - Practice problems
- [solutions.js](solutions.js) - Solutions and explanations

## Learning Path

1. [1_object_creation.js](1_object_creation.js) - Master object creation syntax
2. [2_property_access.js](2_property_access.js) - Learn safe property access
3. [3_object_methods.js](3_object_methods.js) - Understand methods and `this`
4. [4_object_destructuring.js](4_object_destructuring.js) - Extract properties elegantly
5. [5_spread_operator.js](5_spread_operator.js) - Copy and merge objects
6. [6_object_static_methods.js](6_object_static_methods.js) - Use built-in utilities
7. [7_nested_objects.js](7_nested_objects.js) - Handle complex data structures
8. [8_references_vs_values.js](8_references_vs_values.js) - Understand memory and equality
9. Complete the exercises to solidify your knowledge!

## Tips for Workshop Participants

- Objects are everywhere in JavaScript - APIs, configurations, data structures
- Optional chaining (`?.`) will save you from many bugs
- Practice destructuring - it's used extensively in modern JavaScript
- Understand shallow vs deep copy - a common source of bugs
- The spread operator is your friend for immutable updates
- Remember: objects are passed by reference, not by value
- Try the exercises - they cover real-world scenarios you'll encounter

## Previous Section
- [Section 4: Arrays](../4#Arrays/README.md)

## Next Steps

Congratulations on completing the JavaScript Deep Dive Workshop! You now have a solid foundation in:
- JavaScript fundamentals (variables, types, coercion)
- Control flow and conditional logic
- Functions and functional programming
- Array manipulation and transformation
- Object creation and manipulation

Continue practicing these concepts and building projects to reinforce your learning!
