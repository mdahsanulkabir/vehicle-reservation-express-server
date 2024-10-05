const mongoose = require('mongoose')
const Schema = mongoose.Schema

const loadUnloadTimeSchema = new Schema({
    containerSize: {
        type: Number,
        enum: [8, 12, 20, 23, 30, 40],
        required: true
    },
    stationForMaterial: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MATERIALSTATION',
        required: true,
        default: 30
    },
    loadedWithPallete : {
        type: Boolean,
        required: true,
        default: false
    },
    requiredTime: {
        type: Number,
        required: true,
        default: 30
    }
}, { timestamps: true });

module.exports = mongoose.model('LOADUNLOADTIME', loadUnloadTimeSchema);