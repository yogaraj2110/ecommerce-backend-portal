const express = require('express');
const Employees = require('../models/employees.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// exports.register = async (req, res) => {
//   const { userName, password } = req.body;
//   bcrypt.hash(password, 10).then(async (hash) => {
//     await User.create({ userName, password: hash })
//       .then((user) => {
//         const accessToken = jwt.sign({ userId: user._id },
//           process.env.ACCESS_TOKEN);
//         const refreshToken = jwt.sign({ userId: user._id },
//           process.env.REFRESH_TOKEN);
//         res.status(200).json({
//           message: "User registered successfully",
//           statusCode: 200,
//           accessToken: accessToken,
//           refreshToken: refreshToken,
//         });
//       })
//       .catch((error) =>
//         res.status(500).json({ message: "An error occurred", statusCode: 500 })
//       );
//   });
// };

// User login


exports.login = async (req, res) => {

  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ message: "Username or Password not present", statusCode: 400 });
  }

  try {
    const user = await Employees.findOne({ userName });
    console.log('Found user',await Employees.find({}) );
    
    if (!user) {
      return res.status(404).json({ message: "User not found", statusCode: 404 });
    } else {
      // const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (password !== user.password) {
        return res.status(400).send({ statusCode: 400, message: 'Invalid Password' });
      } else {
        const accessToken = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.ACCESS_TOKEN,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        )
        const refreshToken = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.REFRESH_TOKEN,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
console.log(" userId: user._id, role: user.role",  user._id);

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).send({
          statusCode: 200,
          message: "Login Successfully",
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      }
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", statusCode: 500 });
  }
};


exports.getCurrentUser = async (req, res, next) => {
  try {
    // Retrieve the token from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token not provided', statusCode: 401, success: false });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token and extract payload
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    // Check if the user ID exists in the token payload
    if (!decoded.userId) {
      return res.status(400).json({ message: 'User ID not found in token', statusCode: 400, success: false });
    }

    // Find the user by ID
    const user = await Employees.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', statusCode: 404, success: false });
    }

    // Send user details as response
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User details fetched successfully',
      user: {
        userId: user._id,
        userName: user.userName,
        role: user.role,
        // Add other necessary fields
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', statusCode: 500, success: false });
  }
};


exports.logout = async (req, res) => {
  
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required", statusCode: 400 });
  }
  try {
    const user = await Employees.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found", statusCode: 404 });
    }
    user.refreshToken = null;
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" + error, statusCode: 500 });
  }
};





































exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  console.log("refreshToken", refreshToken);

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh Token not present", statusCode: 400 });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const user = await Employees.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid Refresh Token", statusCode: 403 });
    }
    const newAccessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    return res.status(200).json({
      statusCode: 200,
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Refresh Token", statusCode: 403 });
  }
};






