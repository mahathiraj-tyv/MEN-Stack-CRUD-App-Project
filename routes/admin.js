const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');

// Middleware
function isAdmin(req, res, next) {
  if (req.session.userRole === 'admin') return next();
  return res.status(403).send('Access denied');
}

// Dashboard
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    const customers = await User.find({ role: 'customer' });

    res.render('admin/dashboard', { tickets, customers });
  } catch (err) {
    console.error(err);
    res.send('Error loading dashboard');
  }
});

// Create ticket
router.post('/tickets', isAdmin, async (req, res) => {
  const { busName, source, destination, departureTime, arrivalTime, availableSeats, price, date } = req.body;
  try {
    await Ticket.create({ busName, source, destination, departureTime, arrivalTime, availableSeats, price, date });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Error creating ticket');
  }
});

// Edit ticket form
router.get('/tickets/:id/edit', isAdmin, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.send('Ticket not found');
    res.render('admin/editTicket', { ticket });
  } catch (err) {
    console.error(err);
    res.send('Error loading ticket');
  }
});

// Update ticket
router.post('/tickets/:id', isAdmin, async (req, res) => {
  const { busName, source, destination, departureTime, arrivalTime, availableSeats, price, date } = req.body;
  try {
    await Ticket.findByIdAndUpdate(req.params.id, {
      busName, source, destination, departureTime, arrivalTime, availableSeats, price, date
    });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Error updating ticket');
  }
});

// Delete ticket
router.post('/tickets/:id/delete', isAdmin, async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Error deleting ticket');
  }
});

// Approve customer
router.post('/approve-customer/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { approved: true });
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Approval failed');
  }
});

// Search tickets
router.get('/search-tickets', isAdmin, async (req, res) => {
  const { source, destination, date } = req.query;

  try {
    const tickets = await Ticket.find({
      source: new RegExp(source, 'i'),
      destination: new RegExp(destination, 'i'),
      ...(date ? { date } : {}) // optional date filter
    });

    res.render('admin/searchResults', {
      tickets,
      source,
      destination,
      date
    });
  } catch (err) {
    console.error(err);
    res.send('Search failed');
  }
});

module.exports = router;