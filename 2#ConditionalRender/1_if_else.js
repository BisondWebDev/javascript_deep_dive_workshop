// ONLY these 6 values are falsy:
if (false) { }      // 1. false
if (0) { }          // 2. zero
if ("") { }         // 3. empty string
if (null) { }       // 4. null
if (undefined) { }  // 5. undefined
if (NaN) { }        // 6. Not a Number

// EVERYTHING ELSE is truthy (These catch people off-guard):
if ("0") { }        // ✓ truthy - string containing "0"
if ("false") { }    // ✓ truthy - string
if ([]) { }         // ✓ truthy - empty array
if ({}) { }         // ✓ truthy - empty object
if (function(){}) { } // ✓ truthy
if (-1) { }         // ✓ truthy - negative numbers are truthy!

// IF/ELSE usage:

// data from backend
const user = {
  isLoggedIn: true,
  isPremium: true,
  //...
}

if (user.isLoggedIn) {
  if (user.isPremium) {
    showPremiumFeatures();
  }
} else {
  showLoginPrompt();
}

// Quick Question: Is this condtion true or false?
const input = "0";
if (input == false) {
  console.log("Input is empty");
}

// BAD: Nested conditionals
function processPayment(user, amount) {
  if (user) {
    if (user.isActive) {
      if (amount > 0) {
        if (user.balance >= amount) {
          return chargeUser(user, amount);
        } else {
          throw new Error("Insufficient funds");
        }
      } else {
        throw new Error("Invalid amount");
      }
    } else {
      throw new Error("Inactive account");
    }
  } else {
    throw new Error("User not found");
  }
}

// GOOD: Guard clauses with early returns
function processPayment(user, amount) {
  if (!user) throw new Error("User not found");
  if (!user.isActive) throw new Error("Inactive account");
  if (amount <= 0) throw new Error("Invalid amount");
  if (user.balance < amount) throw new Error("Insufficient funds");
  
  return chargeUser(user, amount);
}