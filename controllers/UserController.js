const userModel = require('../models/User');

exports.getTransactions = async (req, res) => {
  try {
    const user = await userModel.findOne({ accNumber: req.params.accNumber });
    res.json(user.transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};

exports.transferFunds = async (req, res) => {
  // Implementation for transferring funds
};

exports.getSavingsBalance = async (req, res) => {
  try {
    const user = await userModel.findOne({ accNumber: req.params.accNumber });
    res.json({ savingsBalance: user.savingsBalance });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch savings balance", error: error.message });
  }
};

exports.updateSavingsBalance = async (req, res) => {
  // Implementation for updating savings balance
};
