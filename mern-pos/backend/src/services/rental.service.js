const Rental = require("../models/rental.model");

const createRentalRecord = async ({ customerId, itemId, quantity, dueDate, cashierId }) => {
  if (!customerId || !itemId || !quantity || !dueDate || !cashierId) {
    throw new Error("Missing rental fields");
  }

  return Rental.create({
    customerId,
    itemId,
    quantity,
    dueDate,
    cashierId,
  });
};

const getActiveRentalsByCustomer = async (customerId) => {
  return Rental.find({ customerId, returned: false });
};

const returnRentalItems = async (customerId, items, returnDate = new Date()) => {
  const results = [];
  let totalFee = 0;

  for (const item of items) {
    const { itemId, quantity, unitPrice } = item;
    let remaining = quantity;

    const rentals = await Rental.find({
      customerId,
      itemId,
      returned: false,
    }).sort({ rentedAt: 1 });

    for (const rental of rentals) {
      if (remaining <= 0) break;
      const useQty = Math.min(remaining, rental.quantity);
      const daysLate = Math.max(
        0,
        Math.ceil((returnDate.getTime() - rental.dueDate.getTime()) / (1000 * 60 * 60 * 24))
      );
      totalFee += unitPrice * useQty * 0.1 * daysLate;

      rental.quantity -= useQty;
      if (rental.quantity === 0) {
        rental.returned = true;
        rental.returnedAt = returnDate;
      }
      await rental.save();

      results.push({ rentalId: rental._id, returnedQuantity: useQty, daysLate });
      remaining -= useQty;
    }

    if (remaining > 0) {
      throw new Error("Return quantity exceeds active rentals");
    }
  }

  return { results, totalFee };
};

module.exports = {
  createRentalRecord,
  getActiveRentalsByCustomer,
  returnRentalItems,
};
