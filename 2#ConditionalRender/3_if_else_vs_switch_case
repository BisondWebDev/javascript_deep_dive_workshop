// GOOD: If/else for range checking and complex conditions
function getShippingCost(weight) {
  if (weight <= 1) return 5;
  if (weight <= 5) return 10;
  if (weight <= 10) return 15;
  return 25;
}

// GOOD: Switch for exact values
function getHttpStatusMessage(code) {
  switch (code) {
    case 200:
      return "OK";
    case 201:
      return "Created";
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized";
    case 404:
      return "Not Found";
    case 500:
      return "Server Error";
    default:
      return "Unknown Status";
  }
}

// Quick Question: Which case will run?
let value = "1";

switch (value) {
  case 1:
    console.log("Number one");
    break;
  case "1":
    console.log("String one");
    break;
}

// GOOD: Intentional fall-through for grouping
function getQuarterFromMonth(month) {
  let quarter;
  
  switch (month) {
    case 1:
    case 2:
    case 3:
      quarter = "Q1";
      break;
    
    case 4:
    case 5:
    case 6:
      quarter = "Q2";
      break;
    //...
    
    default:
      quarter = "Invalid";
  }
  
  return quarter;
}

// BAD: Unintentional fall-through (missing break)
function processAction(action) {
  switch (action) {
    case "start":
      startEngine();
      // Missing break! Falls through to "stop" case
    case "stop":
      stopEngine(); // BUG: Runs for both "start" AND "stop"
      break;
  }
}

// TIP: Always add a comment when fall-through is intentional
switch (status) {
  case "draft":
    prepareDraft();
    // falls through
  case "pending":
    validateContent();
    break;
}

// Instead of large switch statements
const SHIPPING_METHODS = {
  'standard': 'Standard Shipping',
  'express': 'Express Shipping',
  'overnight': 'Overnight Shipping'
};

function getShippingMethod(code) {
  return SHIPPING_METHODS[code] || 'Unknown Method';
}

getShippingMethod(SHIPPING_METHODS.express);