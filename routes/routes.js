const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController'); 

// Existing auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', AuthController.profile);

// Additional user-related routes
router.get('/user/:accNumber', UserController.getUserDetails);
router.get('/user/:accNumber/transactions', UserController.getTransactions);
router.post('/user/:accNumber/transactions', UserController.updateTransactions);
router.post('/user/:accNumber/transfer', UserController.transferFunds);
router.get('/user/:accNumber/savings', UserController.getSavingsBalance);
router.post('/user/:accNumber/savings', UserController.updateSavingsBalance);
router.post('/user/:accNumber', UserController.updateMainAccBalance)

module.exports = router;
