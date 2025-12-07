const itemService = require("../services/item.service");

const list = async (req, res) => {
  try {
    const items = await itemService.getAllItems();
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch items" });
  }
};

const create = async (req, res) => {
  try {
    const item = await itemService.createItem(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Failed to create item" });
  }
};

const update = async (req, res) => {
  try {
    const item = await itemService.updateItem(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message || "Failed to update item" });
  }
};

const remove = async (req, res) => {
  try {
    const item = await itemService.deleteItem(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete item" });
  }
};

module.exports = {
  list,
  create,
  update,
  remove,
};
