// Sample data for the Task Management System
// This file contains initial data to work with

// Global data stores (in a real app, this would be a database)
let users = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'developer',
    active: true
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'designer',
    active: true
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'manager',
    active: true
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'developer',
    active: false
  }
];

let projects = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    ownerId: 'user-3',
    teamMembers: ['user-1', 'user-2', 'user-3'],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    deadline: '2024-12-31'
  },
  {
    id: 'proj-2',
    name: 'Mobile App',
    description: 'Native mobile application for iOS and Android',
    ownerId: 'user-3',
    teamMembers: ['user-1', 'user-4'],
    status: 'active',
    createdAt: '2024-02-01T09:00:00Z',
    deadline: '2025-03-15'
  },
  {
    id: 'proj-3',
    name: 'Marketing Campaign',
    description: 'Q2 marketing campaign materials',
    ownerId: 'user-2',
    teamMembers: ['user-2'],
    status: 'on-hold',
    createdAt: '2024-01-10T14:00:00Z',
    deadline: '2024-06-30'
  }
];

let tasks = [
  {
    id: 'task-1',
    title: 'Design homepage mockup',
    description: 'Create initial design mockups for the new homepage',
    projectId: 'proj-1',
    assigneeId: 'user-2',
    creatorId: 'user-3',
    status: 'done',
    priority: 'high',
    tags: ['design', 'ui'],
    dueDate: '2024-02-15',
    estimatedHours: 8,
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-02-10T14:30:00Z',
    completedAt: '2024-02-10T14:30:00Z'
  },
  {
    id: 'task-2',
    title: 'Implement authentication system',
    description: 'Build JWT-based authentication with login, logout, and token refresh',
    projectId: 'proj-1',
    assigneeId: 'user-1',
    creatorId: 'user-3',
    status: 'in-progress',
    priority: 'urgent',
    tags: ['backend', 'security'],
    dueDate: '2024-03-01',
    estimatedHours: 16,
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-02-20T11:15:00Z',
    completedAt: null
  },
  {
    id: 'task-3',
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples',
    projectId: 'proj-1',
    assigneeId: 'user-1',
    creatorId: 'user-3',
    status: 'todo',
    priority: 'medium',
    tags: ['documentation', 'api'],
    dueDate: '2024-04-15',
    estimatedHours: 12,
    createdAt: '2024-01-25T15:00:00Z',
    updatedAt: '2024-01-25T15:00:00Z',
    completedAt: null
  },
  {
    id: 'task-4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    projectId: 'proj-1',
    assigneeId: 'user-1',
    creatorId: 'user-3',
    status: 'todo',
    priority: 'high',
    tags: ['devops', 'automation'],
    dueDate: '2024-02-28',
    estimatedHours: 6,
    createdAt: '2024-01-26T09:30:00Z',
    updatedAt: '2024-01-26T09:30:00Z',
    completedAt: null
  },
  {
    id: 'task-5',
    title: 'Design app icons',
    description: 'Create app icons for iOS and Android',
    projectId: 'proj-2',
    assigneeId: 'user-2',
    creatorId: 'user-3',
    status: 'done',
    priority: 'medium',
    tags: ['design', 'mobile'],
    dueDate: '2024-02-20',
    estimatedHours: 4,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-18T16:00:00Z',
    completedAt: '2024-02-18T16:00:00Z'
  },
  {
    id: 'task-6',
    title: 'Implement push notifications',
    description: 'Add push notification support for both platforms',
    projectId: 'proj-2',
    assigneeId: 'user-1',
    creatorId: 'user-3',
    status: 'blocked',
    priority: 'high',
    tags: ['mobile', 'backend'],
    dueDate: '2024-03-15',
    estimatedHours: 10,
    createdAt: '2024-02-05T11:00:00Z',
    updatedAt: '2024-02-22T14:00:00Z',
    completedAt: null
  },
  {
    id: 'task-7',
    title: 'Create social media graphics',
    description: 'Design graphics for Facebook, Instagram, and Twitter',
    projectId: 'proj-3',
    assigneeId: 'user-2',
    creatorId: 'user-2',
    status: 'todo',
    priority: 'low',
    tags: ['design', 'marketing'],
    dueDate: '2024-05-01',
    estimatedHours: 8,
    createdAt: '2024-01-15T13:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
    completedAt: null
  },
  {
    id: 'task-8',
    title: 'Fix mobile responsive issues',
    description: 'Address layout issues on mobile devices',
    projectId: 'proj-1',
    assigneeId: 'user-1',
    creatorId: 'user-3',
    status: 'in-progress',
    priority: 'high',
    tags: ['frontend', 'bug'],
    dueDate: '2024-02-25',
    estimatedHours: 5,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-23T09:00:00Z',
    completedAt: null
  },
  {
    id: 'task-9',
    title: 'Database migration',
    description: 'Migrate from MongoDB to PostgreSQL',
    projectId: 'proj-1',
    assigneeId: null,
    creatorId: 'user-3',
    status: 'todo',
    priority: 'urgent',
    tags: ['backend', 'database'],
    dueDate: '2024-03-10',
    estimatedHours: 20,
    createdAt: '2024-02-15T14:00:00Z',
    updatedAt: '2024-02-15T14:00:00Z',
    completedAt: null
  },
  {
    id: 'task-10',
    title: 'Performance optimization',
    description: 'Optimize page load time and reduce bundle size',
    projectId: 'proj-1',
    assigneeId: 'user-1',
    creatorId: 'user-3',
    status: 'todo',
    priority: 'medium',
    tags: ['frontend', 'performance'],
    dueDate: '2024-04-01',
    estimatedHours: 12,
    createdAt: '2024-02-18T11:00:00Z',
    updatedAt: '2024-02-18T11:00:00Z',
    completedAt: null
  }
];

// Export data (for use in other files)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { users, projects, tasks };
}
