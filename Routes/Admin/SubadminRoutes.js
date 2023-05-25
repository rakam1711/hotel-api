const express = require("express");
const SubAdminRoutes = express.Router();
const SubAdminController = require('../../Controllers/Admin/SubAdminController')
const GlobalMiddlewares = require('../../Middlewares/GlobalMiddlewares')
const AdminValidation = require('../../Validations/AdminValidations')

function initilization() {
  getRoutes();
  postRoutes();
  putRoutes();
  patchRoutes();
  deleteRoutes();
}

initilization();

function getRoutes() {
  SubAdminRoutes.get('/subadminlist',GlobalMiddlewares.authenticate, GlobalMiddlewares.ractifyError, SubAdminController.getSubAdminList)

}

function postRoutes() {
  SubAdminRoutes.post('/subadmin-register',GlobalMiddlewares.authenticate,AdminValidation.adminRegister, GlobalMiddlewares.ractifyError, SubAdminController.subAdminSignup)


}

function putRoutes() {


}
function patchRoutes() {
  SubAdminRoutes.patch('/change-status', GlobalMiddlewares.authenticate,GlobalMiddlewares.ractifyError, SubAdminController.changeSubAdminStatus)

}
function deleteRoutes() {
  SubAdminRoutes.delete('/delete-subadmin', GlobalMiddlewares.authenticate, GlobalMiddlewares.ractifyError, SubAdminController.deleteSubAdmin)


}

module.exports = SubAdminRoutes;