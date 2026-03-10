const { deductSeats } = require('../utils/booking');

test("should deduct seats correctly", () => {
  const result = deductSeats(10, 3);
  expect(result).toBe(7);
});

test("should throw error if seats exceed availability", () => {
  expect(() => deductSeats(5, 10)).toThrow("Not enough seats");
});