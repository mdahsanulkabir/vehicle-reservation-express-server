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


const getBookingsByDate = async (req, res) => {
    const { bookingDate } = req.query;
    const localDateToUTCMidnight = new Date(bookingDate)
    localDateToUTCMidnight.setUTCHours(0, 0, 0, 0)
    const localDateStartAtUTC = new Date(localDateToUTCMidnight.getTime() - 6 * 60 * 60 * 1000);
    const localDateEndAtUTC = new Date(localDateStartAtUTC.getTime() + 24 * 60 * 60 * 1000);
    //console.log({localDateStartingAtUTC, localDateEndAtUTC})
    try {
        await dbConnect();
        const bookingsByDate = await BOOKING.find({
            bookingDate: { $gte: localDateStartAtUTC, $lt: localDateEndAtUTC }
        })
            .populate('user', '-refreshToken -password')
            .populate('dockId')
            .populate({
                path: 'loadUnloadTime',
                populate: {
                    path: 'stationForMaterial'
                }
            });
        res.status(200).json(bookingsByDate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteBookingById = async (req, res) => {
    const { bookingId } = req.query
    if (!bookingId) {
        return res.status(400).json({ error: 'Booking ID is required' });
    }

    try {
        await dbConnect();

        // // Validate and convert the bookingId to a MongoDB ObjectId
        // const bookingObjectId = new mongoose.Types.ObjectId(bookingId);

        // Attempt to delete the booking
        const result = await BOOKING.deleteOne({ _id: bookingId });

        if (result.deletedCount === 0) {
            // If no booking was deleted, it means the ID was not found
            return res.status(404).json({ error: 'Booking not found' });
        }

        console.log("Deleted booking ID:", bookingId);
        res.status(200).json({ message: `Booking with ID ${bookingId} deleted successfully` });
    } catch (error) {
        console.error('Error deleting booking:', error); // Log the detailed error
        res.status(500).json({ error: 'An error occurred while deleting the booking' });
    }
}



module.exports = {
    createBooking,
    getBookings,
    getBookingsByDate,
    deleteBookingById
}