//* Logical AND (&&) *

// Traditional approach
if (user && user.name) {
  console.log(user.name);
}

// Short-circuit for default values
const name = user && user.name;  // undefined if user is null

// Short-circuit for conditional execution
isLoggedIn && redirectToDashboard(); // Only calls function if isLoggedIn is true

// * Logical OR (||) *

// Default values
const username = input || 'Guest';
const port = process.env.PORT || 3000;

// Watch out for falsy values!
const count1 = userInput || 10; // If userInput is 0, returns 10 (probably not what you want!)

// * Nullish Coalescing (??) *

// Only null/undefined trigger default
const value1 = 0 ?? 10;        // 0
const value2 = "" ?? "default"; // ""
const value3 = false ?? true;   // false
const value4 = null ?? 10;      // 10
const value5 = undefined ?? 10; // 10

// Comparison
0 || 10        // 10 (0 is falsy)
0 ?? 10        // 0  (0 is not null/undefined)

"" || "default"  // "default" (empty string is falsy)
"" ?? "default"  // "" (empty string is not null/undefined)
