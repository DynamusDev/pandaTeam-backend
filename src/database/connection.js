const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Event = require('../models/Event')
const Cash = require('../models/Cash')
const Entry = require('../models/Entry')
const Birthdays = require('../models/Birthdays')

const connection = new Sequelize(dbConfig)

User.init(connection);
Event.init(connection);
Entry.init(connection);
Cash.init(connection);
Birthdays.init(connection);
module.exports = connection