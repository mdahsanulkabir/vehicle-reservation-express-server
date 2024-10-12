const USER = require('../../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbConnect, dbDisconnect } = require('../../services/mongoConn');
require('dotenv').config();

const login = async (req, res) => {

    const { userId, password } = req.body;
    console.log(userId, password);
    if (!userId || !password) 
        return res.status(400).json({ 'message': 'userId and password are required.' });

    try {
        console.log("Trying to connect db \n")
        await dbConnect();
        const user = await USER.findOne({userId : userId})
        if (!user) return res.sendStatus(401)
        console.log("User from DB",user)


        const authenticatedUser = await bcrypt.compare(password, user.password);
        if (authenticatedUser) {
            const accessToken = jwt.sign(
                {   //payload
                    "userId": user.userId,
                    "userRoleId": user.roleId
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '10h'
                }
            )
            const refreshToken = jwt.sign(
                {   //payload
                    "userId": user.userId
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: '1d'
                }
            )


            // insert the refreshToken in user credential
            const updatedUser = await USER.findOneAndUpdate(
                {userId : userId},
                { $addToSet: { refreshToken: refreshToken } },
                {new: true}
            );

            // console.log({updatedUser})
            res.cookie('jwt', refreshToken, { 
                httpOnly: true, 
                sameSite:'None',//sameSite issue creates in front end site because the front and back are not in same domain
                secure: true, //secure is for https
                maxAge: 24*60*60*1000}) 
            
            // console.log({accessToken,refreshToken})
            await dbDisconnect();
            res.status(200).json({ accessToken, role: user.roleId, userName: user.name, userId: user.userId, user_id: user._id })
        } else {
            res.status(401).json({'Error': `User ${user.userId} is unauthenticated.`})
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const logOut = async (req, res) => {
    const { userId, refreshToken } = req.body;
    try {
        const updatedUser = await USER.findOneAndUpdate(
            {userId : userId},
            {$pull: { refreshToken: refreshToken } },
            {new: true}
        );
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = {
    login,
}