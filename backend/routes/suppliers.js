const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');

// Add a new supplier
router.post('/add', auth, async (req, res) => {
    const { name, email, number } = req.body;
    const userid = req.user.id;  // Match the case with the database column

    if (!name || !email || !number) {
        return res.status(400).json({ error: 'Name, email, and number are required' });
    }

    try {
        const newSupplier = await Supplier.create({ name, email, number, userid });
        res.json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Get all suppliers for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({ where: { userid: req.user.id } });  // Fetch suppliers for the logged-in user
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;