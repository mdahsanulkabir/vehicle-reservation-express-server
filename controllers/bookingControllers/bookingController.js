const BOOKING = require('../../models/bookingModel');
const { dbConnect } = require('../../services/mongoConn');
const mongoose = require('mongoose')

//create a new authorization role
const createBooking = async (req, res) => {
    console.log(req.body);
    const {
        user, // userId in mongodb
        bookingDate,
        dockId, // dokId in mongodb
        loadUnloadTime, // loadunloadtime id from mongodb
        startTime, // start time requested by user
        endTime,
        status,  //['pending', 'confirmed', 'completed', 'canceled'], default: pending
        driverName,
        driverContactNumber,
        vehicleRegistrationNumber
    } = req.body;
    //add doc to db

    const userId = new mongoose.Types.ObjectId(user)
    const dock_id = new mongoose.Types.ObjectId(dockId)
    const loadUnload_time = new mongoose.Types.ObjectId(loadUnloadTime)
    try {
        await dbConnect();
        const newBooking = await BOOKING.create({
            user: userId, // userId in mongodb
            bookingDate,
            dockId: dock_id, // dokId in mongodb
            loadUnloadTime: loadUnload_time, // loadunloadtime id from mongodb
            startTime, // start time requested by user
            endTime,
            status,
            driverName,
            driverContactNumber,
            vehicleRegistrationNumber
        })
        const newBooking2 = await BOOKING.findById(newBooking._id)
            .populate('user', '-refreshToken -password')
            .populate('dockId')
            .populate({
                path: 'loadUnloadTime',
                populate: {
                    path: 'stationForMaterial'
                }
            });
        console.log("new book data :", newBooking2)
        res.status(200).json(newBooking2);
    } catch (error) {
        console.error('Error creating dock:', error); // Log the detailed error
        res.status(400).json({ error: error.message });
    }
};

//get all roles
const getBookings = async (req, res) => {
    try {
        await dbConnect();
        const docks = await BOOKING.find({})
            .populate('user', '-refreshToken -password')
            .populate('dockId')
            .populate({
                path: 'loadUnloadTime',
                populate: {
                    path: 'stationForMaterial'
                }
            });
        res.status(200).json(docks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createBooking,
    getBookings
}