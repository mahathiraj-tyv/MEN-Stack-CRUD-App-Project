function deductSeats(availableSeats, seatsRequested) {
  if (seatsRequested > availableSeats) {
    throw new Error("Not enough seats");
  }
  return availableSeats - seatsRequested;
}

module.exports = { deductSeats };