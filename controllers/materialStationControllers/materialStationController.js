const MATERIALSTATION = require('../../models/materialStationModel');
const { dbConnect } = require('../../services/mongoConn');

//create a new authorization role
const createMaterialStationDefinition = async (req, res) => {
    console.log(req.body);
    const { materialType, stationType } = req.body;
    //add doc to db
    try {
        await dbConnect();
        const newMaterialStationDefinition = await MATERIALSTATION.create({
            materialType, stationType
        })
        res.status(200).json(newMaterialStationDefinition);
    } catch (error) {
        console.error('Error creating dock:', error);
        res.status(400).json({ error: error.message });
    }
};

//get all roles
const getMaterialStationDefinitions = async (req, res) => {
    // console.log("role in getroles", req.userRole);
    try {
        await dbConnect();
        const materialStationDefinitions = await MATERIALSTATION.find({})
        res.status(200).json(materialStationDefinitions);
    } catch (error) {
        console.error('Error creating dock:', error);
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createMaterialStationDefinition,
    getMaterialStationDefinitions
}