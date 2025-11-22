// Section 1: Spread Operator with Arrays
const original = [1, 2, 3];

// Wrong: This doesn't copy, it references
const wrong = original;
wrong.push(4);
console.log(original); // [1, 2, 3, 4] - Oops!

// Right: Spread creates a new array
const copy = [...original];
copy.push(5);
console.log(original); // [1, 2, 3, 4] - unchanged
console.log(copy); // [1, 2, 3, 4, 5]

// Corner case: Shallow copy only
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const usersCopy = [...users];
usersCopy[0].name = 'CHANGED';

console.log(users[0].name); // 'CHANGED' - Objects are still referenced!

// For deep copy, need different approach
const deepCopy = users.map(user => ({ ...user }));
deepCopy[0].name = 'Alice';
console.log(users[0].name); // 'CHANGED' - originals unaffected now

// --Section 2: Combining arrays
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'broccoli'];

// Combine multiple arrays
const food = [...fruits, ...vegetables];
console.log(food); // ['apple', 'banana', 'carrot', 'broccoli']

// Insert in the middle
const numbers = [1, 2, 5, 6];
const complete = [1, 2, ...[3, 4], 5, 6];
console.log(complete); // [1, 2, 3, 4, 5, 6]

// Add elements while spreading
const extended = [...fruits, 'orange', ...vegetables];
console.log(extended); // ['apple', 'banana', 'orange', 'carrot', 'broccoli']

// Real-world example: Managing state updates
// React-style state management
let todos = [
  { id: 1, text: 'Learn JS', done: false },
  { id: 2, text: 'Build project', done: false }
];

// Add new todo (immutable way)
const newTodo = { id: 3, text: 'Deploy app', done: false };
todos = [...todos, newTodo];

// Remove todo by id (immutable)
const idToRemove = 2;
todos = todos.filter(todo => todo.id !== idToRemove);

// Update todo (immutable)
const idToUpdate = 1;
todos = todos.map(todo => 
  todo.id === idToUpdate 
    ? { ...todo, done: true } 
    : todo
);

console.log(todos);

// Section 3: Converting to array
// String to array
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// NodeList to array (DOM elements)
const divs = document.querySelectorAll('div');
const divsArray = [...divs];
divsArray.forEach(div => console.log(div));

// Function arguments to array
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10