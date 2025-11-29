# Arrays

Welcome to the Arrays section! Arrays are one of the most important data structures in JavaScript. This section covers everything from basic array operations to advanced functional programming techniques.

## Overview

Arrays allow you to store and manipulate collections of data. You'll learn how to create arrays, transform them, search through them, and combine multiple array operations to solve complex problems. This section emphasizes modern, functional approaches to array manipulation.

## Topics Covered

### Core Concepts

1. **Arrays Basics**
   - Array creation (literal notation, `new Array()`, `Array.of()`, `Array.from()`)
   - Array access (positive indexing, negative indexing with `at()`)
   - Sparse arrays and their gotchas
   - The difference between `[]` and `new Array(n)`

2. **Mutating Array Methods**
   - Methods that modify the original array
   - `push()`, `pop()`, `shift()`, `unshift()`
   - `splice()`, `reverse()`, `sort()`
   - When to use (and avoid) mutation

3. **Non-Mutating Array Methods**
   - Methods that return new arrays
   - `map()`, `filter()`, `reduce()`
   - `slice()`, `concat()`, `flat()`, `flatMap()`
   - Functional programming approach

4. **Array Searching**
   - Finding elements: `find()`, `findIndex()`, `findLast()`, `findLastIndex()`
   - Checking for elements: `includes()`, `indexOf()`, `lastIndexOf()`
   - When to use each method

5. **Array Testing**
   - Testing conditions: `every()`, `some()`
   - Validating array contents
   - Practical use cases

6. **Chaining Methods**
   - Combining multiple array operations
   - Building data transformation pipelines
   - Performance considerations

7. **Spread Operator**
   - Array copying and cloning
   - Combining arrays
   - Converting iterables to arrays
   - Shallow vs deep copies

8. **Array Destructuring**
   - Extracting values from arrays
   - Rest parameters in destructuring
   - Swapping variables
   - Nested destructuring

## Files in This Section

- [1_arrays_basic.js](./1_arrays_basic.js) - Array creation, access, and corner cases
- [2_array_methods_mutating.js](./2_array_methods_mutating.js) - Methods that modify arrays
- [3_array_methods_non_mutating.js](./3_array_methods_non_mutating.js) - Functional array methods
- [4_array_searching.js](./4_array_searching.js) - Finding and checking elements
- [5_array_testing.js](./5_array_testing.js) - Testing array contents with `every()` and `some()`
- [6_chaining_methods.js](./6_chaining_methods.js) - Combining operations
- [7_spread_operator.js](./7_spread_operator.js) - Spreading and copying arrays
- [8_array_destructuring.js](./8_array_destructuring.js) - Extracting values from arrays
- [9_exercises.js](./9_exercises.js) - Practice exercises
- [solutions.js](./solutions.js) - Exercise solutions

## Key Concepts to Master

### Mutating vs Non-Mutating Methods

**Mutating (Changes Original):**
- `push()`, `pop()`, `shift()`, `unshift()`
- `splice()`, `reverse()`, `sort()`
- `fill()`, `copyWithin()`

**Non-Mutating (Returns New Array):**
- `map()`, `filter()`, `reduce()`
- `slice()`, `concat()`, `flat()`, `flatMap()`
- `toSorted()`, `toReversed()`, `toSpliced()` (ES2023)

**Best Practice:** Prefer non-mutating methods for predictable, functional code.

### The Big Three: Map, Filter, Reduce

**Map** - Transform each element:
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]
```

**Filter** - Select elements:
```javascript
const numbers = [1, 2, 3, 4];
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
```

**Reduce** - Combine elements:
```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, n) => acc + n, 0); // 10
```

### Array Destructuring Patterns

**Basic:**
```javascript
const [first, second] = [1, 2, 3];
// first = 1, second = 2
```

**Skipping Elements:**
```javascript
const [first, , third] = [1, 2, 3];
// first = 1, third = 3
```

**Rest Pattern:**
```javascript
const [first, ...rest] = [1, 2, 3, 4];
// first = 1, rest = [2, 3, 4]
```

**Swapping:**
```javascript
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

### Spread Operator Uses

**Copy Array:**
```javascript
const original = [1, 2, 3];
const copy = [...original];
```

**Combine Arrays:**
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

**Convert String to Array:**
```javascript
const chars = [..."hello"]; // ['h', 'e', 'l', 'l', 'o']
```

## Best Practices

**DO:**
- Use `map()`, `filter()`, `reduce()` for data transformation
- Chain methods for readable data pipelines
- Use `const` for arrays you won't reassign
- Use spread operator for copying (simple cases)
- Use `at()` for negative indexing

**DON'T:**
- Mutate arrays unless you have a good reason
- Use sparse arrays (they're confusing and slow)
- Forget that `sort()` mutates the array
- Chain too many operations (consider performance)
- Use `new Array(n)` without filling it

### Common Gotchas

**Sparse Arrays:**
```javascript
const sparse = new Array(3); // [empty × 3]
sparse[0]; // undefined
sparse.map(x => x * 2); // [empty × 3] - skips empty slots!

// Better:
const filled = Array(3).fill(0); // [0, 0, 0]
```

**Sort Without Compare Function:**
```javascript
[1, 2, 10].sort(); // [1, 10, 2] - converts to strings!
[1, 2, 10].sort((a, b) => a - b); // [1, 2, 10] - correct
```

**Negative Indexing:**
```javascript
const arr = [1, 2, 3];
arr[-1]; // undefined - doesn't work!
arr.at(-1); // 3 - use at() method
```

## Advanced Patterns

### Method Chaining
```javascript
const result = users
  .filter(user => user.isActive)
  .map(user => user.name)
  .sort();
```

### Reduce for Complex Operations
```javascript
// Group by property
const grouped = items.reduce((acc, item) => {
  const key = item.category;
  acc[key] = acc[key] || [];
  acc[key].push(item);
  return acc;
}, {});
```

### FlatMap for Nested Data
```javascript
const nested = [[1, 2], [3, 4]];
const flat = nested.flatMap(arr => arr.map(n => n * 2));
// [2, 4, 6, 8]
```

## Exercises

Practice what you've learned:
- Array transformation challenges
- Search and filter operations
- Data aggregation with reduce
- Method chaining problems

Files:
- [9_exercises.js](./9_exercises.js) - Work through these exercises
- [solutions.js](./solutions.js) - Check your solutions here

## Learning Path

1. [1_arrays_basic.js](./1_arrays_basic.js) - Understand array creation and access
2. [2_array_methods_mutating.js](./2_array_methods_mutating.js) - Learn methods that change arrays
3. [3_array_methods_non_mutating.js](./3_array_methods_non_mutating.js) - Master map, filter, reduce
4. [4_array_searching.js](./4_array_searching.js) - Find elements efficiently
5. [5_array_testing.js](./5_array_testing.js) - Test array contents
6. [6_chaining_methods.js](./6_chaining_methods.js) - Combine operations
7. [7_spread_operator.js](./7_spread_operator.js) - Copy and combine arrays
8. [8_array_destructuring.js](./8_array_destructuring.js) - Extract values elegantly
9. Complete the exercises!

## Tips for Workshop Participants

- Arrays are the foundation of data manipulation in JavaScript
- Focus on functional methods (map, filter, reduce) - they're used everywhere
- Practice method chaining - it's a common real-world pattern
- Pay attention to what returns a new array vs mutates the original
- The exercises are crucial - they simulate real-world scenarios
- Try to solve problems without looking at solutions first

## Previous Section
- [Section 3: Functions](../3%23Functions/README.md)

## Next Section
- [Section 5: Objects](../5%23Objects/README.md)
