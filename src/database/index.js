const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Rover = require('../models/Rover');
const LogDirection = require('../models/LogDirection');

const connection = new Sequelize(dbConfig);

Rover.init(connection);
LogDirection.init(connection);

LogDirection.associate(connection.models);
Rover.associate(connection.models);

module.exports = connection;