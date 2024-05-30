const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    screenId: Number,
    seatIndex: Number
});

const TicketModel = mongoose.model("Ticket", TicketSchema);
module.exports = TicketModel;
