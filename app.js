require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// connect DB
const connectDB = require('./db/connect')

// routes
const authRoutes = require('./routes/authRoute')
const userRoutes = require('./routes/userRoute')
const productRoutes = require('./routes/productRoute')

// error-middleware
const notFountMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/', (req,res) => {
    res.send('<h1>Hello Ecommerce website</h1>')
})

app.get('/api/v1', (req,res) => {
    console.log(req.cookies);
    res.send('<h1>Hello Ecommerce website</h1>')
})

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/products',productRoutes)


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