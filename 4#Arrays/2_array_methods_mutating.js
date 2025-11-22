// Methods that CHANGE the original array
// Understanding mutation is critical for preventing bugs in React, Vue, and other frameworks.
let tasks = ['Write code', 'Review PR'];

// push() - Add to end (returns new length)
const newLength = tasks.push('Deploy');
console.log(tasks); // ['Write code', 'Review PR', 'Deploy']
console.log(newLength); // 3

// pop() - Remove from end (returns removed item)
const removed = tasks.pop();
console.log(tasks); // ['Write code', 'Review PR']
console.log(removed); // 'Deploy'

// unshift() - Add to beginning
tasks.unshift('Plan sprint');
console.log(tasks); // ['Plan sprint', 'Write code', 'Review PR']

// shift() - Remove from beginning
const firstTask = tasks.shift();
console.log(tasks); // ['Write code', 'Review PR']
console.log(firstTask); // 'Plan sprint'

// Corner case: Working with empty arrays
let emptyArray = [];
console.log(emptyArray.pop()); // undefined (no error)
console.log(emptyArray.shift()); // undefined (no error)

// splice() - The Swiss Army knife
let users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

// Remove 1 element at index 2
users.splice(2, 1); 
console.log(users); // ['Alice', 'Bob', 'David', 'Eve']

// Remove 2 elements starting at index 1
users.splice(1, 2);
console.log(users); // ['Alice', 'Eve']

// Insert without removing (deleteCount = 0)
users.splice(1, 0, 'Bob', 'Charlie');
console.log(users); // ['Alice', 'Bob', 'Charlie', 'Eve']

// Replace elements (remove + insert)
users.splice(1, 2, 'New User');
console.log(users); // ['Alice', 'New User', 'Eve']

// Real-world example: Managing a todo list
let todos = [
  { id: 1, text: 'Buy groceries', done: false },
  { id: 2, text: 'Walk dog', done: true },
  { id: 3, text: 'Study JS', done: false }
];

// Delete todo by index
function deleteTodo(index) {
  todos.splice(index, 1);
}

deleteTodo(1);
console.log(todos); // Removed 'Walk dog'

// sort() - Sorting with gotchas
// Default sort converts to strings!
const numbers = [10, 5, 40, 25, 1000, 1];
numbers.sort();
console.log(numbers); // [1, 10, 1000, 25, 40, 5] - WRONG!

// Correct numeric sort
numbers.sort((a, b) => a - b); // Ascending
console.log(numbers); // [1, 5, 10, 25, 40, 1000]

numbers.sort((a, b) => b - a); // Descending
console.log(numbers); // [1000, 40, 25, 10, 5, 1]

// String sorting (works as expected)
const names = ['Charlie', 'Alice', 'Bob'];
names.sort();
console.log(names); // ['Alice', 'Bob', 'Charlie']

// Case-insensitive sorting
const mixedCase = ['banana', 'Apple', 'cherry'];
mixedCase.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(mixedCase); // ['Apple', 'banana', 'cherry']