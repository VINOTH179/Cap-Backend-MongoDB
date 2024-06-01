const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');
const TicketModel = require('./models/Ticket');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://vinoth:Vinoth.m007@user.eg3bdy9.mongodb.net", { dbName: "User" });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB using Mongoose successfully');
});

// User login endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.status(401).json("The Password Is Incorrect");
            }
        } else {
            res.status(404).json("No Record Existed");
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// User registration endpoint
app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get all booked tickets
app.get('/booked-tickets', (req, res) => {
    TicketModel.find({})
    .then(tickets => res.json(tickets))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Book tickets endpoint
app.post('/book-tickets', (req, res) => {
    const { movieId, showtime, screenId, seatNumbers } = req.body;
    TicketModel.find({ screenId: screenId, seatNumber: { $in: seatNumbers }, showtime: showtime })
    .then(existingTickets => {
        if (existingTickets.length > 0) {
            res.status(400).json({ error: "Some of the seats are already booked" });
        } else {
            const newTickets = seatNumbers.map(seatNumber => ({ movieId, showtime, screenId, seatNumber }));
            TicketModel.insertMany(newTickets)
            .then(() => res.json({ success: true }))
            .catch(err => res.status(500).json({ error: err.message }));
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
    console.log("Server is running");
});
