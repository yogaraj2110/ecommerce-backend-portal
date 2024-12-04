const express = require('express');
const EmployeeController  = require('../controller/employee.controller')
const router = express.Router();
const {verifyToken,authorizeRole}  = require('../middleware/authmiddleware')

router.route('/').get(verifyToken, EmployeeController.getAllEmployees).post(verifyToken, EmployeeController.postEmployees);
router.route('/:employeeId').get(verifyToken,EmployeeController.getByIdEmployees).put(verifyToken,EmployeeController.updateEmployees).delete(verifyToken,EmployeeController.deleteEmployees);       

module.exports = router;
