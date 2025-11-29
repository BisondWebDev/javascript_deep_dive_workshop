# Getting Started with the Capstone Project

Quick start guide to begin working on the Task Management System.

## Step-by-Step Setup

### 1. Review the Requirements
Start by reading the project requirements:
```bash
# Open and read:
6#CapstoneProject/project-requirements.md
```

This document contains:
- Data structure specifications
- All function requirements
- Validation rules
- Expected inputs/outputs

### 2. Understand the Sample Data
Open and review the sample data:
```bash
node starter/data.js
```

Or simply read [starter/data.js](starter/data.js) to see:
- Sample users
- Sample projects
- Sample tasks with various statuses and priorities

### 3. Start with Validators
Begin by implementing the validation functions:

**File to edit:** `starter/validators.js`

Implement in this order:
1. `isValidEmail()` - Simple email validation
2. `isValidDate()` - Date string validation
3. `isDateInPast()` - Check if date is in past
4. `validateUser()` - User data validation
5. `validateTask()` - Task data validation
6. `validateProject()` - Project data validation

**Test your validators:**
```javascript
// Add to bottom of validators.js
const user = { name: 'Alice', email: 'alice@example.com', role: 'developer' };
console.log(validateUser(user)); // Should return { valid: true }

const badUser = { name: 'A', email: 'invalid' };
console.log(validateUser(badUser)); // Should return { valid: false, errors: [...] }
```

### 4. Implement Utilities
Next, work on utility functions:

**File to edit:** `starter/utils.js`

Implement in this order:
1. `generateId()` - Create unique IDs
2. `priorityValue()` - Convert priority to number
3. `isOverdue()` - Check if date is past
4. `normalizeString()` - String normalization
5. `deepClone()` - Object cloning
6. `formatDate()` - Date formatting (optional)
7. `groupBy()` - Array grouping helper

**Test your utilities:**
```javascript
console.log(generateId('task')); // task-xxxxx
console.log(priorityValue('high')); // 3
console.log(isOverdue('2023-01-01')); // true
```

### 5. Build the Task Manager
Now implement the core application:

**File to edit:** `starter/task-manager.js`

**Recommended order:**

**Phase 1: CRUD (Start here)**
1. `createTask()` - Create new tasks
2. `getTaskById()` - Retrieve by ID
3. `updateTask()` - Update existing tasks
4. `deleteTask()` - Remove tasks

**Phase 2: Filtering**
5. `getTasks()` - Filter with multiple criteria
6. `searchTasks()` - Keyword search
7. `getTasksByProject()` - Project-specific tasks
8. `getTasksByUser()` - User-specific tasks
9. `getOverdueTasks()` - Find overdue items

**Phase 3: Sorting & Grouping**
10. `sortTasks()` - Sort by various fields
11. `groupTasksByStatus()` - Group by status
12. `groupTasksByPriority()` - Group by priority

**Phase 4: Analytics**
13. `calculateCompletionRate()` - Completion percentage
14. `getProjectStats()` - Project statistics
15. `getUserWorkload()` - User workload info

**Phase 5: Advanced Features**
16. `getUpcomingTasks()` - Tasks due soon
17. `getCompletedTasks()` - Completed in date range
18. `addTagToTask()` - Add tags
19. `removeTagFromTask()` - Remove tags
20. `getTasksByTag()` - Filter by tag

### 6. Test Your Implementation

**Quick Manual Tests:**
```bash
# Add to bottom of task-manager.js
const sampleData = require('./data');
tasks = sampleData.tasks;

console.log('Total tasks:', tasks.length);
console.log('High priority:', getTasks({ priority: 'high' }).length);
console.log('In progress:', getTasks({ status: 'in-progress' }).length);
```

**Run Automated Tests:**
```bash
cd 6#CapstoneProject
node tests/test-cases.js
```
## Development Tips

### Start Small
Don't try to implement everything at once. Start with one function, test it, then move to the next.

### Use Console.log()
Debug by logging intermediate values:
```javascript
function getTasks(filters) {
  console.log('Filters:', filters);
  const filtered = tasks.filter(task => {
    console.log('Checking task:', task.id);
    // your logic
  });
  console.log('Result:', filtered);
  return filtered;
}
```

### Test Frequently
After implementing each function:
1. Write a quick test at the bottom of the file
2. Run the file: `node starter/task-manager.js`
3. Check the output
4. Fix any issues before moving on

### Handle Edge Cases
Always consider:
- Empty arrays
- Null/undefined values
- Invalid inputs
- Missing properties

### Follow the Patterns

**Immutability:**
```javascript
// DON'T
function updateTask(id, updates) {
  const task = tasks.find(t => t.id === id);
  task.title = updates.title; // ❌ Mutation
  return task;
}

// DO
function updateTask(id, updates) {
  return tasks.map(task =>
    task.id === id ? { ...task, ...updates } : task
  );
}
```

**Guard Clauses:**
```javascript
function createTask(data) {
  if (!data) throw new Error('Data required');
  if (!data.title) throw new Error('Title required');

  // Main logic here
}
```

**Functional Methods:**
```javascript
// Use filter, map, reduce instead of loops
const highPriority = tasks
  .filter(t => t.priority === 'high')
  .map(t => ({ id: t.id, title: t.title }));
```

## Common Issues & Solutions

### Issue: "Cannot read property of undefined"
**Solution:** Use optional chaining or check for null:
```javascript
// Instead of: task.assignee.name
// Use:
task.assignee?.name
// Or:
task.assignee && task.assignee.name
```

### Issue: "Task not found after creation"
**Solution:** Make sure you're adding to the tasks array:
```javascript
function createTask(data) {
  const newTask = { id: generateId('task'), ...data };
  tasks.push(newTask); // Don't forget this!
  return newTask;
}
```

### Issue: "Tests failing for immutability"
**Solution:** Return new arrays/objects, don't modify originals:
```javascript
// Wrong:
tasks[index] = updatedTask;

// Right:
tasks = tasks.map(t => t.id === id ? updatedTask : t);
```

### Issue: "Filter not working with multiple criteria"
**Solution:** Check each filter only if it exists:
```javascript
function getTasks(filters) {
  return tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });
}
```

## Success Criteria

You've successfully completed the project when:

- ✓ All required functions are implemented
- ✓ Test suite passes without errors
- ✓ Code follows best practices (immutability, pure functions)
- ✓ Edge cases are handled
- ✓ Code is readable and well-commented
- ✓ You understand WHY each solution works

## Next Steps

After completing the basic project:

1. **Extend the functionality:**
   - Add task dependencies
   - Implement time tracking
   - Add recurring tasks
   - Create task templates

2. **Add persistence:**
   - Save data to JSON file
   - Implement localStorage
   - Create a simple database

3. **Build a UI:**
   - Create HTML interface
   - Add interactive forms
   - Implement drag-and-drop
   - Use a framework (React, Vue)

4. **Optimize:**
   - Add caching
   - Improve search performance
   - Implement pagination

## Resources

- **Main README:** [../README.md](README.md)
- **Requirements:** [project-requirements.md](project-requirements.md)
- **Solutions:** Check `solution/` folder after attempting

## Getting Help

If stuck:
1. Re-read the requirements
2. Check the hints in starter files
3. Review relevant workshop sections
4. Look at sample data structure
5. Try console.log debugging
6. Compare with solution (last resort!)

---

**Ready to begin?** Start with [starter/validators.js](starter/validators.js)

Good luck! Remember: the goal is learning, not speed. Take your time to understand each concept.
