const express = require("express");
const AdminRoutes = express.Router();
const AuthController = require('../../Controllers/Admin/AuthController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')
const AdminValidation = require('../../Validations/AdminValidations')

function initilization() {
    getRoutes();
    postRoutes();
    putRoutes();
    patchRoutes();
}

initilization();

function getRoutes() {
}

function postRoutes() {
    AdminRoutes.post('/register', AdminValidation.adminRegister, GlobalMiddlewares.ractifyError, AuthController.adminSignup)
    AdminRoutes.post('/login', AdminValidation.adminLogin, GlobalMiddlewares.ractifyError, AuthController.adminLogin)
}

function putRoutes() {
}
function patchRoutes() {
}

module.exports = AdminRoutes;