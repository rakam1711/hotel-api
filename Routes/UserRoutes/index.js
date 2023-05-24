const express = require("express");
const UserWebRouter = require('./User.AppRoutes');
const UserAppRouter = require('./User.AppRoutes')

const router = express.Router()

router.use('/web', UserWebRouter)
router.use('/app', UserAppRouter)


module.exports = router