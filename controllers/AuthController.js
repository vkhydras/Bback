const jwt = require('jsonwebtoken');

const userModel = require('../models/User');

const AuthController = {
  async register(req, res) {
    try {
      const userData = req.body;
      const user = await userModel.create({ ...userData });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { accNumber, password } = req.body;
      const user = await userModel.findOne({ accNumber });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid account number or password' });
      }
  
      const isPasswordValid = user.password === password;
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: error.message });
    }
  },
  
  async profile(req, res) {
    const user = req.User;
    res.status(200).json({ user });
  }
};

module.exports = AuthController;
