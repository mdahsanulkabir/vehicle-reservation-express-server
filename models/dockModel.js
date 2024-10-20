const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dockSchema = new Schema({
    dockNumber: { 
        type: Number, 
        required: true 
    },
    stationType: { 
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', 'F'], 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('DOCK', dockSchema);