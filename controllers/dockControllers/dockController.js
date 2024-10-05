const DOCK = require('../../models/dockModel');
const { dbConnect } = require('../../services/mongoConn');

//create a new authorization role
const createDock = async (req, res) => {
    console.log(req.body);
    const { dockNumber, stationType } = req.body;
    //add doc to db
    try {
        await dbConnect();
        const newDock = await DOCK.create({
            dockNumber,
            stationType
        })
        res.status(200).json(newDock);
    } catch (error) {
        console.error('Error creating dock:', error); // Log the detailed error
        res.status(400).json({ error: error.message });
    }
};

//get all roles
const getDocks = async (req, res) => {
    // console.log("role in getroles", req.userRole);
    try {
        await dbConnect();
        const docks = await DOCK.find({})
        res.status(200).json(docks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createDock,
    getDocks
}