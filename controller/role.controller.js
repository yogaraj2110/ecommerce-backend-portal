const Role = require('../models/role.model');

exports.getAllRoleData = async (req, res) => {
    try {
        const getAllRoleData = await Role.find({});
        if (getAllRoleData.length === 0) {
            return res.status(404).send({ message: "No Records found", statusCode: 404 });
        } else {
            res.status(200).send({ getAllRoleData, message: "Role  retrieved successfully", statusCode: 200 }) ;
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error", statusCode: 500 });
    }
    
};
