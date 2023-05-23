const express = require("express");
const SubAdminRoutes = express.Router();
const SubAdminController = require('../../Controllers/Admin/SubAdminController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')
// const AdminValidation = require('../../Validations/AdminValidations')

function initilization() {
  getRoutes();
  postRoutes();
  putRoutes();
  patchRoutes();
}

initilization();

function getRoutes() {
  SubAdminRoutes.get('/subadminlist', GlobalMiddlewares.ractifyError, SubAdminController.getSubAdminList)

}

function postRoutes() {
  SubAdminRoutes.post('/register', GlobalMiddlewares.ractifyError, SubAdminController.subAdminSignup)


}

function putRoutes() {


}
function patchRoutes() {
  SubAdminRoutes.put('/change-status', GlobalMiddlewares.ractifyError, SubAdminController.changeSubAdminStatus)

}
function deleteRoutes() {
  SubAdminRoutes.patch('/delete-subadmin', GlobalMiddlewares.ractifyError, SubAdminController.deleteSubAdmin)


}

module.exports = AdminRoutes;