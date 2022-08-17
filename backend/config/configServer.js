const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const configInit = (app) => {
    app.use(cors({
        credentials: true,
        origin: true
    }))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser())
}

module.exports = configInit