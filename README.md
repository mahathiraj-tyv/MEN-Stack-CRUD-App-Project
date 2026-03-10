TravelZap – Bus Booking Application

Project Overview

TravelZap is a backend-focused bus ticket booking application built using the MEN Stack (MongoDB, Express.js, Node.js) with EJS templating for server-side rendering.

The application follows RESTful architecture principles and demonstrates CRUD operations, role-based authentication, session management, and basic testing using Jest.

Features:

User Features :
1. User Registration & Login
2. Secure Authentication
3. Book Bus Tickets
4. View Booking History
5. User Dashboard

Admin Features:
1. Manage Bus Listings
2. Add New Bus Routes
3. Manage Users

Additional Enhancements:

- Seat availability validation

- Prevent booking past travel dates

- Currency localization (₹ instead of $)

Technologies used:
Backend -Node.js, Express.js

Database- MongoDB, Mongoose

Frontend- EJS, Bootstrap

Authentication- express-session, connect-mongo, bcrypt (password hashing)

Testing- Jest

## Project Structure


## Project Structure

```
MEN-STACK-CRUD-APP-PROJECT
│
├── middleware
│   └── auth.js
│
├── models
│   ├── Booking.js
│   ├── Ticket.js
│   └── User.js
│
├── public
│   ├── css
│   │   └── style.css
│   └── js
│
├── routes
│   ├── admin.js
│   ├── customer.js
│   ├── index.js
│   └── tickets.js
│
├── tests
│   └── booking.test.js
│
├── utils
│   └── booking.js
│
├── views
│   ├── admin
│   │   ├── dashboard.ejs
│   │   ├── editTicket.ejs
│   │   ├── searchResults.ejs
│   │   └── tickets.ejs
│   │
│   ├── customer
│   │   ├── dashboard.ejs
│   │   ├── register.ejs
│   │   └── searchResults.ejs
│   │
│   ├── partials
│   │   ├── footer.ejs
│   │   └── header.ejs
│   │
│   ├── index.ejs
│   └── login.ejs
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```
Booking Logic

The booking system ensures proper seat management:

1. User selects ticket

2. System validates seat request

3. Check if seats are available

4. Deduct seats from availableSeats

5. Save booking under ticket document

If booking is cancelled:

1. Seats are restored

2. Booking entry is removed. This prevents overbooking issues.

Session Management

The project uses:

- express-session → manages user sessions

- connect-mongo → stores session data in MongoDB

This allows persistent login sessions and role-based access control.


Unit Testing

Basic unit tests were implemented using Jest.

Test coverage includes:

- Seat deduction logic

- Prevention of overbooking

Chatbot Feature

A simple rule-based chatbot was integrated to assist users with common queries such as:

- Booking help

- Refund policy

- Cancellation process

Future Enhancements

- Passenger details per booking

- Payment gateway integration

- AI-powered chatbot

Installation & Setup

git clone <repository-url>
cd travelzap

Install Dependencies
npm install

Start Server- npm start

Server runs on: http://localhost:3000


Learning Outcomes

This project demonstrates:

- RESTful API design

- Backend routing and middleware

- CRUD operations
<img width="1662" height="655" alt="Screenshot 2026-02-27 102156" src="https://github.com/user-attachments/assets/87bddd2c-734b-43a5-84e7-304038db763c" />
<img width="1882" height="783" alt="Screenshot 2026-02-27 102010" src="https://github.com/user-attachments/assets/3bef0074-5082-4a05-a5d6-e1ae542b9ae3" />
<img width="1892" height="897" alt="Screenshot 2026-02-27 102759" src="https://github.com/user-attachments/assets/24de36bd-6444-4498-9381-7173302df553" />




- Session-based authentication

Rule-based chatbot support for FAQs

Unit testing using Jest
