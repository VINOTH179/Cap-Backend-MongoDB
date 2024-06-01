// User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Add username field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // other fields if necessary
});

module.exports = mongoose.model('User', UserSchema);
