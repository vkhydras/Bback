const userModel = require('../models/User');
  
const AuthController = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.create({ email, password });
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: error.message });
    }
  },

  async profile(req, res) {
    const user = req.user;
    res.status(200).json({ user });
  }
};

module.exports = AuthController;
