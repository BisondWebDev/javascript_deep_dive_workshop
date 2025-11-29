// Test Cases for Task Management System
// Run this file to test your implementation

// Import sample data
const sampleData = require('../starter/data');

// Try to import your implementation
// If it fails, you'll need to implement the functions first
let taskManager;
try {
  taskManager = require('../starter/task-manager');
} catch (error) {
  console.error('Could not load task-manager.js');
  console.error('Make sure you have implemented the required functions');
  process.exit(1);
}

// Test results tracking
let passedTests = 0;
let failedTests = 0;

function test(description, testFn) {
  try {
    testFn();
    console.log(`✓ ${description}`);
    passedTests++;
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  Error: ${error.message}`);
    failedTests++;
  }
}

function assertEquals(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

function assertTrue(value, message) {
  if (!value) {
    throw new Error(message || `Expected truthy value, got ${value}`);
  }
}

console.log('Running Task Management System Tests...\n');

// ==================== CRUD TESTS ====================
console.log('=== CRUD Operations ===');

test('Create a new task', () => {
  const newTask = taskManager.createTask({
    title: 'Test Task',
    description: 'This is a test task',
    projectId: 'proj-test',
    priority: 'high'
  });

  assertTrue(newTask.id, 'Task should have an ID');
  assertEquals(newTask.title, 'Test Task');
  assertEquals(newTask.status, 'todo', 'Default status should be todo');
});

test('Update a task', () => {
  const task = taskManager.createTask({
    title: 'Task to Update',
    projectId: 'proj-test',
    priority: 'low'
  });

  const updated = taskManager.updateTask(task.id, {
    status: 'in-progress',
    priority: 'high'
  });

  assertEquals(updated.status, 'in-progress');
  assertEquals(updated.priority, 'high');
});

test('Delete a task', () => {
  const task = taskManager.createTask({
    title: 'Task to Delete',
    projectId: 'proj-test'
  });

  const deleted = taskManager.deleteTask(task.id);
  assertTrue(deleted, 'Delete should return true');

  const found = taskManager.getTaskById(task.id);
  assertEquals(found, null, 'Deleted task should not be found');
});

// ==================== FILTERING TESTS ====================
console.log('\n=== Filtering & Searching ===');

test('Filter tasks by status', () => {
  const inProgress = taskManager.getTasks({ status: 'in-progress' });
  assertTrue(Array.isArray(inProgress), 'Should return an array');
  if (inProgress.length > 0) {
    assertTrue(inProgress.every(t => t.status === 'in-progress'));
  }
});

test('Filter tasks by priority', () => {
  const highPriority = taskManager.getTasks({ priority: 'high' });
  assertTrue(Array.isArray(highPriority), 'Should return an array');
});

test('Search tasks by keyword', () => {
  const results = taskManager.searchTasks('design');
  assertTrue(Array.isArray(results), 'Should return an array');
});

test('Get overdue tasks', () => {
  const overdue = taskManager.getOverdueTasks();
  assertTrue(Array.isArray(overdue), 'Should return an array');
});

// ==================== SORTING TESTS ====================
console.log('\n=== Sorting ===');

test('Sort tasks by priority (desc)', () => {
  const allTasks = taskManager.getTasks({});
  if (allTasks.length > 1) {
    const sorted = taskManager.sortTasks(allTasks, 'priority', 'desc');
    assertTrue(Array.isArray(sorted), 'Should return an array');
    // Check that it's a new array
    assertTrue(sorted !== allTasks, 'Should return a new array');
  }
});

// ==================== ANALYTICS TESTS ====================
console.log('\n=== Analytics ===');

test('Calculate completion rate', () => {
  const tasks = [
    { status: 'done' },
    { status: 'done' },
    { status: 'todo' },
    { status: 'in-progress' }
  ];
  const rate = taskManager.calculateCompletionRate(tasks);
  assertEquals(rate, 0.5, 'Completion rate should be 0.5 (50%)');
});

test('Get project stats', () => {
  const stats = taskManager.getProjectStats('proj-1');
  assertTrue(typeof stats === 'object', 'Should return an object');
  assertTrue('total' in stats, 'Should have total property');
  assertTrue('completionRate' in stats, 'Should have completionRate');
});

test('Get user workload', () => {
  const workload = taskManager.getUserWorkload('user-1');
  assertTrue(typeof workload === 'object', 'Should return an object');
  assertTrue('assignedTasks' in workload, 'Should have assignedTasks');
  assertTrue('completedTasks' in workload, 'Should have completedTasks');
});

// ==================== GROUPING TESTS ====================
console.log('\n=== Grouping ===');

test('Group tasks by status', () => {
  const allTasks = taskManager.getTasks({});
  const grouped = taskManager.groupTasksByStatus(allTasks);
  assertTrue(typeof grouped === 'object', 'Should return an object');
});

test('Group tasks by priority', () => {
  const allTasks = taskManager.getTasks({});
  const grouped = taskManager.groupTasksByPriority(allTasks);
  assertTrue(typeof grouped === 'object', 'Should return an object');
});

// ==================== TAG TESTS ====================
console.log('\n=== Tag Operations ===');

test('Add tag to task', () => {
  const task = taskManager.createTask({
    title: 'Tagged Task',
    projectId: 'proj-test',
    tags: ['initial']
  });

  const updated = taskManager.addTagToTask(task.id, 'NewTag');
  assertTrue(updated.tags.includes('newtag'), 'Tag should be added in lowercase');
});

test('Get tasks by tag', () => {
  const tasks = taskManager.getTasksByTag('design');
  assertTrue(Array.isArray(tasks), 'Should return an array');
});

// ==================== RESULTS ====================
console.log('\n' + '='.repeat(50));
console.log('Test Results:');
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Total: ${passedTests + failedTests}`);

if (failedTests === 0) {
  console.log('\n🎉 All tests passed! Great work!');
} else {
  console.log('\n⚠️  Some tests failed. Review the errors above.');
}
