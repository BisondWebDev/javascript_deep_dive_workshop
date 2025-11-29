// --- Section 1: Working with Complex Structures
const company = {
  name: "TechCorp",
  founded: 2010,
  departments: {
    engineering: {
      manager: "Alice",
      employees: 50,
      teams: {
        frontend: {
          lead: "Bob",
          members: 15
        },
        backend: {
          lead: "Carol",
          members: 20
        }
      }
    },
    marketing: {
      manager: "David",
      employees: 25
    }
  }
};

// Accessing deeply nested data
console.log(company.departments.engineering.teams.frontend.lead); // "Bob"

// Safe Navigation
const user = {
  name: "John",
  address: {
    city: "Boston"
    // missing 'country'
  }
};

// Unsafe - will throw error if any level is undefined
console.log(user.address.country.code); // TypeError!

// Safe navigation with optional chaining
console.log(user.address?.country?.code); // undefined (no error)

// Fallback values
const country = user.address?.country?.code ?? "Unknown";
console.log(country); // "Unknown"

//Corner Case 1: Updating nested properties safely
const state = {
  user: {
    profile: {
      name: "Alice"
    }
  }
};

// Update nested property
const updatedState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: "Bob",
      age: 30
    }
  }
};

console.log(state.user.profile.name);        // "Alice" (unchanged)
console.log(updatedState.user.profile.name); // "Bob"

// Practical Example: API Response
const apiResponse = {
  status: "success",
  data: {
    user: {
      id: 123,
      profile: {
        firstName: "Emma",
        lastName: "Watson",
        contact: {
          email: "emma@example.com",
          phone: null
        }
      },
      preferences: {
        notifications: {
          email: true,
          sms: false
        }
      }
    }
  }
};

// Extract needed data
function getUserEmail(response) {
  return response?.data?.user?.profile?.contact?.email ?? "No email";
}

function getUserPhoneOrDefault(response) {
  const phone = response?.data?.user?.profile?.contact?.phone;
  return phone ?? "No phone provided";
}

console.log(getUserEmail(apiResponse));           // "emma@example.com"
console.log(getUserPhoneOrDefault(apiResponse));  // "No phone provided"

/*
 Exercise (2 min):
 Create a nested object representing a school with classes, students, and grades.
 Write a function that safely gets a student's grade for a specific subject.
 */