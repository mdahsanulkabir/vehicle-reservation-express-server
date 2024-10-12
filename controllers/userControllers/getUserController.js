const USER = require('../../models/userModel');
const { dbConnect } = require('../../services/mongoConn');

const getAllUsers = async (req, res) => {
    try {
        await dbConnect();
        const users = await USER.find({})
        .populate('roleId')
        .select('-password -refreshToken');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserById = async (req, res) => {
    const userId = req.body;
    console.log(userId)
    try {
        const user = await USER.findOne(userId)
        .populate('roleId')
        .select('-password -refreshToken');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { 
    getAllUsers,
    getUserById
};