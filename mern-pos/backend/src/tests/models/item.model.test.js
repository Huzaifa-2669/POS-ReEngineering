const Item = require("../../models/item.model");
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

describe("Item model", () => {
  it("saves a valid item", async () => {
    const item = await Item.create({
      legacyItemId: 123,
      name: "Test Item",
      kind: "sale",
      unitPrice: 9.99,
      stock: 10,
    });

    expect(item._id).toBeDefined();
    expect(item.legacyItemId).toBe(123);
    expect(item.kind).toBe("sale");
  });
});
