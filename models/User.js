const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['Debit', 'Credit'] },
  amount: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  accNumber: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String, 
  address: String, 
  membershipSince: { type: Date, default: Date.now },
  transactions: [transactionSchema], // Embedding transaction schema
  savingsBalance: { type: Number, default: 0 }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
