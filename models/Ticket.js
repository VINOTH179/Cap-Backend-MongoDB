const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    movieName: { type: String, required: true },
    theatreName: { type: String, required: true },
    screenTime: { type: String, required: true },
    seats: { type: Number, required: true },
    userName: { type: String, required: true },
    ticketNumber: { type: String, required: true },
});

module.exports = mongoose.model('Ticket', TicketSchema);