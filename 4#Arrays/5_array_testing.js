// --- section 1: some() - At least one must pass
const numbers = [1, 3, 5, 7, 8];

// Check if any number is even
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true (8 is even)

// Check if any number is > 10
const hasLarge = numbers.some(num => num > 10);
console.log(hasLarge); // false

// Real-world example: Form validation
const formFields = [
  { name: 'email', value: 'test@test.com', valid: true },
  { name: 'password', value: '', valid: false },
  { name: 'username', value: 'john', valid: true }
];

// Check if any field is invalid
const hasErrors = formFields.some(field => !field.valid);
console.log(hasErrors); // true

if (hasErrors) {
  console.log('Please fix errors before submitting');
}

// Check if any field is empty
const hasEmptyFields = formFields.some(field => field.value === '');
console.log(hasEmptyFields); // true

// Section 2: every() - All must pass
const ages = [25, 30, 35, 40];

// Check if everyone is adult
const allAdults = ages.every(age => age >= 18);
console.log(allAdults); // true

// Check if everyone is senior
const allSeniors = ages.every(age => age >= 65);
console.log(allSeniors); // false

// Real-world example: Form validation
const permissions = [
  { resource: 'posts', canEdit: true },
  { resource: 'users', canEdit: true },
  { resource: 'settings', canEdit: false }
];

// Can user edit everything?
const canEditAll = permissions.every(p => p.canEdit);
console.log(canEditAll); // false

// Enable "Edit All" button only if true
const editAllButton = canEditAll ? 'enabled' : 'disabled';

// Corner case: Empty arrays
// some() returns false for empty array
console.log([].some(x => x > 0)); // false

// every() returns true for empty array (vacuous truth)
console.log([].every(x => x > 0)); // true