// Understanding the flow
const score = 86;

function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {  // Only checked if score < 90
    return 'B';
  } else if (score >= 70) {  // Only checked if score < 80
    return 'C';
  } else if (score >= 60) {  // Only checked if score < 70
    return 'D';
  } else {                   // Everything else
    return 'F';
  }
}

// Order matters!
function getBrokenGrade(score) {
  if (score >= 60) {
    return 'D';  // ❌ Returns 'D' for score of 95!
  } else if (score >= 90) {
    return 'A';  // Never reached
  }
}

getGrade(score)
getBrokenGrade(score)