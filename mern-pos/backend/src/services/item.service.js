const Item = require("../models/item.model");

const getAllItems = async () => {
  return Item.find().sort({ name: 1 });
};

const getItemById = async (id) => {
  return Item.findById(id);
};

const createItem = async (data) => {
  const { legacyItemId, name, kind, unitPrice, stock, isActive = true } = data;

  if (!legacyItemId || !name || !kind) {
    throw new Error("Missing required item fields");
  }

  const existing = await Item.findOne({ legacyItemId });
  if (existing) {
    throw new Error("Item with this legacy id already exists");
  }

  return Item.create({
    legacyItemId,
    name,
    kind,
    unitPrice,
    stock,
    isActive,
  });
};

const updateItem = async (id, updates) => {
  return Item.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

const deleteItem = async (id) => {
  return Item.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

const adjustStock = async (itemId, delta) => {
  const item = await Item.findById(itemId);
  if (!item) {
    throw new Error("Item not found");
  }

  const newStock = item.stock + delta;
  if (newStock < 0) {
    throw new Error("Insufficient stock for item");
  }

  item.stock = newStock;
  await item.save();
  return item;
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  adjustStock,
};
