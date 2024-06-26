const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ username, password: hashedPassword });

      // Optionally generate a token for the newly registered user
      const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

      return res.json({ token });
  } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).send('Internal server error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await User.findOne({ where: { username } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.status(401).send('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      return res.json({ token });
  } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).send('Internal server error');
  }
});


module.exports = router;
