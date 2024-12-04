const Department = require('../models/department.model.js');

exports.departmentCreate = async (req, res) => {
    try {
        const departmentData = new Department(req.body);
        const postData = await departmentData.save();
        res.status(200).send({ data:postData, message: "Department Created Successfully", statusCode: 200 });
    } catch (error) {
        res.status(500).send({ message: "Department Already Exist", statusCode: 500 });
    }
};

exports.getAllDepartment = async (req, res) => {
    try {
        const getAllDepartmentData = await Department.find({});
        if (getAllDepartmentData.length === 0) {
            return res.status(404).send({ message: "No Records found", statusCode: 404 });
        } else {
            res.status(200).send({ getAllDepartmentData, message: "Department list retrieved successfully", statusCode: 200 }) ;
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error", statusCode: 500 });
    }
    
};

exports.getByIdDepartment = async (req, res) => {
    try {
        const departmentData = await Department.findOne({ _id: req.params.departmentId });
        if (departmentData) {
            res.status(200).send({ departmentData, message: "Department retrived successfully", statusCode: 200 });
        } else {
            res.status(404).send({ message: "Department not found", statusCode: 404 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    }
};

exports.updateDepartMent = async (req, res) => {
    try {
        const departmentUpdate = await Department.findByIdAndUpdate({ _id: req.params.departmentId }, { $set: req.body });
        if (departmentUpdate) {
            res.status(200).send({ departmentUpdate, message: "Department Updated Successfully", statusCode: 200 });
        } else {
            res.status(400).send({ message: "Department not found", statusCode: 400 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const departmentDelete = await Department.deleteOne({ _id: departmentId });
        if (departmentDelete.deletedCount > 0) {
            res.status(200).send({ message: "Department deleted successfully", statusCode: 200 });
        } else {
            res.status(400).send({ message: "Department not found", statusCode: 400 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    }
};

