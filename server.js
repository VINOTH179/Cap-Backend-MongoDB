const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/User');
const TicketModel = require('./models/Ticket'); // Import Ticket model

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://vinoth:Vinoth.m007@user.eg3bdy9.mongodb.net", { dbName: "User" });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB using Mongoose successfully');
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("The Password Is Incorrect");
            }
        } else {
            res.json("No Record Existed");
        }
    });
});

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err));
});

app.get('/booked-tickets', (req, res) => {
    TicketModel.find({})
    .then(tickets => res.json(tickets))
    .catch(err => res.json(err));
});

app.post('/book-tickets', (req, res) => {
    const { screenId, seatIndices } = req.body;
    TicketModel.find({ screenId: screenId, seatIndex: { $in: seatIndices } })
    .then(existingTickets => {
        if (existingTickets.length > 0) {
            res.status(400).json({ error: "Some of the seats are already booked" });
        } else {
            const newTickets = seatIndices.map(index => ({ screenId, seatIndex: index }));
            TicketModel.insertMany(newTickets)
            .then(() => res.json({ success: true }))
            .catch(err => res.status(500).json(err));
        }
    });
});

app.listen(5000, () => {
    console.log("Server is running");
});
