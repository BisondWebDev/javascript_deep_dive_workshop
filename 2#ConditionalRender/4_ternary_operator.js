// Basic ternary
const canVote = age >= 18 ? true : false;
// Better: const canVote = age >= 18;

// Ternary for assignment
const isOnline = false
const status = isOnline ? 'Online' : 'Offline';

// Hard to read
const result = score >= 90 ? 'A' : 
               score >= 80 ? 'B' : 
               score >= 70 ? 'C' : 'F';

// Better - use if/else for multiple conditions
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
}

// Acceptable nested ternary (one level)
const message = isLoading 
  ? 'Loading...' 
  : hasError 
    ? 'Error occurred' 
    : 'Success';

// Ternary Edge Cases
const shouldLog = true;
const isValid = true;

function save() {
  return false;
}
function notify() {
  return 1;
}

// Ternary with side effects (be careful!)
const log = shouldLog ? console.log('Logged') : null;
// console.log returns undefined!

// Multiple operations
const valid = isValid ? (save(), notify(), true) : false;
// Only the last value is returned