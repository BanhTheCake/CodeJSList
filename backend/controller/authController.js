const db = require('../models');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokenArr = []

const generateAccessToken = (data) => {
    const accessToken = jwt.sign({ ...data }, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: '10s',
    });
    return accessToken;
};

const generateRefreshToken = (data) => {
    const refreshToken = jwt.sign(
        { ...data },
        process.env.SECRET_REFRESH_TOKEN,
        { expiresIn: '3d' }
    );
    return refreshToken;
};

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await db.User.findOne({ where: { username } });

        if (data) {
            return res.status(400).json('Username is already taken');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.User.create({
            userid: uuidv4(),
            username,
            password: hash,
            isAdmin: false,
        });

        return res.status(200).json({ newUser });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await db.User.findOne({raw: true, where: { username } });

        if (!user) return res.status(400).json('Username or password wrong !');
        
        const { password: userPassword, isAdmin, ...currentUser } = user

        const isExistUser = bcrypt.compareSync(password, user.password);
        if (!isExistUser)
            return res.status(400).json('Username or password wrong !');

        const accessToken = generateAccessToken({ userid: user.userid });
        const refreshToken = generateRefreshToken({ userid: user.userid })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        refreshTokenArr.push(refreshToken)

        return res.status(200).json({ currentUser, accessToken });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const logout = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) return res.status(401).json('you are not authenticate')
    
    refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);
    res.clearCookie("refreshToken");

    return res.status(200).json('logout success')
}

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken || !refreshTokenArr.includes(refreshToken)) return res.status(400).json('you are not authenticated')

        const dataToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN)
        if (!dataToken) return res.status(400).json('you are not authenticated')

        refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken({userid: dataToken.userid})
        const newRefreshToken = generateRefreshToken({userid: dataToken.userid})

        refreshTokenArr.push(newRefreshToken)

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })

        return res.status(200).json(newAccessToken)

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
}

module.exports = { register, login, refreshAccessToken, logout };
