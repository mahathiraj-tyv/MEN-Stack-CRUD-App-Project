const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Ticket = require('../models/Ticket');

// Home page
router.get('/', (req, res) => res.render('index'));

// Login page
router.get("/login", (req, res) => res.render("login"));

// Registration page
router.get('/register', (req, res) => res.render('customer/register'));

// Register POST
router.post('/register', async (req, res) => {
  try {
    const name = req.body.name.trim();
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;

    // Check if email already exists
    const exists = await User.findOne({ email });
    if (exists) return res.send('Email already registered.');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'customer',
      approved: false // must be approved by admin
    });

    res.send('Registration submitted. Await admin approval.');
  } catch (err) {
    console.error(err);
    res.send('Error during registration.');
  }
});

// Login POST
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) return res.send('Invalid credentials');

    // Password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('Invalid credentials');

    if (!user.approved) return res.send('Await admin approval');

    // Save session
    req.session.userId = user._id;
    req.session.userRole = user.role;

    res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Error during login.');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

// Customer ticket search (must be logged in)
router.get('/customer/search-tickets', async (req, res) => {
  if (!req.session.userId) return res.redirect('/register');

  const { source, destination, date } = req.query;

  try {
    const tickets = await Ticket.find({
      source: new RegExp(source, 'i'),
      destination: new RegExp(destination, 'i')
    });

    res.render('customer/searchResults', { tickets, source, destination, date });
  } catch (err) {
    console.error('Search error:', err);
    res.send('Search failed');
  }
});

module.exports = router;