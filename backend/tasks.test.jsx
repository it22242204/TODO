import request from 'supertest';
import app from './index.js';

// Mock the database module used in the app
jest.mock('./db.js', () => ({
  query: jest.fn()
}));

import db from './db.js';

describe("Tasks API Tests", () => {

  // Clear any previous mock data before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test: Fetching recent incomplete tasks
  it("GET /tasks - should return a list of incomplete tasks", async () => {
    // Simulate database response with a mock task
    db.query.mockResolvedValue([
      [{ id: 1, title: "Mock Task", description: "Mock Desc", completed: false }]
    ]);

    const response = await request(app).get("/tasks");

    expect(response.statusCode).toBe(200); // Success
    expect(Array.isArray(response.body)).toBe(true); // Should return an array
    expect(response.body[0].title).toBe("Mock Task"); // Check content
  });

  // Test: Creating a new task
  it("POST /tasks - should add a new task to the database", async () => {
    // Simulate insert response from the database
    db.query.mockResolvedValue([{ insertId: 2 }]);

    const response = await request(app).post("/tasks").send({
      title: "Test Task",
      description: "Test Description"
    });

    expect(response.statusCode).toBe(201); // Created successfully

    // Optional: Check response body if the API returns the new task
    // expect(response.body).toHaveProperty("id");
  });

});
