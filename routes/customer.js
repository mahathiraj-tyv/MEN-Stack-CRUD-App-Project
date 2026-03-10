const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Middleware 

function isCustomer(req, res, next) {
  if (req.session.userRole === 'customer') return next();
  return res.status(403).send('Access denied');
}

// Customer Dashboard

router.get('/dashboard', isCustomer, async (req, res) => {
  try {
    const tickets = await Ticket.find({});

    // Find tickets where current user has bookings
    const userTickets = await Ticket.find({
      "bookings.user": req.session.userId
    });

    const myBookings = [];

    userTickets.forEach(ticket => {
      const booking = ticket.bookings.find(b =>
        b.user.toString() === req.session.userId
      );

      if (booking) {
        myBookings.push({
          _id: ticket._id,
          source: ticket.source,
          destination: ticket.destination,
          price: ticket.price,
          seatsBooked: booking.seatsBooked
        });
      }
    });

    res.render('customer/dashboard', {
      tickets,
      myBookings
    });

  } catch (err) {
    console.error(err);
    res.send('Error loading dashboard');
  }
});

// Search Tickets

router.get('/search', async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    const today = new Date();
    today.setHours(0,0,0,0);

    if (date) {
      const selectedDate = new Date(date);
      if (selectedDate < today) {
        return res.send("Cannot search tickets for past dates.");
      }
    }

    const tickets = await Ticket.find({
      source: new RegExp(source, 'i'),
      destination: new RegExp(destination, 'i'),
      ...(date ? { date } : {})    
    });

    res.render('customer/searchResults', {
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

// Book Ticket 

router.post('/book/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  const seatsRequested = parseInt(req.body.seats);

  if (!ticket || !seatsRequested || seatsRequested <= 0) {
    return res.redirect('/customer/dashboard');
  }

  if (ticket.availableSeats < seatsRequested) {
    return res.send("Not enough seats available");
  }

  // Check if user already booked this ticket
  const existingBooking = ticket.bookings.find(b =>
    b.user.toString() === req.session.userId
  );

  if (existingBooking) {
    existingBooking.seatsBooked += seatsRequested;
  } else {
    ticket.bookings.push({
      user: req.session.userId,
      seatsBooked: seatsRequested
    });
  }

  ticket.availableSeats -= seatsRequested;

  await ticket.save();

  res.redirect('/customer/dashboard');
});

//Cancel Booking 

router.post('/cancel/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.redirect('/customer/dashboard');
  }

  // Find the booking of current user
  const booking = ticket.bookings.find(b =>
    b.user.toString() === req.session.userId
  );

  if (!booking) {
    return res.redirect('/customer/dashboard');
  }

  // Restore seats
  ticket.availableSeats += booking.seatsBooked;

  // Remove booking entry
  ticket.bookings = ticket.bookings.filter(b =>
    b.user.toString() !== req.session.userId
  );

  await ticket.save();

  res.redirect('/customer/dashboard');
});

module.exports = router;