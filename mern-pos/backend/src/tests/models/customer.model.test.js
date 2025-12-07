const Customer = require("../../models/customer.model");
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

describe("Customer model", () => {
  it("creates a customer with unique phone", async () => {
    const customer = await Customer.create({ phone: "5551234567", name: "Tester" });
    expect(customer.phone).toBe("5551234567");
  });
});
