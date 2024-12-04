const express = require('express');
const RoleController  = require('../controller/role.controller')
const router = express.Router();

router.route('/').get(RoleController.getAllRoleData)

module.exports = router;
