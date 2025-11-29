// --- Section 1: Adding Functions to Objects
const calculator = {
  value: 0,
  
  add: function(num) {
    this.value += num;
    return this.value;
  },
  
  // Shorthand method syntax (ES6)
  subtract(num) {
    this.value -= num;
    return this.value;
  },
  
  reset() {
    this.value = 0;
  }
};

calculator.add(10);      // 10
calculator.subtract(3);  // 7
calculator.reset();      // value is now 0

// Section 2: Understanding this Context
const counter = {
  count: 0,
  
  increment() {
    this.count++;
    console.log(this.count);
  },
  
  // Arrow function - DON'T use for methods!
  decrement: () => {
    this.count--; // 'this' doesn't refer to counter object!
    console.log(this.count);
  }
};

counter.increment(); // 1 (works correctly)
counter.decrement(); // NaN ('this' is not counter object)

// Corner Case: Losing this context
const player = {
  name: "Alice",
  score: 0,
  
  addPoints(points) {
    this.score += points;
    console.log(`${this.name}: ${this.score}`);
  }
};

player.addPoints(10); // "Alice: 10" (works)

// Problem: passing method as callback
const addPointsFunc = player.addPoints;
// addPointsFunc(5); // TypeError! 'this' is undefined

// Solution 1: Bind
const boundFunc = player.addPoints.bind(player);
boundFunc(5); // "Alice: 15" (works)

// Solution 2: Arrow function wrapper
setTimeout(() => player.addPoints(10), 1000); // Works!

// Solution 3: Store reference to 'this'
const game = {
  currentPlayer: "Bob",
  score: 0,
  
  addPoints(points) {
    const self = this; // Store reference
    setTimeout(function() {
      self.score += points;
      console.log(`${self.currentPlayer}: ${self.score}`);
    }, 1000);
  }
};

// Section 3: Method chaining
const bankAccount = {
  balance: 0,
  
  deposit(amount) {
    this.balance += amount;
    return this; // Return object for chaining
  },
  
  withdraw(amount) {
    this.balance -= amount;
    return this;
  },
  
  getBalance() {
    return this.balance;
  }
};

// Chain multiple operations
const finalBalance = bankAccount
  .deposit(100)
  .deposit(50)
  .withdraw(30)
  .getBalance();

console.log(finalBalance); // 120

// section 3: getters and setters
const user = {
  firstName: 'Alice',
  lastName: 'Smith',
  _age: 28, // Convention: underscore for "private" properties
  
  // Getter - accessed like a property, not a method
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  // Setter - assigned like a property
  set fullName(value) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1] || '';
  },
  
  // Getter with validation
  get age() {
    return this._age;
  },
  
  // Setter with validation
  set age(value) {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    this._age = value;
  }
};

// Using getters (no parentheses)
console.log(user.fullName); // 'Alice Smith'

// Using setters (assignment syntax)
user.fullName = 'Bob Johnson';
console.log(user.firstName); // 'Bob'
console.log(user.lastName);  // 'Johnson'

// Setter with validation
user.age = 30;    // Works
// user.age = -5; // Throws Error: Invalid age

/*
  Exercise (2 min):
  Create a shoppingCart object with methods: addItem(item, price), removeItem(price),
  and getTotal(). Make methods chainable.
*/