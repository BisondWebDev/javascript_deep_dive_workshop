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
  const usersRoles = ['developer', 'designer', 'manager', 'admin'];
  const validationErrors = [];
  // Validate name: Required, non-empty string, 2-100 characters
  if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length < 2 || userData.name.trim().length > 100) {
    validationErrors.push('Name is required and must be between 2 and 100 characters');
  }
  // Validate email: Required, valid email format
  if (!userData.email || !isValidEmail(userData.email)) {
    validationErrors.push('Email is required and must be in a valid format');
  }
  // Validate role: Optional, must be one of: developer, designer, manager, admin
  if (userData.role !== undefined) {
    if (typeof userData.role !== 'string') {
      validationErrors.push(`Role must be one of: ${usersRoles.join(', ')}`);
    } else {
      const trimmedRole = userData.role.trim();

      if (trimmedRole === '' || !usersRoles.includes(trimmedRole)) {
        validationErrors.push(`Role must be one of: ${usersRoles.join(', ')}`);
      }
    }
  }
  // Validate active: Optional, must be boolean
  if (userData.active !== undefined && typeof userData.active !== 'boolean') {
    validationErrors.push('Active must be a boolean value');
  }
  // Return validation result if there are errors or valid 
  if (validationErrors.length > 0) {
    return { valid: false, errors: validationErrors };
  }
  return { valid: true };
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
  // Hint: Use guard clauses for required fields
  // Hint: Use array.includes() to check valid values
  // Hint: For date validation, create a Date object and check if it's valid
  const validStatuses = ['todo', 'in-progress', 'done', 'blocked'];
  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  
  // title: Required, non-empty string, 5-200 characters
  if (!taskData.title || typeof taskData.title !== 'string' || taskData.title.trim().length < 5 || taskData.title.trim().length > 200) {
    return { valid: false, errors: ['Title is required and must be between 5 and 200 characters'] };
  }
  // description: Optional, max 1000 characters
  if (taskData.description !== undefined && (typeof taskData.description !== 'string' || taskData.description.length > 1000)) {
    return { valid: false, errors: ['Description must be a string with a maximum of 1000 characters'] };
  }
  // projectId: Required, non-empty string
  if (!taskData.projectId || typeof taskData.projectId !== 'string' || taskData.projectId.trim() === '') {
    return { valid: false, errors: ['Project ID is required and must be a non-empty string'] };
  }
  // assigneeId: Optional, non-empty string if provided
  if (taskData.assigneeId !== undefined && (typeof taskData.assigneeId !== 'string' || taskData.assigneeId.trim() === '')) {
    return { valid: false, errors: ['Assignee ID must be a non-empty string if provided'] };
  }
  // status: Must be one of: todo, in-progress, done, blocked
  if (taskData.status !== undefined && !validStatuses.includes(taskData.status)) {
    return { valid: false, errors: [`Status must be one of: ${validStatuses.join(', ')}`] };
  }
  // priority: Must be one of: low, medium, high, urgent
  if (taskData.priority !== undefined && !validPriorities.includes(taskData.priority)) {
    return { valid: false, errors: [`Priority must be one of: ${validPriorities.join(', ')}`] };
  }
  // tags: Optional, must be array of strings if provided
  if (taskData.tags !== undefined && (!Array.isArray(taskData.tags) || !taskData.tags.every(tag => typeof tag === 'string'))) {
    return { valid: false, errors: ['Tags must be an array of strings if provided'] };
  }
  // dueDate: Optional, must be valid date string, not in the past
  if (taskData.dueDate !== undefined && (!isValidDate(taskData.dueDate) || isDateInPast(taskData.dueDate))) {
    return { valid: false, errors: ['Due date must be a valid date string and not in the past'] };
  }
  // estimatedHours: Optional, must be positive number if provided
  if (taskData.estimatedHours !== undefined && (typeof taskData.estimatedHours !== 'number' || taskData.estimatedHours <= 0)) {
    return { valid: false, errors: ['Estimated hours must be a positive number if provided'] };
  }
  return { valid: true };
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
  const validStatuses = ['active', 'on-hold', 'completed'];
  const errors = [];

  // name: Required, non-empty string, 3-100 characters
  if (!projectData.name || typeof projectData.name !== 'string' || projectData.name.trim().length < 3 || projectData.name.trim().length > 100) {
    errors.push('Name is required and must be between 3 and 100 characters');
  }
  // description: Optional, max 500 characters
  if (projectData.description !== undefined && (typeof projectData.description !== 'string' || projectData.description.length > 500)) {
    errors.push('Description must be a string with a maximum of 500 characters');
  }
  // ownerId: Required, non-empty string
  if (!projectData.ownerId || typeof projectData.ownerId !== 'string' || projectData.ownerId.trim() === '') {
    errors.push('Owner ID is required and must be a non-empty string');
  }
  // teamMembers: Optional, must be array of strings if provided
  if (projectData.teamMembers !== undefined && (!Array.isArray(projectData.teamMembers) || !projectData.teamMembers.every(member => typeof member === 'string'))) {
    errors.push('Team members must be an array of strings if provided');
  }
  // status: Must be one of: active, on-hold, completed
  if (projectData.status !== undefined && !validStatuses.includes(projectData.status)) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }
  // deadline: Optional, must be valid date string, not in the past
  if (projectData.deadline !== undefined && (!isValidDate(projectData.deadline) || isDateInPast(projectData.deadline))) {
    errors.push('Deadline must be a valid date string and not in the past');
  }
  // return valid true if there are no errors, 
  // otherwise return valid false with errors array
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - true if valid email format
 *
 * Hint: Use a simple regex pattern or check for @ and .
 */
function isValidEmail(email) {
  // Validation logic for email format
  // if email is not a string, return false. Else use regex to validate email format
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates date string
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - true if valid date
 *
 * Hint: Try creating a Date object and check if it's valid
 */
function isValidDate(dateString) {
  // Validation logic for date validation
  // if dateString is undefined, null, or not a number, return false. Else create a Date object and check if it's valid
  
  if (typeof dateString !== 'string' || dateString.trim() === '') return false;

  const trimmedDateString = dateString.trim();
  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
  const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

  if (dateOnlyPattern.test(trimmedDateString)) {
    const [year, month, day] = trimmedDateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
  }

  if (isoDateTimePattern.test(trimmedDateString)) {
    return !Number.isNaN(Date.parse(trimmedDateString));
  }

  return false;
}

/**
 * Checks if a date is in the past
 * @param {string} dateString - Date string to check
 * @returns {boolean} - true if date is in the past
 */
function isDateInPast(dateString) {
  // Validate logic for checking if date is in the past
  // Date-only strings should be compared at day granularity so "today" is not treated as already past.
  const trimmedDateString = typeof dateString === 'string' ? dateString.trim() : '';
  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (dateOnlyPattern.test(trimmedDateString)) {
    const [year, month, day] = trimmedDateString.split('-').map(Number);
    const dateToCheck = Date.UTC(year, month - 1, day);
    const now = new Date();
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    return dateToCheck < today;
  }

  const dateToCheck = new Date(dateString);
  const dateNow = new Date();
  return dateToCheck < dateNow;
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
