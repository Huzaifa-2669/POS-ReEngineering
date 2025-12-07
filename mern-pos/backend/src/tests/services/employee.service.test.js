const employeeService = require("../../services/employee.service");
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

describe("Employee service", () => {
  it("creates and retrieves employees", async () => {
    const created = await employeeService.createEmployee({
      username: "admin1",
      position: "admin",
      firstName: "Admin",
      lastName: "User",
      password: "secret",
    });

    expect(created).toBeDefined();
    expect(created.passwordHash).not.toBe("secret");

    const employees = await employeeService.getAllEmployees();
    expect(employees.length).toBe(1);
    expect(employees[0].username).toBe("admin1");
  });
});
