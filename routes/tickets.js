// routes/tickets.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { isAdmin } = require('../middleware/auth');

// List all tickets (Admin)
router.get('/', isAdmin, async (req, res) => {
    const tickets = await Ticket.find();
    res.render('tickets/index', { tickets });
});

// Add Ticket - GET form
router.get('/new', isAdmin, (req, res) => {
    res.render('tickets/new');
});

// Add Ticket - POST
router.post('/', isAdmin, async (req, res) => {
    const { source, destination, availableSeats, price } = req.body;
    await Ticket.create({ source, destination, availableSeats, price });
    res.redirect('/tickets');
});

// Edit Ticket - GET form
router.get('/:id/edit', isAdmin, async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);
    res.render('tickets/edit', { ticket });
});

// Update Ticket - PUT
router.post('/:id', isAdmin, async (req, res) => {
    const { source, destination, availableSeats, price } = req.body;
    await Ticket.findByIdAndUpdate(req.params.id, { source, destination, availableSeats, price });
    res.redirect('/tickets');
});

// Delete Ticket
router.post('/:id/delete', isAdmin, async (req, res) => {
    await Ticket.findByIdAndDelete(req.params.id);
    res.redirect('/tickets');
});

module.exports = router;