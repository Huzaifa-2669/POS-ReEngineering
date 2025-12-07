const request = require("supertest");
const app = require("../../app");
const db = require("../utils/test-db");
const employeeService = require("../../services/employee.service");

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("Auth routes", () => {
  beforeEach(async () => {
    await employeeService.createEmployee({
      username: "cashier1",
      position: "cashier",
      firstName: "Cash",
      lastName: "User",
      password: "password123",
    });
  });

  it("logs in with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "cashier1",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.employee.username).toBe("cashier1");
  });

  it("rejects invalid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "cashier1",
      password: "wrong",
    });

    expect(res.status).toBe(401);
  });
});
