const userModel = require('../models/User');


exports.getUserDetails = async (req, res) => {
  try {
    // Extract accNumber from request parameters
    const { accNumber } = req.params;

    // Find the user in the database by their account number
    const user = await userModel.findOne({ accNumber: accNumber });

    // If user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user details, excluding sensitive information like password
    const { password, ...userDetails } = user.toObject();
    res.json(userDetails);
  } catch (error) {
    // Handle any errors that occur during the operation
    res.status(500).json({ message: "Failed to retrieve user details", error: error.message });
  }
};



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
