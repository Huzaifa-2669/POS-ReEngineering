const request = require("supertest");
const app = require("../../app");
const db = require("../utils/test-db");
const Item = require("../../models/item.model");

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

describe("Item routes", () => {
  it("lists items", async () => {
    await Item.create({
      legacyItemId: 10,
      name: "Listed Item",
      kind: "sale",
      unitPrice: 5,
      stock: 2,
    });

    const res = await request(app).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Listed Item");
  });
});
