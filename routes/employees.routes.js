const express = require('express');
const Employees = require('../models/employees.model.js')

const router = express.Router();


router.get('/employees', async (req, res) => {
    try {
        const employeeDetails = await Employees.find({});
        res.status(200).send(employeeDetails);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

// async function auth(req, res, next) {
//     const somma = await req.header("name")
//     if (somma == "siva") {
//         next()
//     }
//     // console.log("error");
//     res.status(401).send({
//         message:"not send"
//     })

// }



router.get('/getByIdemployees/:empID', async (req, res) => {
    try {
        const { empID } = req.params;
        const employee = await Employees.findById(empID);

        if (employee) {
            res.status(200).send(employee);
        } else {
            res.status(404).send({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});







router.post('/addnewemployee', async (req, res) => {
    try {
        const postingData = new Employees(req.body);
        const postData = await postingData.save();
        res.status(201).send(postData);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send({
                message: "Invalid employee data"
            });
        } else {
            res.status(500).send({
                message: "Error saving user data"
            });
        }
    }
});


router.put('/updateemployees/:empID', async (req, res) => {
    try {
        const { empID } = req.params;
        const editingData = await Employees.findByIdAndUpdate({ _id: empID }, { $set: req.body });
        
        if (editingData) {
            res.status(200).send(editingData);
        } else {
            res.status(400).send({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});


router.delete('/deleteemployee/:empID', async (req, res) => {
    try {
        const { empID } = req.params;
        const deletingData = await Employees.deleteOne({ _id: empID });
        
        if (deletingData.deletedCount > 0) {
            res.status(200).send({
                message: "Employee deleted successfully"
            });
        } else {
            res.status(400).send({
                message: "Employee not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});



module.exports = router;

// CRUD

// retrive => find()
// insert =>save()
// modify => findByIdAndUpdate()
// delete => deleteOne