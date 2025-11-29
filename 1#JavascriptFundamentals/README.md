# JavaScript Fundamentals

Welcome to the JavaScript Fundamentals section! This section covers the essential building blocks of JavaScript that every developer needs to master.

## Overview

In this section, you'll learn about variables, data types, and the core concepts that form the foundation of JavaScript programming. Understanding these fundamentals is crucial before moving on to more advanced topics.

## Topics Covered

### 1. Variables
Learn about JavaScript's variable declaration methods and their important differences:

- **Temporal Dead Zone (TDZ)**: Understanding when variables are accessible
- **Block Scope vs Function Scope**: How `let` and `const` differ from `var`
- **Hoisting**: How JavaScript handles variable declarations
- **The Classic Loop Problem**: Why `var` in loops can cause unexpected behavior

**Files:**
- [variables.js](./1%23Variables/variables.js) - Variable declarations, scope, and hoisting

### 2. Data Types
Deep dive into JavaScript's type system and its quirks:

- **Primitive Values vs Objects**: Understanding the fundamental difference
- **Reference Types vs Primitive Types**: How values are stored and passed
- **NaN and isNaN()**: Working with "Not a Number" values
- **Negative Zero and Object.is()**: Edge cases in JavaScript equality
- **Type Coercion**: How JavaScript converts between types
- **Boolean Coercion**: What values are truthy and falsy
- **Equality**: The difference between `==`, `===`, and `Object.is()`

**Files:**
- [1_primitives_values_plus_object.js](./2%23DataTypes/1_primitives_values_plus_object.js) - Primitive types and objects
- [2_primitive_vs_reference_types.js](./2%23DataTypes/2_primitive_vs_reference_types.js) - Understanding value vs reference
- [3_NaN_and_isNaN.js](./2%23DataTypes/3_NaN_and_isNaN.js) - Working with NaN
- [4_negative_zero_and_object_dot_is.js](./2%23DataTypes/4_negative_zero_and_object_dot_is.js) - Edge cases in equality
- [5_type_coercion.js](./2%23DataTypes/5_type_coercion.js) - Implicit and explicit type conversion
- [6_boolean_coercion.js](./2%23DataTypes/6_boolean_coercion.js) - Truthy and falsy values
- [7_eqaulity.js](./2%23DataTypes/7_eqaulity.js) - Different equality operators

## Learning Path

1. Start with **Variables** to understand how to declare and use variables properly
2. Then move to **Data Types** to learn about JavaScript's type system
3. Pay special attention to the corner cases and quirks - these are common sources of bugs!

## Key Takeaways

- Use `const` by default, `let` when you need to reassign, avoid `var`
- Understand the 6 falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`
- Know the difference between `==` (loose equality) and `===` (strict equality)
- Be aware of type coercion and when it happens
- Understand that objects and arrays are reference types

## Tips for Workshop Participants

- Run each example in the files to see the behavior firsthand
- Try modifying the examples to test your understanding
- Pay attention to the comments - they highlight important concepts and edge cases
- Don't skip the "corner cases" - they'll save you from bugs later!

## Next Section

Once you're comfortable with these fundamentals, move on to:
- [Section 2: Conditional Rendering](../2%23ConditionalRender/README.md)
