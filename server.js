const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require("cors");
const UserModel = require('./models/User');
const TicketModel = require('./models/Ticket');
const bcrypt = require('bcryptjs');


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
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json("No user found with this email");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json("Incorrect password");
        }
        res.json("Login successful");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User registration endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists with this email");
        }
        const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10
        const newUser = await UserModel.create({ email, password: hashedPassword });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all booked tickets
app.get('/booked-tickets', async (req, res) => {
    try {
        const tickets = await TicketModel.find({});
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Book tickets endpoint
app.post('/book-tickets', async (req, res) => {
    const { movieName, theatreName, screenTime, seats, userName, ticketNumber } = req.body;
    try {
        const newTicket = await TicketModel.create({ movieName, theatreName, screenTime, seats, userName, ticketNumber });
        res.json(newTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server is running");
});