const ROLE = require('../../models/roleModel');
const { dbConnect } = require('../../services/mongoConn');

//create a new authorization role
const createRole = async (req, res) => {
    console.log(req.body);
    const { role } = req.body;
    //add doc to db
    try {
        await dbConnect();
        const newRole = await ROLE.create({
            role,
        })
        res.status(200).json(newRole);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all roles
const getRoles = async (req, res) => {
    // console.log("role in getroles", req.userRole);
    try {
        await dbConnect();
        const roles = await ROLE.find({})
        res.status(200).json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createRole,
    getRoles
}