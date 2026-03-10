const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  source: String,
  destination: String,
  date: Date,
  price: Number,
  totalSeats: Number,
  availableSeats: Number,

  bookings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      seatsBooked: Number
    }
  ]
});

module.exports = mongoose.model('Ticket', ticketSchema);