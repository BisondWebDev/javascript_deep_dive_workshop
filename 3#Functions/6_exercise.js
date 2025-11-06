/*
  Scenario
  You're building a text processing system that can clean, validate, 
  and transform text using different operations.

  Your Task
  Complete the functions below. NO array methods allowed.
  Use only: for loops, if/else, and function calls.

  ## Expected Output

  Test 1:
  Original: "  hello world  "
  Trimmed: "hello world"

  Test 2:
  Original: "hello"
  Uppercase: "HELLO"
  Lowercase: "hello"
  With exclamation: "hello!"

  Test 3:
  After uppercase: "HELLO"
  After add exclamation: "HELLO!"

  Test 4:
  Valid: true
  Valid: false

  Test 5:
  "hi" has min 3 chars: false
  "hello" has min 3 chars: true

  Test 6:
  Letter 'o' appears 2 times in "hello world"

  Test 7:
  Original: hello world
  With dashes: hello-world

  Test 8:
  Original: "  Hello World  "
  Step 1 (trim): "Hello World"
  Step 2 (lowercase): "hello world"
  Step 3 (dashes): "hello-world"
  Step 4 (exclaim): "hello-world!"

  Test 9:
  Result: haha

  Test 10:
  With prefix: Mr. Smith

*/

// ============================================
// STARTER CODE
// ============================================

/**
 * Apply a text operation using a callback
 */
function processText(text, operationFn) {
  // TODO: Call operationFn with text
  // TODO: Return the result
}

/**
 * Check if text passes a validation using callback
 */
function validate(text, validationFn) {
  // TODO: Call validationFn with text
  // TODO: Return true or false
}

/**
 * Count how many characters pass a test
 * testFn is called for each character
 */
function countCharacters(text, testFn) {
  // TODO: Initialize counter to 0
  // TODO: Loop through each character in text
  // TODO: Call testFn(character)
  // TODO: If it returns true, increment counter
  // TODO: Return counter
}

/**
 * Apply two operations one after another
 * First apply operation1, then apply operation2 to the result
 */
function applyTwoOperations(text, operation1, operation2) {
  // TODO: Apply operation1 to text
  // TODO: Apply operation2 to that result
  // TODO: Return final result
}

// ============================================
// TEXT OPERATIONS (Function Expressions)
// ============================================

// TODO: Remove spaces from start and end
const trim = function(text) {
  // You can use text.trim() built-in method
};

// TODO: Convert to uppercase
const toUpperCase = function(text) {
  // You can use text.toUpperCase() built-in method
};

// TODO: Convert to lowercase  
const toLowerCase = function(text) {
  // You can use text.toLowerCase() built-in method
};

// TODO: Add exclamation mark at the end
const addExclamation = function(text) {
  // Return text + '!'
};

// TODO: Replace all spaces with dashes (use a loop)
const spacesToDashes = function(text) {
  let result = '';
  // Loop through each character
  // If character is space, add dash
  // Otherwise add the character
  // Return result
};

// ============================================
// VALIDATION FUNCTIONS (Function Expressions)
// ============================================

// TODO: Check if text is not empty
const isNotEmpty = function(text) {
  // Return true if text.length > 0
};

// TODO: Check if text has at least minLength characters
function hasMinLength(text, minLength) {
  // Return true if text.length >= minLength
}

// ============================================
// TEST CASES
// ============================================

console.log('=== Test 1: Basic Processing ===');
const text1 = "  hello world  ";
console.log('Original:', `"${text1}"`);
console.log('Trimmed:', `"${processText(text1, trim)}"`);


console.log('\n=== Test 2: Different Operations ===');
const text2 = "hello";
console.log('Original:', `"${text2}"`);
console.log('Uppercase:', processText(text2, toUpperCase));
console.log('Lowercase:', processText(text2, toLowerCase));
console.log('With exclamation:', processText(text2, addExclamation));


console.log('\n=== Test 3: Two Operations ===');
const text3 = "hello";
const result3 = applyTwoOperations(text3, toUpperCase, addExclamation);
console.log('After uppercase:', toUpperCase(text3));
console.log('After add exclamation:', result3);


console.log('\n=== Test 4: Validation ===');
console.log('Valid:', validate("hello", isNotEmpty));
console.log('Valid:', validate("", isNotEmpty));


console.log('\n=== Test 5: Min Length Check ===');
const text5a = "hi";
const text5b = "hello";

console.log('"hi" has min 3 chars:', hasMinLength(text5a, 3));
console.log('"hello" has min 3 chars:', hasMinLength(text5b, 3));


console.log('\n=== Test 6: Count Character ===');
const text6 = "hello world";
const count = countCharacter(text6, 'o');
console.log(`Letter 'o' appears ${count} times in "${text6}"`);


console.log('\n=== Test 7: Spaces to Dashes ===');
const text7 = "hello world";
console.log('Original:', text7);
console.log('With dashes:', processText(text7, spacesToDashes));

console.log('\n=== Test 8: Multiple Steps ===');
const text8 = "  Hello World  ";
const step1 = processText(text8, trim);
const step2 = processText(step1, toLowerCase);
const step3 = processText(step2, spacesToDashes);
const step4 = processText(step3, addExclamation);

console.log('Original:', `"${text8}"`);
console.log('Step 1 (trim):', `"${step1}"`);
console.log('Step 2 (lowercase):', `"${step2}"`);
console.log('Step 3 (dashes):', `"${step3}"`);
console.log('Step 4 (exclaim):', `"${step4}"`);


console.log('\n=== Test 9: Anonymous Function ===');
const doubled = processText("ha", function(text) {
  return text + text;
});
console.log('Result:', doubled);


console.log('\n=== Test 10: Custom Callback ===');
const addPrefix = function(text) {
  return "Mr. " + text;
};

console.log('With prefix:', processText("Smith", addPrefix));