const VALID_TYPES = ["credit", "debit"];

class TransactionModel {
  static create({ userId, type, amount, category, note }) {
    const parsedAmount = Number(amount);
    if (!userId || !type || !category || !note) {
      throw new Error("userId, type, category and note are required");
    }
    if (!VALID_TYPES.includes(type)) {
      throw new Error("Invalid transaction type");
    }
    if (!parsedAmount || parsedAmount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    return {
      id: `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      userId,
      type,
      amount: parsedAmount,
      category,
      note,
      createdAt: new Date().toISOString()
    };
  }
}

module.exports = { TransactionModel, VALID_TYPES };
