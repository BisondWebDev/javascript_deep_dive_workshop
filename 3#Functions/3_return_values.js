// Explicit Returns
function calculateTax(amount, rate) {
  return amount * rate;
}

function processOrder(order) {
  if (!order) {
    return null; // Early return
  }
  
  if (order.items.length === 0) {
    return { error: 'No items in order' };
  }
  
  return {
    total: order.items.reduce((sum, item) => sum + item.price, 0),
    itemCount: order.items.length
  };
}

// Implicit undefined Returns
function noReturn() {
  console.log('I do something');
  // No return statement
}

console.log(noReturn()); // undefined

function emptyReturn() {
  return; // Returns immediately with undefined
}

console.log(emptyReturn()); // undefined

// Automatic Semicolon Insertion
// This looks fine but breaks!
function getObject() {
  return 
  {
    name: 'Alice'
  };
}

console.log(getObject()); // undefined

// JavaScript interprets it as:
function getObject() {
  return; // semicolon inserted here!
  {
    name: 'Alice'
  };
}

// Fix: Keep opening brace on same line
function getObjectFixed() {
  return {
    name: 'Alice'
  };
}

console.log(getObjectFixed()); // { name: 'Alice' }

// Returning Functions (Higher-Order Functions)
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15