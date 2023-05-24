const express = require("express");
const UserController = require('../../Controllers/Admin/UserController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')

const { getUsersList, changeUserStatus, eleteUser, userLoginController } = UserController

const UserAppRouter = express.Router();


UserAppRouter.post('/login', GlobalMiddlewares, async (req, res) => {
  const response = await userLoginController(req)
  res.json(response).status(200)
})

module.exports = UserAppRouter