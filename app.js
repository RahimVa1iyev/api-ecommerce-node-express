const express = require('express')
const app = express()



const port = 3000

const start = async () => {
    try {
     app.listen(port, console.log(`Server is listening ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()