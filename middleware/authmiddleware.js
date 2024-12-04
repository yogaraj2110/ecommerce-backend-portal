const jwt = require('jsonwebtoken');
const { login } = require('../controller/employeeLogin.controller');
const roleModal = require('../models/role.model')
const secretKey = process.env.ACCESS_TOKEN;

const verifyToken = (req, res, next) => {
    
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden ' + err, statusCode: 403, success: false });
            } else {
                req.user = user.userId;
                req.role = user.role;
                console.log("user",req.user,req.role);
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized access', statusCode: 401, success: false });
    }
}


const authorizeRole = (roles) => {
    return async (req, res, next) => {
        const userRole = req.role;
        const findRole = await roleModal.find({ _id: userRole })
        const userRoles = findRole[0].roleType
        if (!userRoles || !roles.includes(userRoles)) {
            return res.status(403).send({
                success: false,
                message: 'Admin acess required',
                statusCode: 401
            });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRole };

// const getRoleFromDepartment = (user) => {
//     if (user && user.userName === 'Admin') {
//         return 'Admin';
//     } else if (user && user.userName === 'HR') {
//         return 'HR';
//     }
//     return 'Employee';
// };
// module.exports = getRoleFromDepartment;













// const jwt = require('jsonwebtoken');

// const verifyToken =(req, res, next)=> {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).json({ error: 'Access denied' });
//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token' });
//     }
// };
// module.exports = verifyToken

