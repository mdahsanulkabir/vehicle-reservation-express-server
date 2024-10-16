const USER = require('../../models/userModel')
const bcrypt = require('bcrypt');
const { dbConnect } = require('../../services/mongoConn');

const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body

    try {
        await dbConnect();
        const user = await USER.findById(userId)
        if (!user) {
            res.status(404).json({ message: "user not found" });
        } else {
            const authenticatedUser = await bcrypt.compare(oldPassword, user.password);
            if (!authenticatedUser) {
                res.status(401).json({ 'Error': `User ${user.userId} is unauthenticated.` })
            } else {
                const newHashedPassword = await bcrypt.hash(newPassword, 10)

                await USER.findByIdAndUpdate(
                    user._id,
                    {
                        password: newHashedPassword,
                        refreshToken: []
                    },
                    { new: true }
                )

                const updatedUser2 = await USER.findById(user._id)
                    .populate('roleId')
                // .select('-password -refreshToken');
                res.status(200).json(updatedUser2);
            }
        }
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    changePassword,
}