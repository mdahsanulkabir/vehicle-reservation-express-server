const express = require('express');
const { verifyJWT } = require('../middleware/auth/verifyJWT');
const { createUser } = require('../controllers/userControllers/registerController');
const { createRole } = require('../controllers/systemSetupControllers/roleController');
const { login } = require('../controllers/userControllers/loginLogoutController');
const { handleRefreshToken } = require('../controllers/userControllers/refreshTokenController');
const { getAllUsers } = require('../controllers/userControllers/getUserController');


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from Reservation routes \n");
});

router.post("/login", login)
router.get("/refresh", handleRefreshToken)

router.use(verifyJWT);

router.get("/users", getAllUsers)
router.post("/user", createUser);
router.post("/role", createRole);

module.exports = router;