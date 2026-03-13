// Test Cases for validators.js
// email validation tests
const { 
  isValidEmail, 
  isValidDate, 
  isDateInPast,
  validateUser,
  validateTask,
  validateProject
} = require('../starter/validators');

console.log('Running Validator Tests...\n');

const testNameFilter = process.env.TEST_NAME;

if (testNameFilter) {
  console.log(`Filtering tests by name: "${testNameFilter}"\n`);
}

function test(description, testFn) {
  if (testNameFilter && description !== testNameFilter) {
    return;
  }

  try {
    testFn();
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  Error: ${error.message}`);
  }
}

function assertTrue(value, message) {
  if (!value) {
    throw new Error(message || `Expected truthy value, got ${value}`);
  }
}

function assertFalse(value, message) {
  if (value) {
    throw new Error(message || `Expected falsy value, got ${value}`);
  }
}

// Email validation tests
console.log('=== Email Validation ===');

test('Valid email format', () => {
  assertTrue(isValidEmail('test@example.com'));
});

test('Invalid email format', () => {
  assertFalse(isValidEmail('invalid-email'));
});

test('Empty string is not a valid email', () => {
  assertFalse(isValidEmail(''));
});

test('Email without @ is invalid', () => {
  assertFalse(isValidEmail('testexample.com'));
});

test('Email without domain is invalid', () => {
  assertFalse(isValidEmail('test@'));
});

test('Non-string input is invalid', () => {
  assertFalse(isValidEmail(123));
  assertFalse(isValidEmail(null));
  assertFalse(isValidEmail(undefined));
  assertFalse(isValidEmail(NaN));
});

// Date validation tests 
console.log('=== Date Validation ===');

test('Valid date format', () => {
  assertTrue(isValidDate('2023-12-31'));
});

test('Invalid date format', () => {
  assertFalse(isValidDate('2023-02-30'));
});

test('Invalid date format', () => {
  assertFalse(isValidDate('22-02-2023'));
});

test('Empty string is not a valid date', () => {
  assertFalse(isValidDate(''));
});

test('Non-string input is invalid', () => {
  assertFalse(isValidDate(123));
  assertFalse(isValidDate(null));
  assertFalse(isValidDate(undefined));
  assertFalse(isValidDate(NaN));
});

// Date in the past tests
console.log('=== Date in the Past ===');

test('Date in the past', () => {
  assertTrue(isDateInPast('2020-01-01'));
});

test('Date in the future', () => {
  assertFalse(isDateInPast('2030-01-01'));
});

test('Date +2 hours is not in the past', () => {
  const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  assertFalse(isDateInPast(twoHoursFromNow));
});

// Validation tests for validateUser

console.log('=== User Validation ===');

test('Valid user data', () => {
  const userData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'developer',
    active: true
  };
  const result = validateUser(userData);
  assertTrue(result.valid);
});

test('Invalid user data - missing required fields', () => {
  const userData = {
    id: '',
    name: '',
    email: 'invalid-email'
  };
  const result = validateUser(userData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid user data - invalid role', () => {
  const userData = {
    id: '2',
    name: 'Jane Doe',
    email: 'test.example@com',
    role: 'invalid-role'
  };
  const result = validateUser(userData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid user data - active is not boolean', () => {
  const userData = {
    id: '3',
    name: 'Alice',
    email: 'test@example.com',
    active: 'yes'
  };
  const result = validateUser(userData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid user data - name too short', () => {
  const userData = {
    id: '4',
    name: 'A',
    email: 'test@example.com'
  };
  const result = validateUser(userData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid user data - name too long', () => {
  const userData = {
    id: '5',
    name: 'A'.repeat(101),
    email: 'test@example.com'
  };
  const result = validateUser(userData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid user data - missing email', () => {
  const userData = {
    id: '6',
    name: 'Bob'
  };
  const result = validateUser(userData);
  assertFalse(result.valid);
  console.log(result.errors);
});

// Validation tests for validateTask

console.log('=== Task Validation ===');

test('Valid task data', () => {
  const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const taskData = {
    id: '1',
    title: 'Complete project',
    description: 'Finish the capstone project by the end of the month.',
    projectId: '1',
    assigneeId: '1',
    status: 'in-progress',
    priority: 'high',
    tags: ['capstone', 'project'],
    dueDate: futureDate,
    estimatedHours: 40
  };
  const result = validateTask(taskData);
  assertTrue(result.valid);
});

test('ISO timestamp is a valid date', () => {
  assertTrue(isValidDate('2024-01-15T10:00:00Z'));
});

test('Invalid task data - empty assigneeId', () => {
  const taskData = {
    title: 'Valid task title',
    projectId: 'proj-1',
    assigneeId: ''
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
});

test('Invalid task data - empty priority', () => {
  const taskData = {
    title: 'Valid task title',
    projectId: 'proj-1',
    priority: ''
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
});

test('Invalid task data - zero estimated hours', () => {
  const taskData = {
    title: 'Valid task title',
    projectId: 'proj-1',
    estimatedHours: 0
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
});

test('Invalid task data - missing required fields', () => {
  const taskData = {
    id: '',
    title: '',
    assignedTo: '',
    dueDate: 'invalid-date',
    status: 'invalid-status'
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid task data - invalid status', () => {
  const taskData = {
    id: '2',
    title: 'Test task',
    assignedTo: '1',
    dueDate: '2023-12-31',
    status: 'not-a-valid-status'
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid task data - due date in the past', () => {
  const taskData = {
    id: '3',
    title: 'Past task',
    assignedTo: '1',
    dueDate: '2020-01-01',
    status: 'pending'
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
  console.log(result.errors);
}); 

test('Invalid task data - missing title', () => {
  const taskData = {
    id: '4',
    assignedTo: '1',
    dueDate: '2023-12-31',
    status: 'pending'
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
  console.log(result.errors);
}); 

test('Invalid task data - title too long', () => {
  const taskData = {
    id: '5',
    title: 'A'.repeat(101),
    assignedTo: '1',
    dueDate: '2023-12-31',
    status: 'pending'
  };
  const result = validateTask(taskData);
  assertFalse(result.valid);
  console.log(result.errors);
}); 

// tests for validateProject

console.log('=== Project Validation ===');

test('Valid project data', () => {
  const projectData = {
    id: '1',
    name: 'Capstone Project',
    description: 'A project management tool for the capstone course.',
    ownerId: 'user-1',
    teamMembers: ['user-1', 'user-2'],
    status: 'active',
    deadline: '2099-12-31'
  };
  const result = validateProject(projectData);
  assertTrue(result.valid);
});

test('Invalid project data - missing required fields', () => {
  const projectData = {
    id: '',
    name: '',
    ownerId: ''
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid project data - invalid status', () => {
  const projectData = {
    id: '2',
    name: 'Test Project',
    ownerId: 'user-2',
    status: 'paused'
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid project data - missing name', () => {
  const projectData = {
    id: '3',
    ownerId: 'user-3',
    deadline: '2099-12-31'
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid project data - name too long', () => {
  const projectData = {
    id: '4',
    name: 'A'.repeat(101),
    ownerId: 'user-4',
    deadline: '2099-12-31'
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid project data - deadline in the past', () => {
  const projectData = {
    id: '5',
    name: 'Archived Project',
    ownerId: 'user-5',
    deadline: '2020-01-01'
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
  console.log(result.errors);
});

test('Invalid project data - empty status', () => {
  const projectData = {
    name: 'Project Mercury',
    ownerId: 'user-6',
    status: ''
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
});

test('Invalid project data - empty deadline', () => {
  const projectData = {
    name: 'Project Mercury',
    ownerId: 'user-6',
    deadline: ''
  };
  const result = validateProject(projectData);
  assertFalse(result.valid);
});


console.log('\nAll tests completed.');