const express = require('express')
const configInit = require('./config/configServer')
const connectDB = require('./config/connectDB')
const routerInit = require('./router')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

// CONNECT DATABASE
connectDB()

// CONFIG
configInit(app)

// ROUTER
routerInit(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})