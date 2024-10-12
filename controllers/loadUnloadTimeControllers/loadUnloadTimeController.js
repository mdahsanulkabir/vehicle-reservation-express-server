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

module.exports = {
    createLoadUnloadTime,
    getLoadUnloadTimes,
    getSingleLoadUnloadTime
}