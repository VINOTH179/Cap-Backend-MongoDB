const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    showtime: { type: String, required: true },
    seatNumber: { type: String, required: true },
}, {
    timestamps: true
});

BookingSchema.index({ movieId: 1, showtime: 1, seatNumber: 1 }, { unique: true });

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
