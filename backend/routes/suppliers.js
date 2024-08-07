const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

// Add a new supplier
router.post('/add', auth, async (req, res) => {
    const { name, email, number, modifiedDate } = req.body;

    if (!name || !email || !number || !modifiedDate) {
        return res.status(400).json({ error: 'Name, email, number, and modifiedDate are required' });
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
