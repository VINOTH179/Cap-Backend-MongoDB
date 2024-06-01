const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    showtime: { type: String, required: true },
    screenId: { type: String, required: true },
    seatNumber: { type: Number, required: true },
});

module.exports = mongoose.model('Ticket', TicketSchema);
