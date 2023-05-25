const express = require("express");
const UserController = require('../../Controllers/Admin/UserController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')

const { getUsersList, changeUserStatus, eleteUser, userLoginController } = UserController

const UserWebRouter = express.Router();
const { protect } = GlobalMiddlewares

UserWebRouter.post('/login', protect, async (req, res) => {
  const response = await userLoginController(req)
  res.json(response).status(200)
})

module.exports = UserWebRouter