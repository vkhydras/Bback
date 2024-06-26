const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: String },
  description: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {type: String}
});

const userSchema = new mongoose.Schema({
  accNumber: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String, 
  address: String, 
  membershipSince: { type: String },
  transactions: [transactionSchema], // Embedding transaction schema
  mainAccBalance: { type: String },
  savingsBalance: { type: Number, default: 0 },
  email: {type: String},
  blocked: {type: Boolean, default: false}
});

// Method to validate the password
userSchema.methods.isValidPassword = function (password) {
  return this.password === password;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
