const express = require("express")
const router = express.Router()
const UserAuthentication = require("../controller/employeeLogin.controller")

// router.post('/register',UserAuthentication.register)
router.post('/login', UserAuthentication.login)
router.get('/refreshToken', UserAuthentication.refreshToken);
router.get('/logout/:id', UserAuthentication.logout);
router.get('/currentUser', UserAuthentication.getCurrentUser);

module.exports = router;