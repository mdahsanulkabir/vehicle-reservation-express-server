const LOADUNLOADTIME = require('../../models/loadUnloadTimeModel');
const { dbConnect } = require('../../services/mongoConn');

//create a new authorization role
const createLoadUnloadTime = async (req, res) => {
    console.log(req.body);
    const { containerSize, stationForMaterial, loadedWithPallete, requiredTime } = req.body;
    //add doc to db
    try {
        await dbConnect();
        const newLoadUnloadTime = await LOADUNLOADTIME.create({
            containerSize, stationForMaterial, loadedWithPallete, requiredTime
        })
        const newLoadUnloadTimeDetail = await LOADUNLOADTIME.findById(newLoadUnloadTime._id)
            .populate('stationForMaterial')

        res.status(200).json(newLoadUnloadTimeDetail);
    } catch (error) {
        console.error('Error creating dock:', error);
        res.status(400).json({ error: error.message });
    }
};

//get all roles
const getLoadUnloadTimes = async (req, res) => {
    // console.log("role in getroles", req.userRole);
    try {
        await dbConnect();
        const loadUnloadTimes = await LOADUNLOADTIME.find({}).populate('stationForMaterial');
        res.status(200).json(loadUnloadTimes);
    } catch (error) {
        console.error('Error creating dock:', error);
        res.status(400).json({ error: error.message });
    }
};

const getSingleLoadUnloadTime = async (req, res) => {
    console.log(req.body);
    const { containerSize, stationForMaterial, loadedWithPallete } = req.query;

    try {
        await dbConnect();
        const loadUnloadTime = await LOADUNLOADTIME.findOne({
            containerSize, stationForMaterial, loadedWithPallete
        }).populate('stationForMaterial');

        console.log(loadUnloadTime)
        res.status(200).json(loadUnloadTime);
    } catch (error) {
        console.error('Error creating dock:', error);
        res.status(400).json({ error: error.message });
    }
}

const deleteSingleLoadUnloadTime = async (req, res) => {
    const { id } = req.query;
    try {
        await dbConnect();
        const deletedLoadUnloadTime = await LOADUNLOADTIME.findOneAndDelete({
            _id: id
        }).populate('stationForMaterial');

        console.log(deletedLoadUnloadTime)
        res.status(200).json(deletedLoadUnloadTime);
    } catch (error) {
        console.error('Error deleting single loadunload time:', error);
        res.status(400).json({ error: error.message });
    }
}

const editLoadUnloadTime = async (req, res) => {
    const { id } = req.query;
    const { containerSize, stationForMaterial, loadedWithPallete, requiredTime } = req.body;
    try {
        await dbConnect();

        // Check if the document exists
        const existingEntry = await LOADUNLOADTIME.findById(id);
        if (!existingEntry) {
            return res.status(404).json({ error: "Load/Unload time entry not found" });
        }

        // Perform the update and return the updated document
        const updatedLoadUnloadTime = await LOADUNLOADTIME.findByIdAndUpdate(
            id,
            { containerSize, stationForMaterial, loadedWithPallete, requiredTime },
            { new: true } // Return the updated document
        ).populate('stationForMaterial');

        console.log('Updated LoadUnloadTime:', updatedLoadUnloadTime);
        res.status(200).json(updatedLoadUnloadTime);

    } catch (error) {
        console.error('Error updating loadunload time:', error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createLoadUnloadTime,
    getLoadUnloadTimes,
    getSingleLoadUnloadTime,
    deleteSingleLoadUnloadTime,
    editLoadUnloadTime
}