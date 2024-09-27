const USER = require('../../models/userModel')
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { name, userId, email, roleId } = req.body;
    if (!userId || !roleId) return res.status(400).json({ 'message': 'userId and roleId are required.' });

    const duplicateUser = await USER.findOne({userId : userId})
    if (duplicateUser) return res.status(409).json({ 'message': "Duplicate User found." });
    
    //encrypt the password
    const hashedPassword = await bcrypt.hash("singerBD123!@", 10)

    //create and store the new user
    try {
        const newUser = await USER.create({
            name, 
            userId,
            email,
            roleId,
            password : hashedPassword
        })
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { createUser };