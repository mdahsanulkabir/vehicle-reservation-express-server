const mongoose = require('mongoose')

const Schema = mongoose.Schema

const roleSchema = new Schema({
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('ROLE', roleSchema)