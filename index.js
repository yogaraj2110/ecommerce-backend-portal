require('dotenv').config();
const express = require('express');
const db = require('./db/connect');

// import routing
const employeeRouter = require('./routes/employees.routes')

const app= express();

// DB Connecting
db();



app.get('/',(req,res)=>{
    res.send('Welcome to My Organization');
})

// Middleware
app.use(express.json());

app.use('/api',employeeRouter);


// Yet to update crossOriginIsolated


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`App is ruuning on  Port ${PORT}`);
})