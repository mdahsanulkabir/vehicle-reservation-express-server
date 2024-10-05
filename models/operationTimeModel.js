//Normal operation time is 8 am to 3 pm. But if there is any difference, then it will be recorded in this schema


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const operationTimeSchema = new Schema({
    selectedDate: {
        type: Date,
        required: true
    },
    station: { 
        type: String, 
        enum: ['A', 'B', 'C','D'], 
        required: true 
    },
    operationStartTime: { 
        type: Date, 
        required: true 
    },  // Start time for loading/unloading
    operationEndTime: { 
        type: Date, 
        required: true 
    },  // End time for loading/unloading
}, { timestamps: true });

module.exports = mongoose.model('OPERATIONTIME', operationTimeSchema);