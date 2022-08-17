const authRouter = require('./auth')
const userRouter = require('./user')

const routerInit = (app) => {
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
}

module.exports = routerInit