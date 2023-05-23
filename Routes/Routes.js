const express = require("express");
const routes = express.Router();
const AdminAuthRouter =  require('./Admin/AuthRoutes')

function initilization() {
    app();
    admin();
    web();
}

initilization();

function app() {
    // routes.use('/app/user',RegistrationRouter)
    // routes.use('/app/contact',ContactRoutes)
    // routes.use('/app/project',ProjectRouter)
}

function admin() {
    routes.use('/admin/auth',AdminAuthRouter)
}

function web(){
    // routes.use('/web/auth',AuthRouter);
    // routes.use('/web/account',AccountRouter);
    // routes.use('/web/dashboard',DashboardRouter);
}

module.exports = routes;