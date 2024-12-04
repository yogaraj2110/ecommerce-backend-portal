const Employees = require('../models/employees.model.js');

exports.postEmployees = async (req, res) => {
    try {
        const postingData = new Employees(req.body);
        const postData = await postingData.save();
        res.status(200).send({data:postData, message: "Emplyee Created Successfully", statusCode: 200 });
    } catch (error) {
        res.status(500).send({ message: "Emplyee Already Exist", statusCode: 500 });
    }
};

exports.getAllEmployees = async (req, res) => {
  console.log('req',req);

    try {
        // let employeeDetails = await Employees.find({}).populate('role');
        let employeeDetails = await Employees.find({});
        let query = await Employees.aggregate([
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'roles'
                }
            },
            {
                $unwind: {
                    path: "$roles", 
                    preserveNullAndEmptyArrays: true // Use true if some employees don't have roles
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    bloodGroup: 1,
                    role: "$roles.roleType" // Access the roleType from the roles collection
                }
            }
        ]);

        if (employeeDetails.length === 0) {
            return res.status(404).send({ message: "No Records found", statusCode: 404 });
        } else {
            res.status(200).send({ employeeDetails, message: "Employees list retrieved successfully", statusCode: 200 }) ;
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" +error, statusCode: 500 });
    }
};

// exports.getAllEmployees = async (req, res) => {
//     try {
//         // Fetch employee details and perform aggregation with roles
//         let query = await Employees.aggregate([
//             {
//                 $lookup: {
//                     from: 'roles',
//                     localField: 'role',
//                     foreignField: '_id',
//                     as: 'roles'
//                 }
//             },
//             {
//                 $unwind: {
//                     path: "$roles", 
//                     preserveNullAndEmptyArrays: true // Use true if some employees don't have roles
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     userName:1,
//                     designation:1,
//                     bloodGroup: 1,
//                     email:1,
//                     role: "$roles.roleType",
//                 }
//             }
//         ]);
        
//         console.log('query', query);

//         if (query.length === 0) {
//             return res.status(404).send({ message: "No Records found", statusCode: 404 });
//         } else {
//             res.status(200).send({ employeeDetails: query, message: "Employees list retrieved successfully", statusCode: 200 });
//         }
//     } catch (error) {
//         res.status(500).send({ message: "Internal server error: " + error, statusCode: 500 });
//     }
// };


exports.getByIdEmployees = async (req, res) => {
    try {
        const employee = await Employees.findOne({ _id: req.params.employeeId });
        if (employee) {
            res.status(200).send({ employee, message: "Emplyee Retrived Successfully", statusCode: 200 });
        } else {
            res.status(404).send({ message: "Employee not found", statusCode: 404 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    }
};

exports.updateEmployees = async (req, res) => {
    try {
        const editingData = await Employees.findByIdAndUpdate({ _id: req.params.employeeId }, { $set: req.body });
        if (editingData) {
            res.status(200).send({ editingData, message: "Emplyee Updated Successfully", statusCode: 200 });
        } else {
            res.status(400).send({ message: "Employee not found", statusCode: 400 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    }
};

exports.deleteEmployees = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const deletingData = await Employees.deleteOne({ _id: employeeId });
        if (deletingData.deletedCount > 0) {
            res.status(200).send({ message: "Employee deleted successfully", statusCode: 200 });
        } else {
            res.status(400).send({ message: "Employee not found", statusCode: 400 });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", statusCode: 500 });
    }
};