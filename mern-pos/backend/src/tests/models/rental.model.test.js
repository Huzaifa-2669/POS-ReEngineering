const Rental = require("../../models/rental.model");
const Customer = require("../../models/customer.model");
const Item = require("../../models/item.model");
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

describe("Rental model", () => {
  it("creates a rental record", async () => {
    const customer = await Customer.create({ phone: "5550001111" });
    const item = await Item.create({
      legacyItemId: 200,
      name: "Rental Item",
      kind: "rental",
      unitPrice: 25,
      stock: 5,
    });
    const cashier = await Employee.create({
      username: "cashierX",
      position: "cashier",
      firstName: "Cash",
      lastName: "User",
      passwordHash: "hash",
    });

    const rental = await Rental.create({
      customerId: customer._id,
      itemId: item._id,
      quantity: 1,
      dueDate: new Date(Date.now() + 86400000),
      cashierId: cashier._id,
    });

    expect(rental.returned).toBe(false);
    expect(rental.customerId.toString()).toBe(customer._id.toString());
  });
});
