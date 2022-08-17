const { Sequelize } = require('sequelize');

// === This file is only to declare that the connection is successful ===
// === Without this file, the database will also be connected as usual ===

const sequelize = new Sequelize('sequelize-auth', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB