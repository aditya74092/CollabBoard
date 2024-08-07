const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

// Add a new supplier
router.post('/add', auth, async (req, res) => {
    const { name, email, number } = req.body;
    const modifiedDate = new Date(); // Set current date and time as default

    if (!name || !email || !number) {
        return res.status(400).json({ error: 'Name, email, and number are required' });
    }

    try {
        const newSupplier = await Supplier.create({ name, email, number, modifiedDate });
        res.json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all suppliers
router.get('/', auth, async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
