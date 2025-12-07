const Sale = require("../models/sale.model");
const Return = require("../models/return.model");
const itemService = require("./item.service");
const customerService = require("./customer.service");
const rentalService = require("./rental.service");

const TAX_RATE = 0.07;

const toLineItem = (item, quantity) => {
  const lineTotal = Number((item.unitPrice * quantity).toFixed(2));
  return {
    itemId: item._id,
    quantity,
    unitPrice: item.unitPrice,
    lineTotal,
  };
};

const createSale = async ({ cashierId, items }) => {
  if (!cashierId) {
    throw new Error("Cashier is required");
  }

  if (!items || !items.length) {
    throw new Error("No items provided");
  }

  const detailedItems = [];
  for (const entry of items) {
    const { itemId, quantity } = entry;
    const item = await itemService.getItemById(itemId);
    if (!item || item.kind !== "sale") {
      throw new Error("Item unavailable for sale");
    }
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }
    if (item.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    detailedItems.push(toLineItem(item, quantity));
    await itemService.adjustStock(itemId, -quantity);
  }

  const subtotal = detailedItems.reduce((sum, line) => sum + line.lineTotal, 0);
  const taxAmount = Number((subtotal * TAX_RATE).toFixed(2));
  const totalAmount = Number((subtotal + taxAmount).toFixed(2));

  const sale = await Sale.create({
    cashierId,
    items: detailedItems,
    subtotal,
    taxAmount,
    totalAmount,
  });

  return sale;
};

const createRental = async ({ cashierId, customerPhone, items, returnDate }) => {
  if (!cashierId) throw new Error("Cashier is required");
  if (!customerPhone) throw new Error("Customer phone is required");
  if (!items || !items.length) throw new Error("No rental items provided");

  const dueDate = returnDate ? new Date(returnDate) : null;
  if (!dueDate || Number.isNaN(dueDate.getTime())) {
    throw new Error("Return date is required for rentals");
  }

  const customer = await customerService.findOrCreateCustomer({
    phone: customerPhone,
  });

  const rentals = [];
  let subtotal = 0;

  for (const entry of items) {
    const { itemId, quantity } = entry;
    const item = await itemService.getItemById(itemId);
    if (!item || item.kind !== "rental") {
      throw new Error("Item unavailable for rental");
    }
    if (quantity <= 0) throw new Error("Quantity must be positive");
    if (item.stock < quantity) throw new Error("Insufficient stock");

    await itemService.adjustStock(itemId, -quantity);
    const rental = await rentalService.createRentalRecord({
      customerId: customer._id,
      itemId,
      quantity,
      dueDate,
      cashierId,
    });

    rentals.push(rental);
    subtotal += item.unitPrice * quantity;
  }

  return {
    customer,
    rentals,
    subtotal: Number(subtotal.toFixed(2)),
  };
};

const createReturn = async ({ cashierId, type, items, customerPhone }) => {
  if (!cashierId) throw new Error("Cashier is required");
  if (!items || !items.length) throw new Error("No items provided for return");

  const returnType = type || "unsatisfactory";
  const now = new Date();

  if (returnType === "unsatisfactory") {
    const lineItems = [];

    for (const entry of items) {
      const { itemId, quantity } = entry;
      const item = await itemService.getItemById(itemId);
      if (!item) throw new Error("Item not found");
      if (item.kind !== "sale") {
        throw new Error("Only sale items can be returned as unsatisfactory");
      }
      if (quantity <= 0) throw new Error("Quantity must be positive");

      await itemService.adjustStock(itemId, quantity);
      lineItems.push(toLineItem(item, quantity));
    }

    const returnRecord = await Return.create({
      type: "unsatisfactory",
      cashierId,
      items: lineItems,
      feeAmount: 0,
    });

    return { returnRecord, feeAmount: 0 };
  }

  const customer = await customerService.findCustomerByPhone(customerPhone);
  if (!customer) {
    throw new Error("Customer not found");
  }

  const detailedItems = [];

  for (const entry of items) {
    const { itemId, quantity } = entry;
    const item = await itemService.getItemById(itemId);
    if (!item || item.kind !== "rental") {
      throw new Error("Item unavailable for rental return");
    }
    if (quantity <= 0) throw new Error("Quantity must be positive");

    detailedItems.push({ itemId, quantity, unitPrice: item.unitPrice });
  }

  const { totalFee } = await rentalService.returnRentalItems(
    customer._id,
    detailedItems,
    now
  );

  for (const entry of items) {
    await itemService.adjustStock(entry.itemId, entry.quantity);
  }

  const lineItems = detailedItems.map((d) => ({
    itemId: d.itemId,
    quantity: d.quantity,
    unitPrice: d.unitPrice,
    lineTotal: Number((d.unitPrice * d.quantity).toFixed(2)),
  }));

  const returnRecord = await Return.create({
    type: "rental",
    cashierId,
    customerId: customer._id,
    items: lineItems,
    feeAmount: Number(totalFee.toFixed(2)),
  });

  return { returnRecord, feeAmount: Number(totalFee.toFixed(2)) };
};

module.exports = {
  createSale,
  createRental,
  createReturn,
};
