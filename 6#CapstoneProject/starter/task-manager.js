// Task Management System - Main Implementation
// Import data and utilities (uncomment when ready to test)
const { users, projects, tasks } = require('./data');
const { validateUser, validateTask, validateProject } = require('./validators');
const { generateId, isOverdue, priorityValue, deepClone, findTaskBy } = require('./utils');

// For now, we'll work with the sample data directly
let users = [];
let projects = [];
let tasks = [];

// ==================== TASK CRUD OPERATIONS ====================

/**
 * Creates a new task
 * @param {Object} taskData - Task data (without id, timestamps)
 * @returns {Object} - Created task with id and timestamps
 *
 * Steps:
 * 1. Validate the task data (use validateTask from validators.js)
 * 2. Generate a unique ID (use generateId from utils.js)
 * 3. Set default values: status='todo', tags=[], completedAt=null
 * 4. Add timestamps: createdAt and updatedAt (use new Date().toISOString())
 * 5. Add task to the tasks array
 * 6. Return the new task
 */
function createTask(taskData) {
  // 1. Validate the task data (use validateTask from validators.js)
  validateTask(taskData);
  // 2. Generate a unique ID (use generateId from utils.js)
  // 3. Set default values: status='todo', tags=[], completedAt=null
  // 4. Add timestamps: createdAt and updatedAt (use new Date().toISOString())
  // 5. Add task to the tasks array
  const newTask = {
    id: generateId(),
    ...taskData,
    status: 'todo',
    tags: [],
    completedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  // 6. Return the new task
  return newTask;
}

/**
 * Updates an existing task (immutably)
 * @param {string} taskId - ID of task to update
 * @param {Object} updates - Properties to update
 * @returns {Object} - Updated task
 *
 * Steps:
 * 1. Find the task by ID
 * 2. If not found, throw an error
 * 3. Validate updates (you can reuse validateTask)
 * 4. Create updated task object (use spread operator)
 * 5. Update the updatedAt timestamp
 * 6. If status changed to 'done', set completedAt
 * 7. Update the task in the tasks array (immutably!)
 * 8. Return the updated task
 */
function updateTask(taskId, updates) {
 // 1. Find the task by ID
 const task = findTaskBy('id', taskId);
 // 2. If not found, throw an error
 if (!task) {
   throw new Error('Task not found');
 }
 // 3. Validate updates (you can reuse validateTask)
 validateTask(updates);
 // 4. Create updated task object (use spread operator)
 const updatedTask = {
   ...task,
   ...updates,
   updatedAt: new Date().toISOString(),
 };
 // 5. Update the updatedAt timestamp
 updatedTask.completedAt = new Date().toISOString();
 // 6. If status changed to 'done', set completedAt
  if (updates.status === 'done' ) {
    updatedTask.completedAt = new Date().toISOString();
  }
 // 7. Update the task in the tasks array (immutably!)
 tasks = tasks.map(t => t.id === taskId ? updatedTask : t);
 // 8. Return the updated task
 return updatedTask;
}

/**
 * Deletes a task
 * @param {string} taskId - ID of task to delete
 * @returns {boolean} - true if deleted, false if not found
 *
 * Hint: Filter out the task with the given ID
 */
function deleteTask(taskId) {
  const task = findTaskBy('id', taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  // remove the task from the array
  tasks = tasks.filter(t => t.id !== taskId);
  return true; 
}

/**
 * Gets a single task by ID
 * @param {string} taskId - Task ID
 * @returns {Object|null} - Task object or null
 *
 * Hint: Use array.find()
 */
function getTaskById(taskId) {
  const task = findTaskBy('id', taskId);
  return task || null;
}

// ==================== FILTERING & SEARCHING ====================

/**
 * Gets tasks with optional filtering
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered tasks
 *
 * Supported filters:
 * - status: Filter by status
 * - priority: Filter by priority
 * - assigneeId: Filter by assignee
 * - projectId: Filter by project
 * - tag: Filter by tag (tasks that have this tag)
 * - overdue: Boolean, if true only show overdue tasks
 *
 * Hint: Chain filter() operations or use a single filter with multiple conditions
 */
function getTasks(filters = {}) {
    // Start with all tasks, then apply each filter if provided
    return tasks.filter(task => {
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      if (filters.assigneeId && task.assigneeId !== filters.assigneeId) {
        return false;
      }
      if (filters.projectId && task.projectId !== filters.projectId) {
        return false;
      }
      if (filters.tag && !task.tags.includes(filters.tag)) {
        return false;
      }
      if (filters.overdue && !isOverdue(task)) {
        return false;
      }
      return true; // If it passes all filters, include the task
    });
}

/**
 * Searches tasks by keyword in title or description
 * @param {string} keyword - Search term (case-insensitive)
 * @returns {Array} - Matching tasks
 *
 * Hint: Convert to lowercase for case-insensitive search
 * Hint: Use array.filter() and string.includes()
 */
function searchTasks(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowerKeyword) || 
    task.description.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Gets all overdue tasks (not completed and past due date)
 * @returns {Array} - Overdue tasks
 *
 * Hint: Filter tasks where status !== 'done' and dueDate is in the past
 * Hint: Use isOverdue() from utils.js
 */
function getOverdueTasks() {
  return tasks.filter(task => task.status !== 'done' && isOverdue(task.dueDate));  
}

// ==================== SORTING ====================

/**
 * Sorts tasks by a field
 * @param {Array} tasks - Tasks to sort
 * @param {string} sortBy - Field to sort by ('priority'|'dueDate'|'createdAt'|'title')
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} - Sorted tasks (new array)
 *
 * Hint: Use array.sort() with a compare function
 * Hint: For priority, use priorityValue() from utils.js
 * Hint: Don't forget to create a new array (spread operator or slice())
 */
function sortTasks(tasks, sortBy, order = 'asc') {
  // TODO: Implement sorting
}

// ==================== PROJECT & USER QUERIES ====================

/**
 * Gets all tasks for a specific project
 * @param {string} projectId - Project ID
 * @returns {Array} - Tasks in this project
 *
 * Hint: Filter tasks by projectId
 */
function getTasksByProject(projectId) {
  return tasks.filter(task => task.projectId === projectId);
}

/**
 * Gets all tasks assigned to a user
 * @param {string} userId - User ID
 * @returns {Array} - Tasks assigned to this user
 *
 * Hint: Filter tasks by assigneeId
 */
function getTasksByUser(userId) {
  return tasks.filter(task => task.assigneeId === userId);
}

/**
 * Gets tasks completed within a date range
 * @param {string} startDate - Start date (ISO string)
 * @param {string} endDate - End date (ISO string)
 * @returns {Array} - Completed tasks in range
 *
 * Hint: Filter tasks where:
 * - status === 'done'
 * - completedAt is between startDate and endDate
 */
function getCompletedTasks(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return tasks.filter(task => {
    if (task.status !== 'done' || !task.completedAt) return false;
    const completedTime = new Date(task.completedAt).getTime();
    return completedTime >= start && completedTime <= end;
  });
}

/**
 * Gets tasks due within the next N days
 * @param {number} days - Number of days to look ahead
 * @returns {Array} - Upcoming tasks
 *
 * Hint: Calculate the date N days from now
 * Hint: Filter tasks where dueDate is between now and N days from now
 */
function getUpcomingTasks(days) {
  const now = Date.now();
  const future = now + days * 24 * 60 * 60 * 1000;
  return tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueTime = new Date(task.dueDate).getTime();
    return dueTime >= now && dueTime <= future;
  });
}

// ==================== GROUPING ====================

/**
 * Groups tasks by status
 * @param {Array} tasks - Tasks to group
 * @returns {Object} - Tasks grouped by status
 *
 * Example return: { todo: [...], 'in-progress': [...], done: [...] }
 *
 * Hint: Use reduce() to build the grouped object
 */
function groupTasksByStatus(tasks) {
  
  return tasks.reduce((groups, task) => {
    if (!groups[task.status]) {
      groups[task.status] = [];
    }
    groups[task.status].push(task);
    return groups;
  }, {});
}

/**
 * Groups tasks by priority
 * @param {Array} tasks - Tasks to group
 * @returns {Object} - Tasks grouped by priority
 *
 * Hint: Similar to groupTasksByStatus
 */
function groupTasksByPriority(tasks) {
  return tasks.reduce((groups, task) => {
    if (!groups[task.priority]) {
      groups[task.priority] = [];
    }
    groups[task.priority].push(task);
    return groups;
  }, {});
}

// ==================== ANALYTICS & STATS ====================

/**
 * Gets statistics for a project
 * @param {string} projectId - Project ID
 * @returns {Object} - Project statistics
 *
 * Return format:
 * {
 *   total: number,
 *   todo: number,
 *   inProgress: number,
 *   done: number,
 *   blocked: number,
 *   completionRate: number (0-1),
 *   overdue: number
 * }
 *
 * Hint: Get tasks for the project first
 * Hint: Use filter() to count tasks by status
 * Hint: completionRate = done / total
 */
function getProjectStats(projectId) {
  const projectTasks = getTasksByProject(projectId);
  const total = projectTasks.length;
  const todo = projectTasks.filter(task => task.status === 'todo').length;
  const inProgress = projectTasks.filter(task => task.status === 'in-progress').length;
  const done = projectTasks.filter(task => task.status === 'done').length;
  const blocked = projectTasks.filter(task => task.status === 'blocked').length;
  const completionRate = total === 0 ? 0 : done / total;
  const overdue = projectTasks.filter(task => {
    if (!task.dueDate) return false;
    const dueTime = new Date(task.dueDate).getTime();
    return dueTime < Date.now() && task.status !== 'done';
  }).length;

  return {
    total,
    todo,
    inProgress,
    done,
    blocked,
    completionRate,
    overdue
  };
}

/**
 * Gets workload statistics for a user
 * @param {string} userId - User ID
 * @returns {Object} - User workload
 *
 * Return format:
 * {
 *   userId: string,
 *   assignedTasks: number,
 *   completedTasks: number,
 *   inProgressTasks: number,
 *   todoTasks: number,
 *   totalEstimatedHours: number,
 *   overdueTasksCount: number
 * }
 */
function getUserWorkload(userId) {
  const userTasks = getTasksByUser(userId);
  const assignedTasks = userTasks.length;
  const completedTasks = userTasks.filter(task => task.status === 'done').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = userTasks.filter(task => task.status === 'todo').length;
  const totalEstimatedHours = userTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0);
  const overdueTasksCount = userTasks.filter(task => {
    if (!task.dueDate) return false;
    const dueTime = new Date(task.dueDate).getTime();
    return dueTime < Date.now() && task.status !== 'done';
  }).length;

  return {
    userId,
    assignedTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    totalEstimatedHours,
    overdueTasksCount
  };
}

/**
 * Calculates completion rate for tasks
 * @param {Array} tasks - Tasks to analyze
 * @returns {number} - Completion rate (0-1)
 *
 * Hint: Count done tasks / total tasks
 * Hint: Handle empty array case
 */
function calculateCompletionRate(tasks) {
  const total = tasks.length;
  const done = tasks.filter(task => task.status === 'done').length;
  return total === 0 ? 0 : done / total;
}

// ==================== TAG OPERATIONS ====================

/**
 * Gets all tasks with a specific tag
 * @param {string} tag - Tag to filter by
 * @returns {Array} - Tasks with this tag
 *
 * Hint: Filter tasks where tags array includes the tag
 */
function getTasksByTag(tag) {
  const normalizedTag = tag.toLowerCase();
  return tasks.filter(task => task.tags && task.tags.includes(normalizedTag));
}

/**
 * Adds a tag to a task
 * @param {string} taskId - Task ID
 * @param {string} tag - Tag to add
 * @returns {Object} - Updated task
 *
 * Logic:
 * - Normalize tag to lowercase
 * - Don't add if already exists
 * - Update updatedAt timestamp
 */
function addTagToTask(taskId, tag) {
  const task = findTaskBy('id', taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  const normalizedTag = tag.toLowerCase();
  if (!task.tags.includes(normalizedTag)) {
    task.tags.push(normalizedTag);
    task.updatedAt = new Date().toISOString();
  }
  return task;
}

/**
 * Removes a tag from a task
 * @param {string} taskId - Task ID
 * @param {string} tag - Tag to remove
 * @returns {Object} - Updated task
 *
 * Hint: Filter out the tag from the tags array
 */
function removeTagFromTask(taskId, tag) {
  const task = findTaskBy('id', taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  const normalizedTag = tag.toLowerCase();
  task.tags = task.tags.filter(t => t !== normalizedTag);
  task.updatedAt = new Date().toISOString();
  return task;
}

// ==================== EXPORTS ====================

// Export all functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // CRUD
    createTask,
    updateTask,
    deleteTask,
    getTaskById,

    // Filtering & Searching
    getTasks,
    searchTasks,
    getOverdueTasks,

    // Sorting
    sortTasks,

    // Queries
    getTasksByProject,
    getTasksByUser,
    getCompletedTasks,
    getUpcomingTasks,

    // Grouping
    groupTasksByStatus,
    groupTasksByPriority,

    // Analytics
    getProjectStats,
    getUserWorkload,
    calculateCompletionRate,

    // Tags
    getTasksByTag,
    addTagToTask,
    removeTagFromTask,

    // Data access (for testing)
    getTasks: () => tasks,
    getProjects: () => projects,
    getUsers: () => users
  };
}

// ==================== TESTING AREA ====================
// Uncomment to test your functions

/*
// Load sample data
const sampleData = require('./data');
tasks = sampleData.tasks;
projects = sampleData.projects;
users = sampleData.users;

// Test your functions here
console.log('Total tasks:', tasks.length);
console.log('High priority tasks:', getTasks({ priority: 'high' }).length);
console.log('User 1 workload:', getUserWorkload('user-1'));
*/
