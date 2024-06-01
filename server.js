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
    UserModel.findOne({ email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.status(401).json("Incorrect password");
            }
        } else {
            res.status(404).json("User not found");
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
    const { movieName, theatreName, screenTime, seats, userName, ticketNumber } = req.body;
    TicketModel.create({ movieName, theatreName, screenTime, seats, userName, ticketNumber })
    .then(ticket => res.json({ success: true, ticket }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => {
    console.log("Server is running");
});
