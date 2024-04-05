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

exports.updateTransactions = async (req, res) => {
  try {
    // Extract accNumber from request parameters
    const { accNumber } = req.params;
    // Extract transaction details from request body
    const { date, description, type, amount, status } = req.body;

    // Create a new transaction object
    const newTransaction = {
      date,
      description,
      type,
      amount,
      status
    };

    // Update user's transactions array
    const updatedUser = await userModel.findOneAndUpdate(
      { accNumber: accNumber },
      { 
        $push: { 
          transactions: {
            $each: [newTransaction],
            $position: 0 // This ensures the new transaction is added at the start of the array
          } 
        }
      },
      { new: true } // Return the updated document
    );

    // If the user is not found, return a 404 Not Found response
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message
    res.json({ message: "Transaction updated successfully", updatedUser });
  } catch (error) {
    // Handle any errors that occur during the operation
    res.status(500).json({ message: "Failed to update transactions", error: error.message });
  }
};

exports.updateMainAccBalance = async (req, res) => {
  try {
    const { accNumber } = req.params;
    const { amount, operation } = req.body; // Expect amount and operation (e.g., "deposit" or "withdraw") in request body

    // Find the user by accNumber
    const user = await userModel.findOne({ accNumber: accNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate new balance based on operation
    let newBalance;
    if (operation === "deposit") {
      newBalance = user.mainAccBalance + amount;
    } else if (operation === "withdraw") {
      newBalance = user.mainAccBalance - amount;
      if (newBalance < 0) {
        return res.status(400).json({ message: "Insufficient funds for this operation" });
      }
    } else {
      return res.status(400).json({ message: "Invalid operation" });
    }

    // Update the user's main account balance
    user.mainAccBalance = newBalance;
    await user.save();

    // Respond with the updated balance
    res.json({ message: "Main account balance updated successfully", mainAccBalance: newBalance });
  } catch (error) {
    res.status(500).json({ message: "Failed to update main account balance", error: error.message });
  }
};

