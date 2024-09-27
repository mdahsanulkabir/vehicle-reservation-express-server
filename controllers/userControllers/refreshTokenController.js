const jwt = require('jsonwebtoken');
const USER = require('../../models/userModel')
require('dotenv').config();

const handleRefreshToken = async (req, res) => {

    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        console.log(cookies.jwt)
        const refreshToken = cookies.jwt;
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403);
                const user = await USER.findOne({ userId: decoded.userId })
                if (!user) return res.sendStatus(401)
                const accessToken = jwt.sign(
                    {   //payload
                        "userId": user.userId,
                        "userRoleId": user.roleId
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: '10h'
                    }
                );
                res.status(200).json({ accessToken, role: user.roleId, userName: user.name, userId: user.userId })
            }
        )
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = {
    handleRefreshToken,
}