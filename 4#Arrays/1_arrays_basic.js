// ** Array Creation **
// Different ways to create arrays
const products = ['laptop', 'mouse', 'keyboard'];
const prices = new Array(99.99, 29.99, 79.99);
const emptySlots = new Array(3); // Creates [empty × 3] - be careful!
const filledArray = Array(3).fill(0); // [0, 0, 0] - much better!

// This creates an EMPTY array with length 5 (sparse array!)
const arr2 = new Array(5);
console.log(arr2); // [empty × 5]
console.log(arr2.length); // 5
console.log(arr2[0]); // undefined

// But with TWO arguments, it works as expected
const arr3 = new Array(5, 10);
console.log(arr3); // [5, 10]

// Modern Array creation Array.of() es6
const correct = Array.of(3); // [3] 
const mixed = Array.of('hello', 42, true); // ['hello', 42, true]

// ** Array Access **
const wizards = ['Merlin', 'Gandalf', 'Harry potter'];

// Positive indexing (starts at 0)
console.log(wizards[0]); // 'Merlin'
console.log(wizards[1]); // 'Gandalf'

// Access last element (the old way)
console.log(wizards[wizards.length - 1]); // 'Harry potter'

// The at() Method (ES2022)
// Positive indexing works the same
console.log(wizards.at(0)); // 'Merlin'
console.log(wizards.at(2)); // 'Harry potter'
// Negative indexing - counts from the end!
console.log(wizards.at(-1)); // 'Harry potter' (last)
console.log(wizards.at(-2)); // 'Gandalf' (second to last)

// Array.from() - Convert Anything to Array
// Convert string to array
const chars = Array.from('hello');
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
// Convert NodeList to array (DOM)
const divs = Array.from(document.querySelectorAll('div'));

// ** Corner Cases **
// Creating sparse arrays (accidentally or on purpose)
const sparse1 = [1, , 3]; // Comma creates empty slot
const sparse2 = new Array(3); // Constructor creates empty slots
const sparse3 = [];
sparse3[5] = 'value'; // Assignment creates gap

console.log(sparse1); // [1, empty, 3]
console.log(sparse1.length); // 3
console.log(sparse1[1]); // undefined
console.log(1 in sparse1); // false (!!)

const numbers = [10, 20, 30, -1];
// JavaScript doesn't support this (not an error, but wrong!
console.log(numbers[-1]); // undefined (looks for property '-1')
// Use at() instead
console.log(numbers.at(-1)); // 30
