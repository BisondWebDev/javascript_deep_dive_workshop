// Utility functions for the Task Management System
// Your job: Implement these utility functions

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

function getUtcMidnightTimestamp(value) {
  const normalizedValue = typeof value === 'string' ? value.trim() : value;

  if (typeof normalizedValue === 'string' && DATE_ONLY_PATTERN.test(normalizedValue)) {
    const [year, month, day] = normalizedValue.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  }

  const date = normalizedValue instanceof Date
    ? new Date(normalizedValue.getTime())
    : new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return NaN;
  }

  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

/**
 * Generates a unique ID with a prefix
 * @param {string} prefix - Prefix for the ID (e.g., 'task', 'user', 'proj')
 * @returns {string} - Unique ID
 *
 * Example: generateId('task') => 'task-a7b3c9d2'
 *
 * Hint: Use Math.random().toString(36) to generate random string
 * Hint: You can also use Date.now() for uniqueness
 */
function generateId(prefix = 'id') {
  // Approach 1: prefix + timestamp + random string
  // Approach 2: prefix + random string
  const uniqueString = Date.now().toString(36) + Math.random().toString(36).substring(2);
  return `${prefix}-${uniqueString}`;
}

/**
 * Formats a date string
 * @param {string} dateString - ISO date string
 * @param {string} format - 'short' | 'long' | 'relative'
 * @returns {string} - Formatted date
 *
 * Examples:
 * formatDate('2024-01-15T10:00:00Z', 'short') => '01/15/2024'
 * formatDate('2024-01-15T10:00:00Z', 'long') => 'January 15, 2024'
 * formatDate('2024-01-15T10:00:00Z', 'relative') => '5 days ago'
 */
function formatDate(dateString, format = 'short') {
  if (format !== 'short' && format !== 'long' && format !== 'relative') {
    throw new Error(`Unsupported date format: ${format}`);
  }

  // Hint: Create a Date object from the string
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  // Hint: For 'short', use date.toLocaleDateString()
  if (format === 'short') {
    return date.toLocaleDateString();
  }
  // Hint: For 'long', use date.toLocaleDateString() with options
  if (format === 'long') {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }
  // Hint: For 'relative', calculate difference from now
  if (format === 'relative') {
    const diffDays = daysBetween(date, new Date());

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    if (diffDays < 0) {
      return `in ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`;
    }

    return 'today';
  }
}

/**
 * Checks if a date is overdue
 * @param {string} dueDate - ISO date string
 * @returns {boolean} - true if overdue
 *
 * Hint: Compare the date with the current date
 */
function isOverdue(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  return due < now;
}

/**
 * Converts priority string to numeric value
 * @param {string} priority - 'low', 'medium', 'high', 'urgent'
 * @returns {number} - Numeric value (1-4)
 *
 * Use this for sorting by priority
 */
function priorityValue(priority) {
  // low => 1, medium => 2, high => 3, urgent => 4
  const priorityMapping = {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4
  };
  return priorityMapping[priority.toLowerCase()] || 0; // Return 0 for unknown priorities
}

/**
 * Creates a deep clone of an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Deep copy
 *
 * Hint: Use JSON.parse(JSON.stringify(obj)) for simple approach
 * Or implement recursive cloning for better handling
 */
function deepClone(obj) {
  // Simple approach: JSON.parse(JSON.stringify(obj))
  // Note: This won't work with functions, undefined, or dates

  if (obj === null || typeof obj !== 'object') return obj; // primitives, null, undefined
  if (obj instanceof Date) return new Date(obj);           // dates

  // Recursive cases
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));               // arrays
  }

  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);               // recursive clone for nested objects
    }
  }
  return clonedObj; 
}

/**
 * Calculates the number of days between two dates
 * @param {string} date1 - ISO date string
 * @param {string} date2 - ISO date string
 * @returns {number} - Number of days (can be negative)
 */
function daysBetween(date1, date2) {
  // Hint: Convert to Date objects, subtract, divide by milliseconds in a day
  // One day = 24 * 60 * 60 * 1000 milliseconds
  const d1 = getUtcMidnightTimestamp(date1);
  const d2 = getUtcMidnightTimestamp(date2);
  return Math.trunc((d2 - d1) / MILLISECONDS_PER_DAY);
}

/**
 * Calculates days until a date from now
 * @param {string} dateString - ISO date string
 * @returns {number} - Days until date (negative if past)
 */
function daysUntil(dateString) {
  // Hint: Use daysBetween with new Date() and the provided date
  return daysBetween(new Date(), dateString);
}

/**
 * Converts a string to lowercase and trims whitespace
 * @param {string} str - String to normalize
 * @returns {string} - Normalized string
 */
function normalizeString(str) {
  return str.trim().toLowerCase();
}

/**
 * Checks if a value is an empty object {}
 * @param {*} obj - Value to check
 * @returns {boolean} - true if empty object
 */
function isEmptyObject(obj) {
  // Hint: Check if it's an object and not null
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.keys(obj).length === 0;
  }
  return false;
}

/**
 * Safely gets a nested property value
 * @param {Object} obj - Object to query
 * @param {string} path - Dot-notation path (e.g., 'user.address.city')
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} - Value at path or default value
 *
 * Example: getNestedValue(user, 'profile.settings.theme', 'light')
 *
 * Hint: Split the path and reduce through the object
 * Or use optional chaining if you want to make it simple
 */
function getNestedValue(obj, path, defaultValue = undefined) {
  // Hint: path.split('.').reduce((current, key) => current?.[key], obj)
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : defaultValue;
  }, obj);
}

/**
 * Groups an array of objects by a property
 * @param {Array} array - Array to group
 * @param {string} key - Property to group by
 * @returns {Object} - Grouped object
 *
 * Example: groupBy([{type: 'a'}, {type: 'b'}, {type: 'a'}], 'type')
 * Returns: { a: [{type: 'a'}, {type: 'a'}], b: [{type: 'b'}] }
 */
function groupBy(array, key) {
  // Hint: Use reduce to build the grouped object
  return array.reduce((acc, item) => {
    const groupKey = item[key];

    if (!Object.prototype.hasOwnProperty.call(acc, groupKey)) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(item);
    return acc;
  }, Object.create(null));
}

/**
 * Creates a debounced version of a function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 *
 * Advanced: Only implement if you're comfortable with closures and setTimeout
 */
function debounce(func, delay) {
  let timer;
  let lastResult;

  return function(...args) {
    const context = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      lastResult = func.apply(context, args);
    }, delay);

    return lastResult;
  };
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateId,
    formatDate,
    isOverdue,
    priorityValue,
    deepClone,
    daysBetween,
    daysUntil,
    normalizeString,
    isEmptyObject,
    getNestedValue,
    groupBy,
    debounce
  };
}
