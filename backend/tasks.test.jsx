import request from 'supertest';
import app from './index.js';

// Mock the db module used in your app
jest.mock('./db.js', () => ({
  query: jest.fn()
}));

import db from './db.js';

describe("Tasks API", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("GET /tasks - should return an array of tasks", async () => {
    // Mock the db query to return fake tasks
    db.query.mockResolvedValue([[{ id: 1, title: "Mock Task", description: "Mock Desc", completed: false }]]);
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe("Mock Task");
  });

  it("POST /tasks - should create a new task", async () => {
    // Mock the db query for insert (usually returns an object with insertId)
    db.query.mockResolvedValue([{ insertId: 2 }]);
    const res = await request(app).post("/tasks").send({
      title: "Test Task",
      description: "Test Description"
    });
    expect(res.statusCode).toEqual(201);
    // Optionally check for id if your API returns it
    // expect(res.body).toHaveProperty("id");
  });
});