const express = require("express");
const AuthRoutes = express.Router();
const AuthController = require('../../Controllers/Web/AuthController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')
const UserValidation = require('../../Validations/UserValidations')

function initilization() {
    getRoutes();
    postRoutes();
    putRoutes();
    patchRoutes();
}

initilization();

function getRoutes() {
    AuthRoutes.get('/get-user-profile',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus,GlobalMiddlewares.ractifyError, AuthController.getUserProfile)
}

function postRoutes() {
    AuthRoutes.post('/register', UserValidation.userRegister, GlobalMiddlewares.ractifyError, AuthController.userSignup)
    AuthRoutes.post('/login', UserValidation.userLogin, GlobalMiddlewares.ractifyError, AuthController.userLogin)
}

function putRoutes() {
    AuthRoutes.put('/update-user-profile',GlobalMiddlewares.authenticate,UserValidation.checkUserStatus,GlobalMiddlewares.ractifyError,AuthController.updateUserProfile)
}
function patchRoutes() {
}

module.exports = AuthRoutes;