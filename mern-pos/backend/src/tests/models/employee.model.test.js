const Employee = require("../../models/employee.model");
const db = require("../utils/test-db");

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("Employee model", () => {
  it("saves a valid employee", async () => {
    const employee = await Employee.create({
      username: "cashier1",
      position: "cashier",
      firstName: "Test",
      lastName: "User",
      passwordHash: "hashed",
    });

    expect(employee._id).toBeDefined();
    expect(employee.username).toBe("cashier1");
    expect(employee.position).toBe("cashier");
    expect(employee.createdAt).toBeInstanceOf(Date);
  });
});
