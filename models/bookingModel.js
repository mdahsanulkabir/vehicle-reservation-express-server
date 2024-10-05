const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },  // Reference to the user who made the booking
    bookingDate: {
        type: Date,
        required: true
    },  // The date of the booking
    dockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DOCK',
        required: true
    },  // Reference to the dock that is auto-assigned by the system
    loadUnloadTime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LOADUNLOADTIME',
        required: true
    },  // Container size/type
    startTime: {
        type: Date,
        required: true
    },  // Start time for loading/unloading
    endTime: {
        type: Date,
        required: true
    },  // End time for loading/unloading
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending'
    },  // Booking status
}, { timestamps: true });

module.exports = mongoose.model('BOOKING', bookingSchema);