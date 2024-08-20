const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

// Add a new supplier
router.post('/add', auth, async (req, res) => {
    const { name, email, number } = req.body;
    const userId = req.user.id;  // Get the userId from the authenticated user

    if (!name || !email || !number) {
        return res.status(400).json({ error: 'Name, email, and number are required' });
    }

    try {
        const newSupplier = await Supplier.create({ name, email, number, userId });
        res.json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all suppliers
router.get('/', auth, async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({ where: { userId: req.user.id } });  // Fetch suppliers for the logged-in user
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
