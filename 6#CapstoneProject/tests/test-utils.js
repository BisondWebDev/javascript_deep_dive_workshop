// Test Cases for utils.js
const {
  generateId,
  formatDate,
  isOverdue,
  priorityValue,
  deepClone,
  daysBetween,
  daysUntil,
  normalizeString,
  isEmptyObject,
  getNestedValue,
  groupBy,
  debounce
} = require('../starter/utils');

console.log('Running Utils Tests...');

const testNameFilter = process.env.TEST_NAME;

if (testNameFilter) {
  console.log(`Filtering tests by name: "${testNameFilter}"\n`);
}

let passedTests = 0;
let failedTests = 0;

async function test(description, testFn) {
  if (testNameFilter && description !== testNameFilter) {
    return;
  }

  try {
    await testFn();
    console.log(`✓ ${description}`);
    passedTests++;
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  Error: ${error.message}`);
    failedTests++;
  }
}

function assertTrue(value, message) {
  if (!value) {
    throw new Error(message || `Expected truthy value, got ${value}`);
  }
}

function assertFalse(value, message) {
  if (value) {
    throw new Error(message || `Expected falsy value, got ${value}`);
  }
}

function assertEquals(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

function assertThrows(fn, expectedMessage) {
  let thrownError;

  try {
    fn();
  } catch (error) {
    thrownError = error;
  }

  if (!thrownError) {
    throw new Error('Expected function to throw an error');
  }

  if (expectedMessage && thrownError.message !== expectedMessage) {
    throw new Error(`Expected error "${expectedMessage}", got "${thrownError.message}"`);
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitFor(condition, timeoutMs = 250, intervalMs = 10) {
  const startedAt = Date.now();

  while (Date.now() - startedAt <= timeoutMs) {
    if (condition()) {
      return;
    }

    await wait(intervalMs);
  }

  throw new Error('Timed out waiting for the expected condition');
}

async function withMockedNow(isoString, callback) {
  const RealDate = Date;
  const fixedTime = new RealDate(isoString).getTime();

  class MockDate extends RealDate {
    constructor(...args) {
      if (args.length === 0) {
        super(fixedTime);
        return;
      }

      super(...args);
    }

    static now() {
      return fixedTime;
    }

    static parse(value) {
      return RealDate.parse(value);
    }

    static UTC(...args) {
      return RealDate.UTC(...args);
    }
  }

  global.Date = MockDate;

  try {
    await callback();
  } finally {
    global.Date = RealDate;
  }
}

async function runTests() {
  console.log('=== generateId ===');

  await test('generateId uses the default prefix', () => {
    const id = generateId();
    assertTrue(id.startsWith('id-'));
  });

  await test('generateId uses a custom prefix', () => {
    const id = generateId('task');
    assertTrue(id.startsWith('task-'));
  });

  console.log('=== formatDate ===');

  await test('formatDate returns a short formatted date', () => {
    const date = '2024-01-15T10:00:00Z';
    assertEquals(formatDate(date, 'short'), new Date(date).toLocaleDateString());
  });

  await test('formatDate returns a long formatted date', () => {
    const date = '2024-01-15T10:00:00Z';
    assertEquals(
      formatDate(date, 'long'),
      new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    );
  });

  await test('formatDate returns today for the current date in relative mode', () => {
    assertEquals(formatDate(new Date().toISOString(), 'relative'), 'today');
  });

  await test('formatDate returns past relative days', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    assertEquals(formatDate(twoDaysAgo, 'relative'), '2 days ago');
  });

  await test('formatDate returns future relative days', () => {
    const threeDaysAhead = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    assertEquals(formatDate(threeDaysAhead, 'relative'), 'in 3 days');
  });

  await test('formatDate uses day-level relative comparisons near day boundaries', async () => {
    await withMockedNow('2024-01-01T23:00:00Z', () => {
      assertEquals(formatDate('2024-01-02T01:00:00Z', 'relative'), 'in 1 day');
    });
  });

  await test('formatDate throws for unsupported formats', () => {
    assertThrows(
      () => formatDate('2024-01-15T10:00:00Z', 'medium'),
      'Unsupported date format: medium'
    );
  });

  console.log('=== isOverdue ===');

  await test('isOverdue returns true for a past date', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    assertTrue(isOverdue(oneHourAgo));
  });

  await test('isOverdue returns false for a future date', () => {
    const oneHourAhead = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    assertFalse(isOverdue(oneHourAhead));
  });

  console.log('=== priorityValue ===');

  await test('priorityValue returns 1 for low', () => {
    assertEquals(priorityValue('low'), 1);
  });

  await test('priorityValue returns 2 for medium', () => {
    assertEquals(priorityValue('medium'), 2);
  });

  await test('priorityValue returns 3 for high', () => {
    assertEquals(priorityValue('high'), 3);
  });

  await test('priorityValue returns 4 for urgent', () => {
    assertEquals(priorityValue('urgent'), 4);
  });

  await test('priorityValue is case-insensitive', () => {
    assertEquals(priorityValue('HIGH'), 3);
  });

  await test('priorityValue returns 0 for unknown priorities', () => {
    assertEquals(priorityValue('blocked'), 0);
  });

  console.log('=== deepClone ===');

  await test('deepClone returns a new top-level object', () => {
    const original = { id: 1, name: 'Task' };
    const clone = deepClone(original);
    assertFalse(clone === original);
  });

  await test('deepClone copies nested objects independently', () => {
    const original = { user: { name: 'Ana' } };
    const clone = deepClone(original);
    clone.user.name = 'Bea';
    assertEquals(original.user.name, 'Ana');
  });

  await test('deepClone copies nested arrays independently', () => {
    const original = { tags: ['ui', 'api'] };
    const clone = deepClone(original);
    clone.tags.push('ops');
    assertEquals(original.tags, ['ui', 'api']);
  });

  await test('deepClone copies Date instances', () => {
    const original = { createdAt: new Date('2024-01-15T10:00:00Z') };
    const clone = deepClone(original);
    assertTrue(clone.createdAt instanceof Date);
  });

  await test('deepClone supports objects with a shadowed hasOwnProperty property', () => {
    const original = {
      hasOwnProperty: 'shadowed',
      nested: { count: 1 }
    };
    const clone = deepClone(original);

    clone.nested.count = 2;

    assertEquals(original.nested.count, 1);
    assertEquals(clone.hasOwnProperty, 'shadowed');
  });

  await test('deepClone supports objects with a null prototype', () => {
    const original = Object.create(null);
    original.user = { name: 'Ana' };

    const clone = deepClone(original);
    clone.user.name = 'Bea';

    assertEquals(original.user.name, 'Ana');
    assertEquals(Object.getPrototypeOf(clone), null);
  });

  console.log('=== daysBetween ===');

  await test('daysBetween returns positive day difference', () => {
    assertEquals(daysBetween('2024-01-01', '2024-01-04'), 3);
  });

  await test('daysBetween returns negative day difference', () => {
    assertEquals(daysBetween('2024-01-04', '2024-01-01'), -3);
  });

  await test('daysBetween compares timestamps at UTC day granularity', () => {
    assertEquals(daysBetween('2024-01-01T23:00:00Z', '2024-01-02T01:00:00Z'), 1);
    assertEquals(daysBetween('2024-01-02T01:00:00Z', '2024-01-01T23:00:00Z'), -1);
  });

  console.log('=== daysUntil ===');

  await test('daysUntil returns positive days for a future date', () => {
    const fiveDaysAhead = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    assertEquals(daysUntil(fiveDaysAhead), 5);
  });

  await test('daysUntil returns negative days for a past date', () => {
    const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString();
    assertEquals(daysUntil(fourDaysAgo), -4);
  });

  await test('daysUntil uses day-level comparison for date-only values', async () => {
    await withMockedNow('2024-01-01T23:00:00Z', () => {
      assertEquals(daysUntil('2024-01-02'), 1);
      assertEquals(daysUntil('2023-12-31'), -1);
    });
  });

  console.log('=== normalizeString ===');

  await test('normalizeString trims whitespace and lowercases text', () => {
    assertEquals(normalizeString('  HeLLo WoRLD  '), 'hello world');
  });

  console.log('=== isEmptyObject ===');

  await test('isEmptyObject returns true for an empty object', () => {
    assertTrue(isEmptyObject({}));
  });

  await test('isEmptyObject returns false for an object with keys', () => {
    assertFalse(isEmptyObject({ id: 1 }));
  });

  await test('isEmptyObject returns false for arrays', () => {
    assertFalse(isEmptyObject([]));
  });

  console.log('=== getNestedValue ===');

  await test('getNestedValue returns a nested value when the path exists', () => {
    const user = { profile: { settings: { theme: 'dark' } } };
    assertEquals(getNestedValue(user, 'profile.settings.theme'), 'dark');
  });

  await test('getNestedValue returns the default value when the path is missing', () => {
    const user = { profile: {} };
    assertEquals(getNestedValue(user, 'profile.settings.theme', 'light'), 'light');
  });

  await test('getNestedValue returns the default value when an intermediate key is missing', () => {
    const user = {};
    assertEquals(getNestedValue(user, 'profile.settings.theme', 'light'), 'light');
  });

  await test('getNestedValue returns falsy values when they exist on the path', () => {
    const settings = { preferences: { notifications: false } };
    assertEquals(getNestedValue(settings, 'preferences.notifications', true), false);
  });

  console.log('=== groupBy ===');

  await test('groupBy groups objects by the provided key', () => {
    const items = [
      { status: 'todo', id: 1 },
      { status: 'done', id: 2 },
      { status: 'todo', id: 3 }
    ];

    assertEquals(groupBy(items, 'status'), {
      todo: [
        { status: 'todo', id: 1 },
        { status: 'todo', id: 3 }
      ],
      done: [{ status: 'done', id: 2 }]
    });
  });

  await test('groupBy safely handles dangerous property names', () => {
    const items = [
      { type: '__proto__', id: 1 },
      { type: 'constructor', id: 2 }
    ];
    const grouped = groupBy(items, 'type');

    assertEquals(Object.getPrototypeOf(grouped), null);
    assertEquals(grouped['__proto__'], [{ type: '__proto__', id: 1 }]);
    assertEquals(grouped.constructor, [{ type: 'constructor', id: 2 }]);
  });

  console.log('=== debounce ===');

  await test('debounce delays execution until after the delay', async () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 30);

    assertEquals(debounced(), undefined);
    assertEquals(callCount, 0);

    await waitFor(() => callCount === 1);
    assertEquals(callCount, 1);
  });

  await test('debounce only runs the last rapid call', async () => {
    let receivedValue;
    let callCount = 0;
    const debounced = debounce(value => {
      receivedValue = value;
      callCount++;
      return value;
    }, 30);

    debounced('first');
    debounced('second');
    debounced('final');

    await waitFor(() => callCount === 1);
    assertEquals(callCount, 1);
    assertEquals(receivedValue, 'final');
  });

  await test('debounce preserves caller context for object methods', async () => {
    const counter = {
      value: 1,
      increment(amount) {
        this.value += amount;
        return this.value;
      }
    };

    counter.debouncedIncrement = debounce(counter.increment, 30);

    assertEquals(counter.debouncedIncrement(2), undefined);
    await waitFor(() => counter.value === 3);

    assertEquals(counter.debouncedIncrement(4), 3);
    await waitFor(() => counter.value === 7);
    assertEquals(counter.value, 7);
  });

  console.log('\n=== Summary ===');
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  console.log(`Total: ${passedTests + failedTests}`);

  if (failedTests > 0) {
    process.exitCode = 1;
  }
}

runTests();
