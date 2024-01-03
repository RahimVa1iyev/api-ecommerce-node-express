require('dotenv').config()

const express = require('express')
const app = express()

// connect DB
const connectDB = require('./db/connect')



const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(console.log('Database connected'))
        app.listen(port, console.log(`Server is listening ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()