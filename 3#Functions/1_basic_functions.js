// ** 1. Function Declaration vs Expression **

const name = "John";

// Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function Expression
const greet = function(name) {
  return `Hello, ${name}!`;
};

// The Corner Cases You Should Know -> Hoisting

console.log(sayHi('Alice')); // "Hi, Alice!"

function sayHi(name) {
  return `Hi, ${name}!`;
}


console.log(sayBye('Bob')); // ReferenceError: Cannot access 'sayBye' before initialization

const sayBye = function(name) {
  return `Bye, ${name}!`;
};

// Named Function Expressions
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // Can reference itself by name
};

console.log(factorial(5)); // 120
console.log(fact(5)); // ReferenceError: fact is not defined

// Arrow Functions - A Special Expression
const add = (a, b) => a + b;

// Corner case: 'this' binding
const obj = {
  name: 'Object',
  regularFunction: function() {
    console.log(this.name); // 'Object'
  },
  arrowFunction: () => {
    console.log(this.name); // undefined (or global 'this')
  }
};

obj.regularFunction(); // Works as expected
obj.arrowFunction(); // Doesn't bind 'this' to obj!