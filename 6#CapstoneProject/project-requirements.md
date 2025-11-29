# Task Management System - Requirements

## Data Structures

### User Object
```javascript
{
  id: 'user-1',           // Unique identifier
  name: 'Alice Johnson',  // Full name
  email: 'alice@example.com',
  role: 'developer',      // Role in the organization
  active: true            // Is user active?
}
```

### Project Object
```javascript
{
  id: 'proj-1',
  name: 'Website Redesign',
  description: 'Complete redesign of company website',
  ownerId: 'user-1',      // User who owns the project
  teamMembers: ['user-1', 'user-2', 'user-3'],
  status: 'active',       // active, on-hold, completed
  createdAt: '2024-01-15T10:00:00Z',
  deadline: '2024-12-31'
}
```

### Task Object
```javascript
{
  id: 'task-1',
  title: 'Design homepage mockup',
  description: 'Create initial design mockups for the homepage',
  projectId: 'proj-1',
  assigneeId: 'user-2',   // User assigned to the task
  creatorId: 'user-1',    // User who created the task
  status: 'in-progress',  // todo, in-progress, done, blocked
  priority: 'high',       // low, medium, high, urgent
  tags: ['design', 'ui'], // Array of tags
  dueDate: '2024-02-15',
  estimatedHours: 8,
  createdAt: '2024-01-20T09:00:00Z',
  updatedAt: '2024-01-22T14:30:00Z',
  completedAt: null       // ISO string when completed, or null
}
```

## Required Functions

### 1. Validators (validators.js)

#### `validateUser(userData)`
**Purpose**: Validate user data before creation/update

**Parameters**:
- `userData` (Object): User data to validate

**Returns**:
- `{ valid: true }` if valid
- `{ valid: false, errors: [...] }` if invalid

**Validation Rules**:
- `name`: Required, non-empty string, 2-100 characters
- `email`: Required, valid email format
- `role`: Optional, must be one of: developer, designer, manager, admin
- `active`: Optional, must be boolean

**Example**:
```javascript
validateUser({ name: 'Alice', email: 'alice@example.com' });
// { valid: true }

validateUser({ name: '', email: 'invalid' });
// { valid: false, errors: ['Name is required', 'Invalid email format'] }
```

---

#### `validateTask(taskData)`
**Purpose**: Validate task data

**Parameters**:
- `taskData` (Object): Task data to validate

**Returns**:
- `{ valid: true }` if valid
- `{ valid: false, errors: [...] }` if invalid

**Validation Rules**:
- `title`: Required, non-empty string, 5-200 characters
- `description`: Optional, max 1000 characters
- `projectId`: Required, non-empty string
- `assigneeId`: Optional, non-empty string if provided
- `status`: Must be one of: todo, in-progress, done, blocked
- `priority`: Must be one of: low, medium, high, urgent
- `tags`: Optional, must be array of strings if provided
- `dueDate`: Optional, must be valid date string, not in the past
- `estimatedHours`: Optional, must be positive number if provided

---

#### `validateProject(projectData)`
**Purpose**: Validate project data

**Parameters**:
- `projectData` (Object): Project data to validate

**Returns**:
- `{ valid: true }` if valid
- `{ valid: false, errors: [...] }` if invalid

**Validation Rules**:
- `name`: Required, non-empty string, 3-100 characters
- `description`: Optional, max 500 characters
- `ownerId`: Required, non-empty string
- `teamMembers`: Optional, must be array of strings if provided
- `status`: Must be one of: active, on-hold, completed
- `deadline`: Optional, must be valid date string, not in the past

---

### 2. Utilities (utils.js)

#### `generateId(prefix)`
**Purpose**: Generate unique IDs

**Parameters**:
- `prefix` (String): Prefix for ID (e.g., 'task', 'user', 'proj')

**Returns**: String - Unique ID

**Example**:
```javascript
generateId('task'); // 'task-a7b3c9d2'
generateId('user'); // 'user-f3e8a1b4'
```

---

#### `formatDate(dateString, format)`
**Purpose**: Format date strings

**Parameters**:
- `dateString` (String): ISO date string
- `format` (String): 'short' | 'long' | 'relative'

**Returns**: String - Formatted date

**Example**:
```javascript
formatDate('2024-01-15T10:00:00Z', 'short'); // '01/15/2024'
formatDate('2024-01-15T10:00:00Z', 'long'); // 'January 15, 2024'
formatDate('2024-01-15T10:00:00Z', 'relative'); // '5 days ago'
```

---

#### `isOverdue(dueDate)`
**Purpose**: Check if a date is overdue

**Parameters**:
- `dueDate` (String): ISO date string

**Returns**: Boolean

**Example**:
```javascript
isOverdue('2023-01-01'); // true
isOverdue('2025-12-31'); // false
```

---

#### `priorityValue(priority)`
**Purpose**: Convert priority string to numeric value for sorting

**Parameters**:
- `priority` (String): 'low', 'medium', 'high', or 'urgent'

**Returns**: Number (1-4)

**Example**:
```javascript
priorityValue('low'); // 1
priorityValue('medium'); // 2
priorityValue('high'); // 3
priorityValue('urgent'); // 4
```

---

#### `deepClone(obj)`
**Purpose**: Create a deep copy of an object

**Parameters**:
- `obj` (Object): Object to clone

**Returns**: Object - Deep copy

**Example**:
```javascript
const original = { user: { name: 'Alice' } };
const clone = deepClone(original);
clone.user.name = 'Bob';
console.log(original.user.name); // 'Alice' (unchanged)
```

---

### 3. Task Manager (task-manager.js)

#### `createTask(taskData)`
**Purpose**: Create a new task

**Parameters**:
- `taskData` (Object): Task data (without id, timestamps)

**Returns**: Object - New task with generated id and timestamps

**Logic**:
1. Validate task data
2. Generate unique ID
3. Set default values (status: 'todo', tags: [], completedAt: null)
4. Add timestamps (createdAt, updatedAt)
5. Add to tasks array
6. Return the new task

**Example**:
```javascript
const task = createTask({
  title: 'Design homepage',
  projectId: 'proj-1',
  assigneeId: 'user-1',
  priority: 'high'
});
```

---

#### `updateTask(taskId, updates)`
**Purpose**: Update an existing task (immutably)

**Parameters**:
- `taskId` (String): ID of task to update
- `updates` (Object): Properties to update

**Returns**: Object - Updated task

**Logic**:
1. Find task by ID
2. Throw error if not found
3. Validate updates
4. Create new task object with updates
5. Update `updatedAt` timestamp
6. If status changed to 'done', set `completedAt`
7. Replace old task with updated task
8. Return updated task

---

#### `deleteTask(taskId)`
**Purpose**: Delete a task

**Parameters**:
- `taskId` (String): ID of task to delete

**Returns**: Boolean - true if deleted, false if not found

---

#### `getTaskById(taskId)`
**Purpose**: Get a single task by ID

**Parameters**:
- `taskId` (String): Task ID

**Returns**: Object | null - Task object or null if not found

---

#### `getTasks(filters)`
**Purpose**: Get tasks with optional filtering

**Parameters**:
- `filters` (Object): Optional filters
  - `status`: Filter by status
  - `priority`: Filter by priority
  - `assigneeId`: Filter by assignee
  - `projectId`: Filter by project
  - `tag`: Filter by tag (tasks with this tag)
  - `overdue`: Boolean, if true only show overdue tasks

**Returns**: Array - Filtered tasks

**Example**:
```javascript
getTasks({ status: 'in-progress', priority: 'high' });
getTasks({ projectId: 'proj-1', overdue: true });
getTasks({ tag: 'design' });
```

---

#### `searchTasks(keyword)`
**Purpose**: Search tasks by keyword in title or description

**Parameters**:
- `keyword` (String): Search term (case-insensitive)

**Returns**: Array - Matching tasks

---

#### `sortTasks(tasks, sortBy, order)`
**Purpose**: Sort tasks

**Parameters**:
- `tasks` (Array): Tasks to sort
- `sortBy` (String): 'priority' | 'dueDate' | 'createdAt' | 'title'
- `order` (String): 'asc' | 'desc'

**Returns**: Array - Sorted tasks (new array)

**Example**:
```javascript
sortTasks(tasks, 'priority', 'desc'); // High priority first
sortTasks(tasks, 'dueDate', 'asc'); // Earliest due date first
```

---

#### `getTasksByProject(projectId)`
**Purpose**: Get all tasks for a project

**Parameters**:
- `projectId` (String): Project ID

**Returns**: Array - Tasks for this project

---

#### `getTasksByUser(userId)`
**Purpose**: Get all tasks assigned to a user

**Parameters**:
- `userId` (String): User ID

**Returns**: Array - Tasks assigned to this user

---

#### `getOverdueTasks()`
**Purpose**: Get all overdue tasks (not completed and past due date)

**Returns**: Array - Overdue tasks

---

#### `getCompletedTasks(startDate, endDate)`
**Purpose**: Get tasks completed within a date range

**Parameters**:
- `startDate` (String): Start date (ISO string)
- `endDate` (String): End date (ISO string)

**Returns**: Array - Completed tasks in range

---

#### `getProjectStats(projectId)`
**Purpose**: Get statistics for a project

**Parameters**:
- `projectId` (String): Project ID

**Returns**: Object with stats
```javascript
{
  total: 15,
  todo: 5,
  inProgress: 7,
  done: 3,
  blocked: 0,
  completionRate: 0.2,  // 3/15
  overdue: 2
}
```

---

#### `getUserWorkload(userId)`
**Purpose**: Get workload statistics for a user

**Parameters**:
- `userId` (String): User ID

**Returns**: Object with workload info
```javascript
{
  userId: 'user-1',
  assignedTasks: 10,
  completedTasks: 6,
  inProgressTasks: 3,
  todoTasks: 1,
  totalEstimatedHours: 40,
  overdueTasksCount: 2
}
```

---

#### `groupTasksByStatus(tasks)`
**Purpose**: Group tasks by their status

**Parameters**:
- `tasks` (Array): Tasks to group

**Returns**: Object with tasks grouped by status
```javascript
{
  todo: [...],
  'in-progress': [...],
  done: [...],
  blocked: [...]
}
```

---

#### `groupTasksByPriority(tasks)`
**Purpose**: Group tasks by priority

**Parameters**:
- `tasks` (Array): Tasks to group

**Returns**: Object with tasks grouped by priority
```javascript
{
  low: [...],
  medium: [...],
  high: [...],
  urgent: [...]
}
```

---

#### `getUpcomingTasks(days)`
**Purpose**: Get tasks due within the next N days

**Parameters**:
- `days` (Number): Number of days to look ahead

**Returns**: Array - Tasks due within the period

**Example**:
```javascript
getUpcomingTasks(7); // Tasks due in next 7 days
```

---

#### `calculateCompletionRate(tasks)`
**Purpose**: Calculate what percentage of tasks are completed

**Parameters**:
- `tasks` (Array): Tasks to analyze

**Returns**: Number - Completion rate (0-1)

---

#### `getTasksByTag(tag)`
**Purpose**: Get all tasks with a specific tag

**Parameters**:
- `tag` (String): Tag to filter by

**Returns**: Array - Tasks with this tag

---

#### `addTagToTask(taskId, tag)`
**Purpose**: Add a tag to a task

**Parameters**:
- `taskId` (String): Task ID
- `tag` (String): Tag to add

**Returns**: Object - Updated task

**Logic**:
- Don't add duplicate tags
- Tags should be lowercase
- Update `updatedAt`

---

#### `removeTagFromTask(taskId, tag)`
**Purpose**: Remove a tag from a task

**Parameters**:
- `taskId` (String): Task ID
- `tag` (String): Tag to remove

**Returns**: Object - Updated task

---

## Advanced Features (Optional)

### Task Dependencies

#### `addDependency(taskId, dependsOnTaskId)`
Add a dependency relationship

#### `canStartTask(taskId)`
Check if all dependencies are completed

#### `getBlockedTasks()`
Get tasks blocked by incomplete dependencies

### Bulk Operations

#### `bulkUpdateTasks(taskIds, updates)`
Update multiple tasks at once

#### `bulkDeleteTasks(taskIds)`
Delete multiple tasks

### Reports

#### `generateProjectReport(projectId)`
Comprehensive project report with charts-ready data

#### `generateUserReport(userId)`
User performance and workload report

---

## Implementation Guidelines

### Error Handling

Always validate inputs and provide clear error messages:

```javascript
function createTask(taskData) {
  if (!taskData) {
    throw new Error('Task data is required');
  }

  const validation = validateTask(taskData);
  if (!validation.valid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }

  // ... rest of implementation
}
```

### Immutability

Never mutate the original data:

```javascript
// BAD
function updateTask(taskId, updates) {
  const task = tasks.find(t => t.id === taskId);
  task.title = updates.title; // ❌ Mutation!
  return task;
}

// GOOD
function updateTask(taskId, updates) {
  return tasks.map(task =>
    task.id === taskId
      ? { ...task, ...updates, updatedAt: new Date().toISOString() }
      : task
  );
}
```

### Pure Functions

Functions should be pure when possible:

```javascript
// Pure function - no side effects
function calculateCompletionRate(tasks) {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'done').length;
  return completed / tasks.length;
}
```

### Functional Programming

Use array methods for data transformation:

```javascript
function getTopPriorityTasks(limit = 5) {
  return tasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority))
    .slice(0, limit);
}
```

---

## Testing

Test your implementation with:
1. Empty inputs
2. Invalid inputs
3. Valid inputs
4. Edge cases (empty arrays, null values, etc.)
5. Multiple filters combined
6. Date edge cases (past, future, today)

Good luck!
