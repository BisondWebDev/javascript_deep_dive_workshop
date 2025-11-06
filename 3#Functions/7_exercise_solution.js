// ============================================
// SOLUTION
// ============================================

/**
 * Apply a text operation using a callback
 */
function processText(text, operationFn) {
  return operationFn(text);
}

/**
 * Check if text passes a validation using callback
 */
function validate(text, validationFn) {
  return validationFn(text);
}

/**
 * Count how many times a specific character appears in text
 */
function countCharacter(text, targetChar) {
  let count = 0;
  
  for (let i = 0; i < text.length; i++) {
    if (text[i] === targetChar) {
      count = count + 1;
    }
  }
  
  return count;
}

/**
 * Apply two operations one after another
 * First apply operation1, then apply operation2 to the result
 */
function applyTwoOperations(text, operation1, operation2) {
  const result1 = operation1(text);
  const result2 = operation2(result1);
  return result2;
}

// ============================================
// TEXT OPERATIONS (Function Expressions)
// ============================================

// Remove spaces from start and end
const trim = function(text) {
  return text.trim();
};

// Convert to uppercase
const toUpperCase = function(text) {
  return text.toUpperCase();
};

// Convert to lowercase  
const toLowerCase = function(text) {
  return text.toLowerCase();
};

// Add exclamation mark at the end
const addExclamation = function(text) {
  return text + '!';
};

// Replace all spaces with dashes (using a loop)
const spacesToDashes = function(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      result = result + '-';
    } else {
      result = result + text[i];
    }
  }
  return result;
};

// ============================================
// VALIDATION FUNCTIONS (Function Expressions)
// ============================================

// Check if text is not empty
const isNotEmpty = function(text) {
  return text.length > 0;
};

// Check if text has at least minLength characters
function hasMinLength(text, minLength) {
  return text.length >= minLength;
}