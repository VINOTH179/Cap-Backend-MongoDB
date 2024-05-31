const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    screenId: { type: Number, required: true },
    seatIndex: { type: Number, required: true },
});

const TicketModel = mongoose.model("Ticket", TicketSchema);
module.exports = TicketModel;
