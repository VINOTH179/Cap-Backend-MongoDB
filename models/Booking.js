const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    // other fields if necessary
});

module.exports = mongoose.model('Booking', BookingSchema);
