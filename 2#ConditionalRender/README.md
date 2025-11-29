# Conditional Rendering

Welcome to the Conditional Rendering section! This section teaches you how to control program flow using conditional statements and expressions.

## Overview

Conditional logic is fundamental to programming. You'll learn how to make decisions in your code, from simple if/else statements to advanced techniques like short-circuit evaluation. This section focuses on writing clean, maintainable conditional code.

## Topics Covered

### Core Concepts

1. **If/Else Statements**
   - Truthy and falsy values (the 6 falsy values you must know!)
   - Guard clauses and early returns
   - Avoiding nested conditionals

2. **Else-If Chains**
   - Handling multiple conditions
   - When to use else-if vs separate ifs

3. **If/Else vs Switch/Case**
   - When to use each approach
   - Switch statement syntax and fall-through behavior
   - Performance considerations

4. **Ternary Operator**
   - Concise conditional expressions
   - When to use (and when NOT to use) ternaries
   - Avoiding nested ternaries

5. **Short-Circuit Evaluation**
   - Logical AND (`&&`) operator
   - Logical OR (`||`) operator
   - Nullish coalescing (`??`) operator
   - Practical use cases for each

## Files in This Section

- [1_if_else.js](./1_if_else.js) - If/else fundamentals, truthy/falsy values, guard clauses
- [2_else_if_chain.js](./2_else_if_chain.js) - Handling multiple conditions
- [3_if_else_vs_switch_case.js](./3_if_else_vs_switch_case.js) - Choosing the right conditional structure
- [4_ternary_operator.js](./4_ternary_operator.js) - Concise conditional expressions
- [5_short_circuit.js](./5_short_circuit.js) - Logical operators and short-circuit evaluation
- [6_exercise.js](./6_exercise.js) - Practice exercises
- [7_exercise_solution.js](./7_exercise_solution.js) - Exercise solutions

## Key Concepts to Master

### The 6 Falsy Values
Remember, ONLY these values are falsy:
1. `false`
2. `0`
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

Everything else is truthy! Common gotchas:
- `"0"` is truthy (it's a string!)
- `"false"` is truthy (it's a string!)
- `[]` is truthy (empty array)
- `{}` is truthy (empty object)

### Best Practices

**DO:**
- Use guard clauses with early returns instead of deep nesting
- Keep conditions simple and readable
- Use ternary operators for simple assignments
- Use `===` for comparisons (strict equality)

**DON'T:**
- Nest conditionals more than 2-3 levels deep
- Use nested ternary operators
- Compare to boolean values explicitly (`if (isActive === true)`)
- Use switch without breaks unless you intend fall-through

### Code Patterns

**Bad - Nested Conditionals:**
```javascript
if (user) {
  if (user.isActive) {
    if (amount > 0) {
      // deeply nested logic
    }
  }
}
```

**Good - Guard Clauses:**
```javascript
if (!user) throw new Error("User not found");
if (!user.isActive) throw new Error("Inactive account");
if (amount <= 0) throw new Error("Invalid amount");

// main logic here
```

## Exercises

This section includes practice exercises to reinforce your learning:
- Work through [6_exercise.js](./6_exercise.js) on your own
- Check your solutions against [7_exercise_solution.js](./7_exercise_solution.js)
- Try to solve them without looking at the solutions first!

## Learning Path

1. Start with [1_if_else.js](./1_if_else.js) - Understand the basics
2. Progress through [2_else_if_chain.js](./2_else_if_chain.js) and [3_if_else_vs_switch_case.js](./3_if_else_vs_switch_case.js)
3. Learn modern patterns in [4_ternary_operator.js](./4_ternary_operator.js) and [5_short_circuit.js](./5_short_circuit.js)
4. Practice with the exercises

## Tips for Workshop Participants

- Run each example and observe the output
- Experiment by changing conditions to see different behaviors
- Pay attention to the comparison between "bad" and "good" code patterns
- The guard clause pattern will make your code much more readable!
- Don't memorize - understand WHY each pattern works

## Previous Section
- [Section 1: JavaScript Fundamentals](../1%23JavascriptFundamentals/README.md)

## Next Section
- [Section 3: Functions](../3%23Functions/README.md)
