const mongoose = require('mongoose')
const Schema = mongoose.Schema

const materialStationSchema = new Schema({
    materialType: {
        type: String,
        required: true
    },
    stationType: { 
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', 'F'], 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('MATERIALSTATION', materialStationSchema);