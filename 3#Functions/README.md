# Functions

Welcome to the Functions section! Functions are the building blocks of JavaScript applications. This section covers everything from basic function syntax to advanced concepts like composition and callbacks.

## Overview

Functions let you organize and reuse code. You'll learn different ways to create functions, how to work with parameters and return values, and how to compose functions to build complex behavior from simple pieces.

## Topics Covered

### Core Concepts

1. **Basic Functions**
   - Function declarations vs function expressions
   - Hoisting differences
   - Arrow functions and their special behavior
   - Named function expressions
   - The `this` binding gotcha with arrow functions

2. **Parameters and Arguments**
   - The difference between parameters and arguments
   - Default parameters
   - Rest parameters (`...args`)
   - Handling variable numbers of arguments

3. **Return Values**
   - Explicit vs implicit returns
   - Returning multiple values using objects/arrays
   - Early returns and guard clauses

4. **Callback Functions**
   - Functions as first-class citizens
   - Passing functions as arguments
   - Common callback patterns
   - Array methods that use callbacks

5. **Function Composition**
   - Building complex functions from simple ones
   - Pure functions and side effects
   - Composing functions for cleaner code

## Files in This Section

- [1_basic_functions.js](./1_basic_functions.js) - Declarations, expressions, and arrow functions
- [2_parameters_and_arguments.js](./2_parameters_and_arguments.js) - Working with function inputs
- [3_return_values.js](./3_return_values.js) - Returning data from functions
- [4_callback_functions.js](./4_callback_functions.js) - Functions as arguments
- [5_function_composition.js](./5_function_composition.js) - Combining functions
- [6_exercise.js](./6_exercise.js) - Practice exercises
- [7_exercise_solution.js](./7_exercise_solution.js) - Exercise solutions

## Key Concepts to Master

### Function Declaration vs Expression

**Declaration (Hoisted):**
```javascript
// Can be called before declaration
greet('Alice'); // Works!

function greet(name) {
  return `Hello, ${name}!`;
}
```

**Expression (Not Hoisted):**
```javascript
// Cannot be called before declaration
greet('Alice'); // Error!

const greet = function(name) {
  return `Hello, ${name}!`;
};
```

### Arrow Functions vs Regular Functions

**Key Differences:**
- Arrow functions don't bind their own `this`
- Arrow functions can't be used as constructors
- Arrow functions don't have `arguments` object

**When to Use Each:**
- Use arrow functions for callbacks and simple expressions
- Use regular functions when you need `this` binding or constructors

### Best Practices

**DO:**
- Use descriptive function names
- Keep functions small and focused (single responsibility)
- Use default parameters instead of checking for undefined
- Use arrow functions for callbacks
- Return early with guard clauses

**DON'T:**
- Create functions that do too many things
- Mutate parameters (prefer returning new values)
- Use arrow functions as object methods if you need `this`
- Forget to return a value when one is expected

### Common Patterns

**Guard Clauses:**
```javascript
function processUser(user) {
  if (!user) return null;
  if (!user.isActive) return null;

  // main logic here
  return processedData;
}
```

**Callback Pattern:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
```

**Function Composition:**
```javascript
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const compose = (f, g) => x => f(g(x));
```

## Advanced Topics

### First-Class Functions
In JavaScript, functions are "first-class citizens" meaning:
- Functions can be assigned to variables
- Functions can be passed as arguments
- Functions can be returned from other functions
- Functions can be stored in data structures

### Pure Functions
A pure function:
- Always returns the same output for the same input
- Has no side effects (doesn't modify external state)
- Makes code predictable and easier to test

```javascript
// Pure function
const add = (a, b) => a + b;

// Impure function (has side effects)
let total = 0;
const addToTotal = (n) => {
  total += n; // Modifies external state
  return total;
};
```

## Exercises

Work through the exercises to practice:
- Writing different types of functions
- Using callbacks effectively
- Composing functions to solve problems
- Understanding `this` binding

Files:
- [6_exercise.js](./6_exercise.js) - Try these on your own first
- [7_exercise_solution.js](./7_exercise_solution.js) - Check your solutions

## Learning Path

1. Start with [1_basic_functions.js](./1_basic_functions.js) - Master the syntax variations
2. Understand [2_parameters_and_arguments.js](./2_parameters_and_arguments.js) - Work with inputs
3. Learn about [3_return_values.js](./3_return_values.js) - Handle outputs
4. Explore [4_callback_functions.js](./4_callback_functions.js) - Functions as data
5. Practice [5_function_composition.js](./5_function_composition.js) - Build complex behavior
6. Complete the exercises to solidify your understanding

## Tips for Workshop Participants

- Pay special attention to the hoisting examples - this catches many developers
- Experiment with arrow functions vs regular functions
- Try writing the same function in different styles
- Use console.log() to see how callbacks work
- Think about which functions are pure vs impure in the examples

## Previous Section
- [Section 2: Conditional Rendering](../2%23ConditionalRender/README.md)

## Next Section
- [Section 4: Arrays](../4%23Arrays/README.md)
