const Sequelize = require("sequelize");
const createUsersModel = require('../models/user');
const createBoardsModel  = require('../models/board');

const sequelize = new Sequelize("kanbo", "root", "mainAdmin1", {
  dialect: "mysql",
  host: "localhost",
});

const checkConnect = async ()=>{
  try{
    /* sequelize.sync({ force: true }).then(() => {
        console.log('Drop and re-sync db.');
    }); */

    await sequelize.authenticate();

    console.log('---------------------------------------');
    console.log('Connected successfully');
    console.log('---------------------------------------');

  }catch(err){
    console.log('---------------------------------------');
    console.error('Connected to batabase failed(((');
    console.log('---------------------------------------');
  }
}

const Users = createUsersModel(sequelize);
const Boards = createBoardsModel(sequelize);

Boards.hasOne(Users,{onDelete:'cascade'});
Users.belongsTo(Boards);

module.exports = {
  checkConnect,
  Users,
  Boards
};
