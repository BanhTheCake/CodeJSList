const db = require('../models');
const uuidv4 = require('uuid').v4;

const getAllData = async (req, res) => {
    try {
        const data = await db.User.findAll({ raw: true });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const getUserPost = async (req, res) => {
    try {
        const { _offset, _limit } = req.query;

        const userid = req?.userid;
        const isAdmin = req?.isAdmin;

        if (isAdmin) {
            const allPost = await db.Posters.findAll({
                offset: +_offset,
                limit: +_limit,
                order: [ ['createdAt',  'DESC'] ]
            });

            return res.status(200).json(allPost);
        }

        const allPost = await db.Posters.findAll({
            where: { userpostid: userid },
            offset: +_offset,
            limit: +_limit,
            order: [ ['createdAt',  'DESC'] ]
        });

        // const alluser = await db.User.findAll({
        //     include: 'Posters',
        //     where: { userid },
        //     offset: _offset,
        //     limit: _limit,
        // });

        return res.status(200).json(allPost);
    } catch (error) {
        return res.sendStatus(500).json(error.message);
    }
};

const createPoster = async (req, res) => {
    const userid = req?.userid;

    const { title, description } = req.body;

    try {
        const data = await db.Posters.create({
            postid: uuidv4(),
            userpostid: userid,
            title,
            description,
        });

        return res.status(200).json(data);
    } catch (error) {
        return res.sendStatus(500).json(error.message);
    }
};

const deleteUserPost = async (req, res) => {

    const { postid } = req.body;

    // DELETE POST USER

    try {
        const data = await db.Posters.destroy({
            where: { postid: postid },
        });
        return res.status(200).json('done')
    } catch (error) {
        return res.sendStatus(500).json(error.message);
    }

    // return res.status(200).json('done');
};

const updatePoster = async (req, res) => {
    const userid = req?.userid;
    const { title, description, postid } = req.body;

    try {
        const currentUser = await db.Posters.findOne({ where: { postid } });
        currentUser.set({
            title,
            description,
        });
        await currentUser.save();
        return res.status(200).json('done');
    } catch (error) {
        return res.sendStatus(500).json('server wrong ... ');
    }
};

module.exports = {
    getAllData,
    getUserPost,
    createPoster,
    deleteUserPost,
    updatePoster,
};
