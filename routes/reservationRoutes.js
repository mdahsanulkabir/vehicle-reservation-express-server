const express = require('express');
const { verifyJWT } = require('../middleware/auth/verifyJWT');
const { createUser } = require('../controllers/userControllers/registerController');
const { createRole, getRoles } = require('../controllers/systemSetupControllers/roleController');
const { login } = require('../controllers/userControllers/loginLogoutController');
const { handleRefreshToken } = require('../controllers/userControllers/refreshTokenController');
const { getAllUsers } = require('../controllers/userControllers/getUserController');
const { createDock, getDocks } = require('../controllers/dockControllers/dockController');
const { createLoadUnloadTime, getLoadUnloadTimes, getSingleLoadUnloadTime, deleteSingleLoadUnloadTime, editLoadUnloadTime } = require('../controllers/loadUnloadTimeControllers/loadUnloadTimeController');
const { getMaterialStationDefinitions, createMaterialStationDefinition } = require('../controllers/materialStationControllers/materialStationController');
const { getBookings, createBooking } = require('../controllers/bookingControllers/bookingController');
const { changePassword } = require('../controllers/userControllers/changePasswordController');


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
router.get("/role", getRoles);

router.post("/dock", createDock);
router.get("/dock", getDocks)


router.post("/loadUnloadTime", createLoadUnloadTime);
router.get("/loadUnloadTimes", getLoadUnloadTimes)
router.get("/getSingleLoadUnloadTime", getSingleLoadUnloadTime)
router.delete("/deleteSingleLoadUnloadTime", deleteSingleLoadUnloadTime)
router.patch("/editLoadUnloadTime", editLoadUnloadTime)

router.post("/materialStation", createMaterialStationDefinition);
router.get("/materialStation", getMaterialStationDefinitions)

router.post("/booking", createBooking);
router.get("/booking", getBookings)

router.post('/change-password', changePassword)

module.exports = router;