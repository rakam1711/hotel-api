const express = require("express");
const routes = express.Router();
const AdminAuthRouter =  require('./Admin/AuthRoutes')
const SubAdminRouter = require('./Admin/SubadminRoutes');
const WebAuthRouter = require('./Web/AuthRoutes')

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
    routes.use('/admin/subadmin',SubAdminRouter)
}

function web(){
    routes.use('/web/auth',WebAuthRouter);
    // routes.use('/web/account',AccountRouter);
    // routes.use('/web/dashboard',DashboardRouter);
}

module.exports = routes;