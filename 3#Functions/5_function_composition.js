// Composing Simple Functions
// Small, single-purpose functions
const addTax = price => price * 1.2;
const applyDiscount = price => price * 0.9;
const round = price => Math.round(price * 100) / 100;

// Compose them together
function calculateFinalPrice(price) {
  const withDiscount = applyDiscount(price);
  const withTax = addTax(withDiscount);
  const rounded = round(withTax);
  return rounded;
}

console.log(calculateFinalPrice(100)); // 108

// Creating a Compose Function
// right to left
function compose(...functions) {
  return function(value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

const calculatePrice = compose(round, addTax, applyDiscount);
console.log(calculatePrice(100)); // 108

// left to right
function pipe(...functions) {
  return function(value) {
    return functions.reduce((acc, fn) => fn(acc), value);
  };
}

// More intuitive: reads left to right
const calculatePricePipe = pipe(applyDiscount, addTax, round);
console.log(calculatePricePipe(100)); // 108