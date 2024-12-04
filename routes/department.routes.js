const express = require("express")
const router = express.Router();
const DepartmentController = require('../controller/department.controller')
const {verifyToken}  = require('../middleware/authmiddleware')

router.route('/').get(verifyToken,DepartmentController.getAllDepartment).post(verifyToken,DepartmentController.departmentCreate);
router.route('/:departmentId').get(verifyToken,DepartmentController.getByIdDepartment).put(verifyToken,DepartmentController.updateDepartMent).delete(verifyToken,DepartmentController.deleteDepartment);

module.exports = router;