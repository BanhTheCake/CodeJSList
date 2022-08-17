'use strict';

const uuidv4 = require('uuid').v4;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posters', [{
      postid: uuidv4(),
      userpostid: '$2a$10$jBngoHYLhVAnogciLe2Nv.UNSSwz0RIkr3SMHeroJlltt4JvjveoC', 
      title: 'Title 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        postid: uuidv4(),
        userpostid: '$2a$10$hn3ZrVRXGFoyOfXd3x3XlOhA5pSgrdRdzkhQu91r.JKappQHMvZPe', 
        title: 'Title 2',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        postid: uuidv4(),
        userpostid: '$2a$10$jBngoHYLhVAnogciLe2Nv.UNSSwz0RIkr3SMHeroJlltt4JvjveoC', 
        title: 'Title 3',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        postid: uuidv4(),
        userpostid: '$2a$10$hn3ZrVRXGFoyOfXd3x3XlOhA5pSgrdRdzkhQu91r.JKappQHMvZPe', 
        title: 'Title 4',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posters', null, {});
  }
};