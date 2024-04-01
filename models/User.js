const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date },
  description: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  accNumber: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String, 
  address: String, 
  membershipSince: { type: Date },
  transactions: [transactionSchema], // Embedding transaction schema
  mainAccBalance: { type: String },
  savingsBalance: { type: Number, default: 0 }
});

// Method to validate the password
userSchema.methods.isValidPassword = function (password) {
  return this.password === password;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
