require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')

const express = require('express')
const app = express()

// connect DB
const connectDB = require('./db/connect')

// error-middleware
const notFountMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan)
app.use(express.json())

app.get('/', (req,res) => {
    res.send('<h1>Hello Ecommerce website</h1>')
})

app.use(notFountMiddleware)
app.use(errorHandlerMiddleware)


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