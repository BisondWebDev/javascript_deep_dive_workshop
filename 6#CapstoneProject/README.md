# Capstone Project: Task Management System

Welcome to the final section of the JavaScript Deep Dive Workshop! This capstone project brings together everything you've learned in sections 1-5 to build a real-world application.

## Project Overview

You'll build a **Task Management System** (similar to Trello or Asana) that manages tasks, projects, and users. This project simulates real-world JavaScript development where you need to manipulate data, validate inputs, transform objects, and create reusable functions.

## What You'll Build

A complete task management system with the following features:

1. **User Management**: Create, update, and manage users
2. **Project Management**: Organize tasks into projects
3. **Task Operations**: Create, update, filter, and sort tasks
4. **Analytics**: Generate reports and statistics
5. **Data Validation**: Ensure data integrity
6. **Search & Filter**: Find tasks by various criteria

## Concepts Covered

This project integrates concepts from all previous sections:

### From Section 1: JavaScript Fundamentals
- ✓ Variable declarations (`const`, `let`)
- ✓ Data types (objects, arrays, primitives)
- ✓ Type coercion and validation
- ✓ Scope management

### From Section 2: Conditional Rendering
- ✓ Input validation with guard clauses
- ✓ Status checks and conditional logic
- ✓ Ternary operators for concise assignments
- ✓ Short-circuit evaluation

### From Section 3: Functions
- ✓ Pure functions for data transformation
- ✓ Callback functions
- ✓ Function composition
- ✓ Higher-order functions
- ✓ Arrow functions

### From Section 4: Arrays
- ✓ Array methods (`map`, `filter`, `reduce`)
- ✓ Array searching and testing
- ✓ Method chaining
- ✓ Array destructuring
- ✓ Sorting and grouping data

### From Section 5: Objects
- ✓ Object creation and manipulation
- ✓ Object destructuring
- ✓ Spread operator for immutable updates
- ✓ Object methods (`Object.keys`, `Object.values`, `Object.entries`)
- ✓ Nested object handling
- ✓ Optional chaining

## Project Structure

```
6#CapstoneProject/
├── README.md                    # This file
├── project-requirements.md      # Detailed requirements
├── starter/
│   ├── data.js                 # Sample data structures
│   ├── task-manager.js         # Main implementation file (your code here)
│   ├── validators.js           # Validation functions (your code here)
│   └── utils.js                # Utility functions (your code here)
├── solution/
│   ├── task-manager.js         # Complete solution
│   ├── validators.js           # Solution for validators
│   └── utils.js                # Solution for utilities
└── tests/
    └── test-cases.js           # Test cases to verify your solution
```

## Getting Started

### Step 1: Understand the Data Structure

Review [starter/data.js](./starter/data.js) to understand:
- User objects
- Project objects
- Task objects
- Priority and status enums

### Step 2: Read Requirements

Read [project-requirements.md](./project-requirements.md) for detailed feature specifications.

### Step 3: Implement Features

Work through the implementation in this order:

1. **Validators** ([starter/validators.js](./starter/validators.js))
   - Input validation functions
   - Type checking
   - Business rule validation

2. **Utilities** ([starter/utils.js](./starter/utils.js))
   - Helper functions
   - Data transformation
   - Reusable logic

3. **Task Manager** ([starter/task-manager.js](./starter/task-manager.js))
   - Core application logic
   - CRUD operations
   - Analytics and reporting

### Step 4: Test Your Solution

Run the test cases in [tests/test-cases.js](./tests/test-cases.js):

```bash
node tests/test-cases.js
```

## Features to Implement

### Core Features (Required)

1. **Task CRUD Operations**
   - Create new tasks
   - Update task properties
   - Delete tasks
   - Mark tasks as complete

2. **Filtering & Searching**
   - Filter by status (todo, in-progress, done)
   - Filter by priority (low, medium, high)
   - Filter by assignee
   - Search by keywords

3. **Sorting**
   - Sort by priority
   - Sort by due date
   - Sort by creation date

4. **Analytics**
   - Get task completion rate
   - Count tasks by status
   - Get overdue tasks
   - Get user workload

### Advanced Features (Optional Challenges)

5. **Task Dependencies**
   - Block tasks until dependencies are complete
   - Validate dependency chains

6. **Time Tracking**
   - Add estimated time
   - Track actual time spent
   - Calculate time variance

7. **Tags & Labels**
   - Add multiple tags to tasks
   - Filter by tags
   - Tag analytics

8. **User Permissions**
   - Role-based access (admin, member, viewer)
   - Permission validation

## Example Usage

Here's what your completed system should be able to do:

```javascript
// Create a task
const newTask = createTask({
  title: 'Build authentication system',
  description: 'Implement JWT-based auth',
  projectId: 'proj-1',
  assigneeId: 'user-1',
  priority: 'high',
  dueDate: '2024-12-31'
});

// Get all high-priority tasks
const urgentTasks = getTasks({
  priority: 'high',
  status: 'in-progress'
});

// Update task status
const updated = updateTask('task-1', {
  status: 'done',
  completedAt: new Date().toISOString()
});

// Get analytics
const stats = getProjectStats('proj-1');
// Returns: { total: 10, completed: 7, inProgress: 2, todo: 1, completionRate: 0.7 }

// Get user workload
const workload = getUserWorkload('user-1');
// Returns: { userId: 'user-1', assignedTasks: 5, completedTasks: 3, pendingTasks: 2 }
```

## Best Practices to Follow

As you implement this project, apply these best practices:

### 1. Immutability
```javascript
// DON'T mutate data
function updateTask(tasks, id, updates) {
  const task = tasks.find(t => t.id === id);
  task.title = updates.title; // ❌ Mutation!
  return tasks;
}

// DO create new objects
function updateTask(tasks, id, updates) {
  return tasks.map(task =>
    task.id === id
      ? { ...task, ...updates, updatedAt: new Date().toISOString() }
      : task
  );
}
```

### 2. Guard Clauses
```javascript
function createTask(data) {
  // Validate early
  if (!data) throw new Error('Task data is required');
  if (!data.title) throw new Error('Title is required');
  if (!data.projectId) throw new Error('Project ID is required');

  // Main logic
  return {
    id: generateId(),
    ...data,
    status: 'todo',
    createdAt: new Date().toISOString()
  };
}
```

### 3. Pure Functions
```javascript
// Pure - no side effects, same input = same output
function calculateCompletionRate(tasks) {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'done').length;
  return completed / tasks.length;
}
```

### 4. Functional Array Methods
```javascript
// Chain operations for readability
function getTopPriorityTasks(tasks, limit = 5) {
  return tasks
    .filter(task => task.status !== 'done')
    .sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority))
    .slice(0, limit)
    .map(task => ({
      id: task.id,
      title: task.title,
      priority: task.priority,
      dueDate: task.dueDate
    }));
}
```

### 5. Descriptive Names
```javascript
// Use clear, descriptive names
function getOverdueTasks(tasks) {  // ✓ Clear purpose
  const now = new Date();
  return tasks.filter(task =>
    task.status !== 'done' &&
    new Date(task.dueDate) < now
  );
}
```

## Tips for Success

1. **Start Small**: Implement one feature at a time
2. **Test Often**: Run test cases frequently
3. **Read Requirements**: Understand what's needed before coding
4. **Use Console.log**: Debug by logging intermediate values
5. **Refactor**: Your first solution doesn't need to be perfect
6. **Check Solutions**: Learn from the solution after attempting yourself
7. **Ask Questions**: If requirements are unclear, clarify first

Don't rush! This is about learning and applying concepts.

## Resources

- Review previous sections for specific concepts
- Use MDN for JavaScript method references
- The solution files include detailed comments explaining approaches

## Next Steps After Completion

1. **Add a UI**: Build a simple HTML/CSS interface
2. **Persistence**: Add localStorage to save data
3. **Advanced Features**: Implement the optional challenges
4. **Refactor**: Optimize your code
5. **Extend**: Add your own features (notifications, recurring tasks, etc.)

## Getting Help

If you get stuck:

1. Review the relevant section (check which concept you're struggling with)
2. Check the test cases to understand expected behavior
3. Look at the starter code hints
4. Try to solve it before checking the solution
5. Compare your solution with the provided solution

---

## Ready to Start?

**Begin with:** [Project Requirements](./project-requirements.md)

Then start coding in: [starter/task-manager.js](./starter/task-manager.js)

Good luck! This project will solidify your JavaScript fundamentals and give you a real-world example for your portfolio.

---

## Previous Section
- [Section 5: Objects](../5%23Objects/README.md)
