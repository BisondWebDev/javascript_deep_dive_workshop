// Validation functions for the Task Management System
// Your job: Implement these validation functions according to the requirements

/**
 * Validates user data
 * @param {Object} userData - User data to validate
 * @returns {Object} - { valid: boolean, errors?: string[] }
 *
 * Requirements:
 * - name: Required, non-empty string, 2-100 characters
 * - email: Required, valid email format
 * - role: Optional, must be one of: developer, designer, manager, admin
 * - active: Optional, must be boolean
 */
function validateUser(userData) {
  // TODO: Implement validation
  // Hint: Use an array to collect errors
  // Hint: Check each field and add error messages
  // Hint: Return { valid: true } or { valid: false, errors: [...] }
}

/**
 * Validates task data
 * @param {Object} taskData - Task data to validate
 * @returns {Object} - { valid: boolean, errors?: string[] }
 *
 * Requirements:
 * - title: Required, non-empty string, 5-200 characters
 * - description: Optional, max 1000 characters
 * - projectId: Required, non-empty string
 * - assigneeId: Optional, non-empty string if provided
 * - status: Must be one of: todo, in-progress, done, blocked
 * - priority: Must be one of: low, medium, high, urgent
 * - tags: Optional, must be array of strings if provided
 * - dueDate: Optional, must be valid date string, not in the past
 * - estimatedHours: Optional, must be positive number if provided
 */
function validateTask(taskData) {
  // TODO: Implement validation
  // Hint: Use guard clauses for required fields
  // Hint: Use array.includes() to check valid values
  // Hint: For date validation, create a Date object and check if it's valid
}

/**
 * Validates project data
 * @param {Object} projectData - Project data to validate
 * @returns {Object} - { valid: boolean, errors?: string[] }
 *
 * Requirements:
 * - name: Required, non-empty string, 3-100 characters
 * - description: Optional, max 500 characters
 * - ownerId: Required, non-empty string
 * - teamMembers: Optional, must be array of strings if provided
 * - status: Must be one of: active, on-hold, completed
 * - deadline: Optional, must be valid date string, not in the past
 */
function validateProject(projectData) {
  // TODO: Implement validation
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - true if valid email format
 *
 * Hint: Use a simple regex pattern or check for @ and .
 */
function isValidEmail(email) {
  // TODO: Implement email validation
  // Simple approach: check for @ and . in correct positions
  // Advanced: use regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

/**
 * Validates date string
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - true if valid date
 *
 * Hint: Try creating a Date object and check if it's valid
 */
function isValidDate(dateString) {
  // TODO: Implement date validation
  // Hint: new Date(dateString) and check if it's not "Invalid Date"
}

/**
 * Checks if a date is in the past
 * @param {string} dateString - Date string to check
 * @returns {boolean} - true if date is in the past
 */
function isDateInPast(dateString) {
  // TODO: Implement past date check
  // Hint: Compare with new Date()
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateUser,
    validateTask,
    validateProject,
    isValidEmail,
    isValidDate,
    isDateInPast
  };
}
