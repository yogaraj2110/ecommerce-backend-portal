const mongoose = require('mongoose');
require('dotenv').config();

db = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB is connected");
    } catch (error) {
        console.log("DB is not connected",error);
    }
}
module.exports = db;