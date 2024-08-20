const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

// Add a new customer
router.post('/add', auth, async (req, res) => {
    const { name, email, number } = req.body;
    const userid = req.user.id;  // Get the userId from the authenticated user

    if (!name || !email || !number) {
        return res.status(400).json({ error: 'Name, email, and number are required' });
    }

    try {
        const newCustomer = await Customer.create({ name, email, number, userid });
        res.json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all customers
// Get all customers for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const customers = await Customer.findAll({ where: { userid: req.user.id } });  // Fetch customers for the logged-in user
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;