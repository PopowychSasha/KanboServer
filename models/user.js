const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nickname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    avatarPublicId:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

module.exports = User;