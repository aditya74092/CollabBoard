const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const auth = require('../middleware/auth');

// Add a new Shop
router.post('/add', auth, async (req, res) => {
    const { shop_name, user_first_name, user_last_name,number } = req.body;
    const userid = req.user.id;  // Get the userId from the authenticated user
    const created_at = new Date(); //fecth currect time ;//

    if (!shop_name || !user_first_name  || !user_last_name || !number) {
        return res.status(400).json({ error: 'Details are incomplete' });
    }

    try {
        const newShop = await Shop.create({ shop_name, user_first_name, user_last_name,number,userid,created_at });
        res.json(newShop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all Shops
// Get all Shops for the logged-in user
router.get('/', auth, async (req, res) => {
    try {
        const shops = await Shop.findAll({ where: { userid: req.user.id } });  // Fetch customers for the logged-in user
        res.json(shops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;