const jwt = require("jsonwebtoken")
const db = require("../models")

const verify = async (req, res, next) => {

    const token = req.headers.authorization
    if (!token) return res.status(400).json('you are not authenticated')

    const accessToken = token.split(' ')[1]

    try {
        const data = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN)
        if (!data) return res.status(400).json('you are not authenticated')

        const user = await db.User.findOne({where: {userid: data.userid}} ,{ raw: true })
        
        req.userid = user.userid
        req.isAdmin = user.isAdmin

        next()
    } catch (error) {
        return res.status(400).json(error.message)
    }
    
}

module.exports = { verify }