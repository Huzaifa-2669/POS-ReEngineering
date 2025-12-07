const transactionService = require("../../services/transaction.service");
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

describe("Transaction service", () => {
  it("creates a sale and adjusts stock", async () => {
    const cashier = await Employee.create({
      username: "cashier1",
      position: "cashier",
      firstName: "Cash",
      lastName: "User",
      passwordHash: "hash",
    });
    const item = await Item.create({
      legacyItemId: 1,
      name: "Sale Item",
      kind: "sale",
      unitPrice: 10,
      stock: 5,
    });

    const sale = await transactionService.createSale({
      cashierId: cashier._id,
      items: [{ itemId: item._id, quantity: 2 }],
    });

    expect(sale.totalAmount).toBeCloseTo(21.4); // 2*10 + tax 7%
    const updated = await Item.findById(item._id);
    expect(updated.stock).toBe(3);
  });
});
