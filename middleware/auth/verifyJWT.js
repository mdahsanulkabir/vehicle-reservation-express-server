const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) res.sendStatus(401);
    console.log({authHeader});
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.accessedUserId = decoded.userId;
            req.accessedUserRoleId = decoded.userRoleId;
            next()
        }
    )
}

module.exports = {
    verifyJWT
}